# nnl-csat-form

Ce questionnaire permet d'évaluer l'expérience avec la solution nordicComfortPlayer installée sur site. Durée : 5 minutes. / This survey helps to assess user's experience with the nordicComfortPlayer installed at customer's site. Estimated time: 5 minutes.

## Live URL

https://alzoghbyg.github.io/nnl-csat-form/

## Access code

`NNLSOLUTION@2026`

## Setup

### Power Automate webhook
The form submits data to a Power Automate webhook. Replace the `POWER_AUTOMATE_WEBHOOK_URL` placeholder in `index.html` with the actual webhook URL.

### Access codes
Access codes are defined in the `VALID_CODES` object in `index.html`. Each key is a code and each value is the associated client name, e.g.:
```js
const VALID_CODES = {
  "NNLSOLUTION@2026": "NordicNeuroLab"
};
```

## Data collected

| Field | Description |
|---|---|
| `timestamp` | Submission date/time (ISO) |
| `mois` | Month (French abbreviation) |
| `code_acces` | Access code used |
| `client_identifie` | Client name linked to the code |
| `nom_prenom` | Respondent's full name |
| `hopital` | Hospital / institution |
| `fonction` | Role (radiographer, radiologist, etc.) |
| `note_logiciel` | Software satisfaction rating (1–5) |
| `note_materiel` | Hardware satisfaction rating (1–5) |
| `note_options` | Options/features satisfaction rating (1–5) |
| `score_global` | Average of the three ratings |
| `frequence_utilisation` | Usage frequency |
| `problemes_techniques` | Technical issues selection |
| `detail_probleme` | Issue description (if applicable) |
| `options_utilisees` | List of options used regularly |
| `feedback_qualitatif` | Open-ended qualitative feedback |
| `besoin_formation` | Training needs |
| `csat_satisfait` | 1 if all ratings ≥ 4, else 0 |

## Deployment

Hosted on GitHub Pages from the `main` branch.
