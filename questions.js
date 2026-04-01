// ── CSAT Survey Questions & Translations ──────────────────────────────────────
// Edit this file to change question labels, options, and translations.
// Both English (en) and French (fr) must have the same keys.
//
// ⚠️  BEFORE SAVING: validate your JSON syntax at https://jsonlint.com
//     A missing comma or quote will break the entire form with a blank page.
//     Paste the content of the `i18n = { ... }` object and click "Validate".

const i18n = {
  en: {
    gate_title: "Survey Access",
    gate_desc: "Enter the access code received by email to access the satisfaction survey.",
    gate_error: "Invalid code. Please check the code received by email.",
    gate_btn: "Access the survey →",
    gate_footer: "NordicNeuroLab — Confidential",
    // ── Step 1: Identification ────────────────────────────────────────────────
    s1_tag:               "Identification",
    s1_title:             "Who are you?",
    s1_desc:              "This information helps us link your feedback to your installation.",
    s1_name_label:        "Full name",
    s1_name_placeholder:  "e.g. Marie Dupont",
    s1_hospital_label:    "Hospital or facility name",
    s1_hospital_placeholder: "e.g. General Hospital",
    s1_role_label:        "Your role",
    s1_role_default:      "— Select —",
    s1_role_radiographer: "Radiographer",
    s1_role_radiologist:  "Radiologist",
    s1_role_biomedical:   "Biomedical technician",
    s1_role_manager:      "Healthcare manager",
    s1_role_other:        "Other",
    s1_role_error:        "Please select your role",

    // ── Step 2: Software ──────────────────────────────────────────────────────
    s2_tag:               "Software Interface",
    s2_title:             "nCP Software",
    s2_desc:              "Rate your experience with the software interface.",
    s2_soft_label:        "Ease of use — nCP Software",
    s2_freq_label:        "Usage frequency",
    freq_daily:           "Daily",
    freq_weekly:          "Several times a week",
    freq_occasional:      "Occasional",
    freq_rarely:          "Rarely",

    // ── Conditional explanation fields ────────────────────────────────────────
    low_rating_why:       "Describe in a few words what makes it difficult to use",
    low_rating_placeholder: "e.g. confusing navigation, slow loading...",
    low_hw_why:           "Explain why the hardware is difficult to use",
    low_opt_why:          "Explain why you are not satisfied with the available features",
    not_used_why:         "Why haven't you used any features yet?",
    not_used_placeholder: "e.g. not aware of them, no need yet...",

    // ── Step 3: Hardware ──────────────────────────────────────────────────────
    s3_tag:               "Hardware",
    s3_title:             "Installed Hardware",
    s3_desc:              "Power supply unit, LCD screen, touchscreen PC.",
    s3_hw_label:          "Satisfaction with installed hardware",
    s3_issues_label:      "Technical issues since installation",
    issues_none:          "No issues",
    issues_minor:         "1 minor incident",
    issues_multiple:      "Multiple incidents",
    issues_unresolved:    "Unresolved issue",
    s3_detail_label:      "Please describe the issue",
    s3_detail_placeholder:"Describe the issue, when it occurred, and whether it was resolved...",
    s3_detail_error:      "Please describe the issue",

    // ── Step 4: Features ──────────────────────────────────────────────────────
    s4_tag:               "Advanced Options",
    s4_title:             "Solution Options",
    s4_desc:              "Apnea commands, custom text, exam duration.",
    s4_opt_label:         "Satisfaction with available features",
    s4_opts_used:         "Features used regularly",
    opt_apnea:            "Apnea commands",
    opt_text:             "Custom text",
    opt_duration:         "Exam duration",
    opt_none:             "None so far",

    // ── Step 5: Feedback ──────────────────────────────────────────────────────
    s5_tag:               "Qualitative Feedback",
    s5_title:             "Your Feedback",
    s5_desc:              "Share your experience freely. Your comments help us improve the solution and our support.",
    s5_improve_label:     "What could be improved?",
    s5_improve_placeholder: "Feel free to describe...",
    s5_training_label:    "Additional training needed?",
    training_yes:         "Yes, needed",
    training_maybe:       "Maybe",
    training_no:          "No, we're autonomous",

    // ── UI & Misc ─────────────────────────────────────────────────────────────
    field_required:       "This field is required",
    na_label:             "N/A",
    star_min:             "Very dissatisfied",
    star_max:             "Very satisfied",
    rating_error:         "Please select a rating",
    select_error:         "Please select an option",
    btn_next:             "Next →",
    btn_back:             "← Back",
    btn_submit:           "Submit ✓",
    sending:              "Sending...",
    success_title:        "Thank you for your feedback!",
    success_body:         "Your responses have been recorded. Our Customer Success team will review them and follow up if needed.",
    error_title:          "Submission failed",
    error_body:           "We could not record your response. Please try again or contact your NordicNeuroLab representative.",
    error_retry:          "Try again",
    consent_label:        "I agree that my responses will be stored by NordicNeuroLab for service improvement purposes. My data will be retained for a maximum of 3 years and will not be shared with third parties.",
    consent_error:        "Please accept before submitting",
    footer_text:          "NordicNeuroLab — Customer Success Engineering — Confidential",
    footer_privacy:       "Data controller: NordicNeuroLab AS — Responses are stored securely in Salesforce and retained for 3 years. You may request access, correction or deletion by contacting support@nordicneurolab.com",
    step_labels: [
      "Step 1 of 5 — Identification",
      "Step 2 of 5 — Software Interface",
      "Step 3 of 5 — Hardware",
      "Step 4 of 5 — Advanced Options",
      "Step 5 of 5 — Feedback"
    ],
    months: ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.']
  },

  fr: {
    gate_title: "Accès au questionnaire",
    gate_desc: "Saisissez le code d'accès reçu par email pour accéder au questionnaire de satisfaction.",
    gate_error: "Code invalide. Vérifiez le code reçu par email.",
    gate_btn: "Accéder au formulaire →",
    gate_footer: "NordicNeuroLab — Confidentiel",
    // ── Étape 1 : Identification ──────────────────────────────────────────────
    s1_tag:               "Identification",
    s1_title:             "Qui êtes-vous ?",
    s1_desc:              "Ces informations nous permettent d'associer votre retour à votre installation.",
    s1_name_label:        "Nom et prénom",
    s1_name_placeholder:  "Ex : Marie Dupont",
    s1_hospital_label:    "Hôpital / Établissement",
    s1_hospital_placeholder: "Ex : CHU de Lyon",
    s1_role_label:        "Votre fonction",
    s1_role_default:      "— Sélectionner —",
    s1_role_radiographer: "Manipulateur(trice) radio",
    s1_role_radiologist:  "Radiologue",
    s1_role_biomedical:   "Technicien(ne) biomédical(e)",
    s1_role_manager:      "Cadre de santé",
    s1_role_other:        "Autre",
    s1_role_error:        "Veuillez sélectionner votre fonction",

    // ── Étape 2 : Logiciel ────────────────────────────────────────────────────
    s2_tag:               "Interface logicielle",
    s2_title:             "Logiciel nCP",
    s2_desc:              "Évaluez votre expérience avec l'interface logicielle.",
    s2_soft_label:        "Facilité d'utilisation du logiciel nCP",
    s2_freq_label:        "Fréquence d'utilisation",
    freq_daily:           "Quotidienne",
    freq_weekly:          "Plusieurs fois par semaine",
    freq_occasional:      "Occasionnelle",
    freq_rarely:          "Rarement",

    // ── Champs d'explication conditionnels ───────────────────────────────────
    low_rating_why:       "Décrivez en quelques mots ce qui rend l'utilisation difficile",
    low_rating_placeholder: "Ex : navigation peu intuitive, chargement lent...",
    low_hw_why:           "Expliquez pourquoi le matériel est difficile à utiliser",
    low_opt_why:          "Expliquez pourquoi vous n'êtes pas satisfait(e) des fonctionnalités disponibles",
    not_used_why:         "Pourquoi n'avez-vous pas encore utilisé de fonctionnalités ?",
    not_used_placeholder: "Ex : pas au courant, pas encore nécessaire...",

    // ── Étape 3 : Matériel ────────────────────────────────────────────────────
    s3_tag:               "Matériel",
    s3_title:             "Matériel installé",
    s3_desc:              "Boîtier d'alimentation, écran LCD, PC avec écran tactile.",
    s3_hw_label:          "Satisfaction avec le matériel installé",
    s3_issues_label:      "Problèmes techniques depuis l'installation",
    issues_none:          "Aucun problème",
    issues_minor:         "1 incident mineur",
    issues_multiple:      "Plusieurs incidents",
    issues_unresolved:    "Problème non résolu",
    s3_detail_label:      "Décrivez le problème rencontré",
    s3_detail_placeholder:"Décrivez le problème, quand il s'est produit, et s'il a été résolu...",
    s3_detail_error:      "Merci de décrire le problème",

    // ── Étape 4 : Fonctionnalités ─────────────────────────────────────────────
    s4_tag:               "Options avancées",
    s4_title:             "Options de la solution",
    s4_desc:              "Apnée, textes personnalisés, durée d'examen.",
    s4_opt_label:         "Satisfaction avec les fonctionnalités disponibles",
    s4_opts_used:         "Fonctionnalités utilisées régulièrement",
    opt_apnea:            "Commandes apnée",
    opt_text:             "Textes personnalisés",
    opt_duration:         "Durée d'examen",
    opt_none:             "Aucune à ce jour",

    // ── Étape 5 : Feedback ────────────────────────────────────────────────────
    s5_tag:               "Feedback qualitatif",
    s5_title:             "Votre retour",
    s5_desc:              "Partagez votre expérience librement. Vos commentaires nous aident à améliorer la solution et notre accompagnement.",
    s5_improve_label:     "Qu'est-ce qui pourrait être amélioré ?",
    s5_improve_placeholder: "Décrivez librement...",
    s5_training_label:    "Besoin d'une formation complémentaire ?",
    training_yes:         "Oui, c'est nécessaire",
    training_maybe:       "Peut-être",
    training_no:          "Non, nous sommes autonomes",

    // ── UI & Divers ───────────────────────────────────────────────────────────
    field_required:       "Ce champ est obligatoire",
    na_label:             "N/A",
    star_min:             "Très insatisfait",
    star_max:             "Très satisfait",
    rating_error:         "Veuillez attribuer une note",
    select_error:         "Veuillez sélectionner une option",
    btn_next:             "Suivant →",
    btn_back:             "← Retour",
    btn_submit:           "Envoyer ✓",
    sending:              "Envoi en cours...",
    success_title:        "Merci pour votre retour !",
    success_body:         "Vos réponses ont bien été enregistrées. Notre équipe Customer Success les analysera et reviendra vers vous si nécessaire.",
    error_title:          "Échec de l'envoi",
    error_body:           "Nous n'avons pas pu enregistrer votre réponse. Veuillez réessayer ou contacter votre représentant NordicNeuroLab.",
    error_retry:          "Réessayer",
    consent_label:        "J'accepte que mes réponses soient conservées par NordicNeuroLab à des fins d'amélioration du service. Mes données seront conservées 3 ans maximum et ne seront pas partagées avec des tiers.",
    consent_error:        "Veuillez accepter avant de soumettre",
    footer_text:          "NordicNeuroLab — Customer Success Engineering — Confidentiel",
    footer_privacy:       "Responsable du traitement : NordicNeuroLab AS — Les réponses sont stockées de manière sécurisée dans Salesforce et conservées 3 ans. Vous pouvez demander l'accès, la correction ou la suppression en contactant support@nordicneurolab.com",
    step_labels: [
      "Étape 1 sur 5 — Identification",
      "Étape 2 sur 5 — Interface logicielle",
      "Étape 3 sur 5 — Matériel",
      "Étape 4 sur 5 — Options avancées",
      "Étape 5 sur 5 — Feedback"
    ],
    months: ['Janv.','Févr.','Mars','Avr.','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.']
  }
};
