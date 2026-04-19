// Receives CSAT form submission, writes NNL_CSAT_Response__c record to Salesforce
// Uses Client Credentials Flow — no user login required

import crypto from 'crypto';

export default async function handler(req, res) {
  // CORS — form is same-origin on Vercel but handle preflight anyway
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const data = req.body;

  // ── Gap 2: Verify HMAC signature ──────────────────────────────────────────
  const hmacSecret = process.env.HMAC_SECRET;
  if (hmacSecret) {
    const expected = crypto
      .createHmac('sha256', hmacSecret)
      .update(`${data.account_id}|${data.survey_code || ''}`)
      .digest('hex');
    if (!data.sig || data.sig !== expected) {
      return res.status(403).json({ error: 'Invalid signature' });
    }
  }

  try {

    // ── 1. Get SF access token via Client Credentials ──────────────────────
    const tokenRes = await fetch(
      `${process.env.SF_INSTANCE_URL}/services/oauth2/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type:    'client_credentials',
          client_id:     process.env.SF_CLIENT_ID,
          client_secret: process.env.SF_CLIENT_SECRET,
        }),
      }
    );

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      throw new Error(`SF auth failed: ${err}`);
    }

    const { access_token } = await tokenRes.json();

    // ── Gap 1: Verify account exists in Salesforce ─────────────────────────
    const safeId = String(data.account_id || '').replace(/'/g, '');
    if (!safeId) return res.status(400).json({ error: 'Missing account_id' });

    const acctRes = await fetch(
      `${process.env.SF_INSTANCE_URL}/services/data/v59.0/query?q=${encodeURIComponent(`SELECT Id FROM Account WHERE Id = '${safeId}'`)}`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    const acctData = await acctRes.json();
    if (!acctData.records || acctData.records.length === 0) {
      return res.status(400).json({ error: 'Invalid account' });
    }

    // ── 2. Build SF record ─────────────────────────────────────────────────
    // Always-present fields
    const record = {
      Account__c:    data.account_id || null,
      Submission__c: data.timestamp  || new Date().toISOString(),
      Survey_Code__c: data.survey_code || null,  // Gap 3: audit trail
    };

    // Optional fields — only included once created in SF object
    const optional = {
      Global__c:              data.global_score__c,
      Software_Rating__c:     data.software_rating__c,
      Hardware_Rating__c:     data.hardware_rating__c,
      Features_Rating__c:     data.options_rating__c,
      Respondent_Name__c:     data.respondent_name__c,
      Hospital__c:            data.hospital__c,
      Role__c:                data.role__c,
      Usage_Frequency__c:     data.usage_frequency__c,
      Technical_Issues__c:    data.technical_issues__c,
      Issue_Detail__c:        data.issue_detail__c,
      Used_Features__c:       data.used_features__c,
      Qualitative_Feedback__c: data.qualitative_feedback__c,
      Training_Needs__c:      data.training_needs__c,

      Software_Difficulty__c: data.software_difficulty__c,
      Hardware_Difficulty__c: data.hardware_difficulty__c,
      Options_Difficulty__c:  data.options_difficulty__c,
      Features_Not_Used__c:   data.features_not_used__c,

      Month__c:               data.month__c,
      Product__c:             data.product__c,
    };

    for (const [key, val] of Object.entries(optional)) {
      if (val !== undefined && val !== null && val !== '') {
        record[key] = val;
      }
    }

    // ── 3. Create record in Salesforce ─────────────────────────────────────
    const sfRes = await fetch(
      `${process.env.SF_INSTANCE_URL}/services/data/v59.0/sobjects/NNL_CSAT_Response__c/`,
      {
        method:  'POST',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type':  'application/json',
        },
        body: JSON.stringify(record),
      }
    );

    if (!sfRes.ok) {
      const err = await sfRes.json();
      throw new Error(`SF record creation failed: ${JSON.stringify(err)}`);
    }

    const result = await sfRes.json();
    return res.status(200).json({ success: true, id: result.id });

  } catch (err) {
    console.error('[CSAT submit]', err.message);
    return res.status(500).json({ error: err.message });
  }
}
