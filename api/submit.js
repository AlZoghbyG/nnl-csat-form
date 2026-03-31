// Receives CSAT form submission, writes NNL_CSAT_Response__c record to Salesforce
// Uses Client Credentials Flow — no user login required

export default async function handler(req, res) {
  // CORS — form is same-origin on Vercel but handle preflight anyway
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const data = req.body;

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

    // ── 2. Build SF record ─────────────────────────────────────────────────
    // Always-present fields
    const record = {
      Account__c:   data.account_id  || null,
      Submission__c: data.timestamp  || new Date().toISOString(),
    };

    // Optional fields — only included once created in SF object
    const optional = {
      Global_Score__c:        data.global_score__c,
      Software_Rating__c:     data.software_rating__c,
      Hardware_Rating__c:     data.hardware_rating__c,
      Options_Rating__c:      data.options_rating__c,
      Satisfied__c:           data.satisfied__c !== undefined ? Boolean(data.satisfied__c) : undefined,
      Respondent_Name__c:     data.respondent_name__c,
      Hospital__c:            data.hospital__c,
      Role__c:                data.role__c,
      Usage_Frequency__c:     data.usage_frequency__c,
      Technical_Issues__c:    data.technical_issues__c,
      Issue_Detail__c:        data.issue_detail__c,
      Options_Used__c:        data.options_used__c,
      Qualitative_Feedback__c: data.qualitative_feedback__c,
      Training_Needs__c:      data.training_needs__c,
      Access_Code__c:         data.access_code__c,
      Month__c:               data.month__c,
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
