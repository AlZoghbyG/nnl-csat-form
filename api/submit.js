/**
 * POST /api/submit
 * Saves a completed CSAT form response to Salesforce CSAT_Response__c.
 */

async function getSFToken() {
  const res = await fetch(`${process.env.SF_INSTANCE_URL}/services/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type:    "client_credentials",
      client_id:     process.env.SF_CLIENT_ID,
      client_secret: process.env.SF_CLIENT_SECRET,
    }),
  });
  if (!res.ok) throw new Error(`SF auth failed: ${res.status}`);
  return res.json();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body;
  if (!body || !body.account_id) {
    return res.status(400).json({ error: "Missing account_id" });
  }

  try {
    const { access_token, instance_url } = await getSFToken();

    const record = {
      Account__c:               body.account_id,
      Nom_Prenom__c:            body.nom_prenom            || null,
      Hopital__c:               body.hopital               || null,
      Fonction__c:              body.fonction              || null,
      Note_Logiciel__c:         body.note_logiciel         ?? null,
      Note_Materiel__c:         body.note_materiel         ?? null,
      Note_Options__c:          body.note_options          ?? null,
      Score_Global__c:          body.score_global          ?? null,
      CSAT_Satisfait__c:        body.csat_satisfait        ?? false,
      Frequence_Utilisation__c: body.frequence_utilisation || null,
      Problemes_Techniques__c:  body.problemes_techniques  || null,
      Detail_Probleme__c:       body.detail_probleme       || null,
      Options_Utilisees__c:     body.options_utilisees     || null,
      Feedback_Qualitatif__c:   body.feedback_qualitatif   || null,
      Besoin_Formation__c:      body.besoin_formation      || null,
      Submission_Date__c:       body.timestamp             || new Date().toISOString(),
      Mois__c:                  body.mois                  || null,
    };

    const sfRes = await fetch(
      `${instance_url}/services/data/v59.0/sobjects/CSAT_Response__c`,
      {
        method:  "POST",
        headers: {
          Authorization:  `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      }
    );

    const result = await sfRes.json();

    if (!sfRes.ok) {
      console.error("SF create error:", result);
      return res.status(502).json({ error: "Failed to save response", detail: result });
    }

    return res.status(200).json({ success: true, id: result.id });

  } catch (err) {
    console.error("submit error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
