# nnl-csat-form — Claude Code Context

## What This Is
A customer satisfaction survey form for NordicNeuroLab clients using nordicComfortPlayer.
Clients fill it post-installation or annually. Responses are saved to Salesforce for monthly
reporting and low-score alerts.

## Live URLs
- **Production**: https://nnl-csat-form.vercel.app
- **GitHub Pages** (legacy): https://alzoghbyg.github.io/nnl-csat-form/
- **GitHub repo**: https://github.com/AlZoghbyG/nnl-csat-form

## Tech Stack
- **Frontend**: Single HTML file (`index.html`) — vanilla JS, no framework
- **Backend**: Vercel serverless functions (`api/`) — Node.js
- **Data**: Salesforce `CSAT_Response__c` custom object
- **Auth**: Salesforce client_credentials flow (Connected App: NNL CS Hub)
- **Hosting**: Vercel (connected to GitHub main branch)

## Project Structure
- `index.html` — entire frontend (HTML + CSS + JS in one file)
- `api/validate.js` — GET /api/validate?id=SF_ACCOUNT_ID → returns account name
- `api/submit.js` — POST /api/submit → saves response to Salesforce
- `vercel.json` — routing config
- `CLAUDE.md` — this file

## How the Form Works
1. Client receives a unique link: `https://nnl-csat-form.vercel.app/?account=SALESFORCE_ACCOUNT_ID`
2. Form calls `/api/validate` to verify the Account ID and pre-fill hospital name
3. Client fills 5 steps (identification, software, hardware, options, feedback)
4. On submit, `/api/submit` creates a `CSAT_Response__c` record in Salesforce linked to the Account

## Salesforce Object: CSAT_Response__c
Key fields: `Account__c`, `Score_Global__c`, `Note_Logiciel__c`, `Note_Materiel__c`,
`Note_Options__c`, `CSAT_Satisfait__c`, `Nom_Prenom__c`, `Hopital__c`, `Fonction__c`,
`Frequence_Utilisation__c`, `Problemes_Techniques__c`, `Detail_Probleme__c`,
`Options_Utilisees__c`, `Feedback_Qualitatif__c`, `Besoin_Formation__c`,
`Submission_Date__c`, `Mois__c`

## Vercel Environment Variables
Set in Vercel dashboard → Settings → Environment Variables:
- `SF_INSTANCE_URL` — https://nordicneurolab.my.salesforce.com
- `SF_CLIENT_ID` — Salesforce Connected App consumer key
- `SF_CLIENT_SECRET` — Salesforce Connected App consumer secret

## Git Workflow
- **Always use branches + PRs** — never push directly to main
- main branch = live on Vercel production
- Vercel auto-deploys preview URLs for each branch/PR

## Related Projects
- **NNL-Assistant** (`C:\NNL-Assistant`) — CS team desktop app that will:
  - Generate and send survey links per account
  - Show CSAT scores in a dedicated tab
  - Surface low-score alerts alongside Salesforce cases

## Pending / Blockers
- **Salesforce admin needed**:
  1. Enable Client Credentials Flow on NNL CS Hub Connected App
     (Setup → App Manager → NNL CS Hub → Edit → OAuth Policies)
  2. Add CSAT Responses related list to Account page layout
     (Setup → Object Manager → Account → Page Layouts → Account Layout)
- **Branch `feature/vercel-backend`**: PR open, not merged — waiting for admin to unblock testing

## Salesforce Object Creation
`create_csat_object.py` in `C:\NNL-Assistant\` was used to deploy `CSAT_Response__c`
via the Metadata API. One-time script, already run successfully.
