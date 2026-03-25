/**
 * GET /api/validate?id=ACCOUNT_SF_ID
 * Validates a Salesforce Account ID and returns the account name.
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
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id || id.length < 15) {
    return res.status(400).json({ error: "Missing or invalid account ID" });
  }

  try {
    const { access_token, instance_url } = await getSFToken();

    const soql = `SELECT Id, Name FROM Account WHERE Id = '${id.replace(/'/g, "")}'`;
    const sfRes = await fetch(
      `${instance_url}/services/data/v59.0/query?q=${encodeURIComponent(soql)}`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (!sfRes.ok) {
      return res.status(502).json({ error: "Salesforce query failed" });
    }

    const data = await sfRes.json();
    if (!data.records || data.records.length === 0) {
      return res.status(404).json({ error: "Account not found" });
    }

    const account = data.records[0];
    return res.status(200).json({ id: account.Id, name: account.Name });

  } catch (err) {
    console.error("validate error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
