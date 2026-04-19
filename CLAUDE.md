# nnl-csat-form — Claude Code Context

## What This Is
Customer satisfaction survey form for NordicNeuroLab clients using nordicComfortPlayer.
Clients fill it post-installation or annually. Responses are saved to Salesforce for monthly
reporting and low-score alerts in the NNL CS Hub desktop app.

## Live URL
- **Production**: https://nnl-csat-form.vercel.app
- **GitHub repo**: https://github.com/AlZoghbyG/nnl-csat-form
- **Local path**: `C:\Users\georg\OneDrive - NordicNeuroLab AS\Documents\GEORGES\Projects\CSAT\nnl-csat-form`

## Tech Stack
- **Frontend**: `index.html` — vanilla JS, no framework. `questions.js` — i18n strings + question definitions
- **Backend**: Vercel serverless functions (`api/`) — Node.js ES modules
- **Data**: Salesforce `NNL_CSAT_Response__c` custom object
- **Auth**: Salesforce Client Credentials Flow (Connected App: NNL CS Hub)
- **Hosting**: Vercel — auto-deploys from GitHub main branch

## Project Structure
- `index.html` — entire frontend (HTML + CSS + JS)
- `questions.js` — i18n translations and question content (en/fr)
- `api/validate.js` — GET /api/validate?id=SF_ACCOUNT_ID → verifies account exists, returns name
- `api/submit.js` — POST /api/submit → saves response to Salesforce
- `vercel.json` — routing config

## Vercel Environment Variables
Set in Vercel dashboard → Settings → Environment Variables:
- `SF_INSTANCE_URL` — https://nordicneurolab.my.salesforce.com
- `SF_CLIENT_ID` — Salesforce Connected App consumer key
- `SF_CLIENT_SECRET` — Salesforce Connected App consumer secret
- `HMAC_SECRET` — shared signing key (must match `csat_hmac_secret` in CS Hub Credential Manager)

## Salesforce Object: NNL_CSAT_Response__c
Key fields: `Account__c`, `Submission__c`, `Global__c`, `Software_Rating__c`, `Hardware_Rating__c`,
`Features_Rating__c`, `Respondent_Name__c`, `Hospital__c`, `Role__c`, `Usage_Frequency__c`,
`Technical_Issues__c`, `Issue_Detail__c`, `Qualitative_Feedback__c`, `Training_Needs__c`, `Month__c`

## How the Form Works
1. CS Hub generates a signed URL: `?account=SF_ID&lang=en|fr&code=NNL-XXXXXX&hospital=NAME&sig=HMAC`
2. Customer opens link → `/api/validate` verifies account, pre-fills hospital name
3. Customer fills 5 steps (identification, software, hardware, options, feedback)
4. On submit → `/api/submit` verifies HMAC sig, validates account in SF, creates `NNL_CSAT_Response__c` record

## Security
- HMAC-SHA256 signature in URL binds `account_id + survey_code` — tampered URLs rejected server-side
- Account existence validated in SF before saving
- If `HMAC_SECRET` env var is not set, signature check is skipped (fail-open for dev)

## Git Workflow
- Push to main → Vercel auto-deploys to production
- Use `npx vercel --prod` from repo root to force a production deploy

## Pending
- Add `Survey_Code__c` field (Text 20) to `NNL_CSAT_Response__c` in SF with correct FLS,
  then re-enable in `submit.js`: `Survey_Code__c: data.survey_code || null`
