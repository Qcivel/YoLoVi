<template>
  <div class="contact-page">
    <header class="page-hero">
      <span class="page-label">Collectif YoLoVi</span>
      <h1>Contact</h1>
      <p class="page-intro">Vous souhaitez collaborer, exposer ou simplement échanger ? Adressez votre message directement à l'un des artistes du collectif.</p>
    </header>

    <section class="contact-section">
      <form
        class="contact-form"
        novalidate
        @submit.prevent="handleSubmit"
        aria-label="Formulaire de contact"
      >
        <!-- Destinataire -->
        <fieldset class="form-fieldset">
          <legend class="form-legend">Destinataire</legend>
          <div class="radio-group" role="radiogroup" aria-label="Choisir un artiste">
            <label v-for="artist in artists" :key="artist.value" class="radio-label">
              <input
                type="radio"
                name="recipient"
                :value="artist.value"
                v-model="form.recipient"
                required
              />
              <span class="radio-custom" aria-hidden="true"></span>
              {{ artist.label }}
            </label>
          </div>
          <p v-if="errors.recipient" class="field-error" role="alert">{{ errors.recipient }}</p>
        </fieldset>

        <!-- Identité -->
        <fieldset class="form-fieldset">
          <legend class="form-legend">Vos informations</legend>

          <div class="form-row">
            <div class="form-group">
              <label for="firstName" class="form-label">Prénom <span class="required" aria-hidden="true">*</span></label>
              <input
                id="firstName"
                type="text"
                v-model.trim="form.firstName"
                autocomplete="given-name"
                class="form-input"
                :class="{ 'form-input--error': errors.firstName }"
                placeholder="Marie"
                aria-required="true"
                :aria-describedby="errors.firstName ? 'error-firstName' : undefined"
              />
              <p v-if="errors.firstName" id="error-firstName" class="field-error" role="alert">{{ errors.firstName }}</p>
            </div>

            <div class="form-group">
              <label for="lastName" class="form-label">Nom <span class="required" aria-hidden="true">*</span></label>
              <input
                id="lastName"
                type="text"
                v-model.trim="form.lastName"
                autocomplete="family-name"
                class="form-input"
                :class="{ 'form-input--error': errors.lastName }"
                placeholder="Dupont"
                aria-required="true"
                :aria-describedby="errors.lastName ? 'error-lastName' : undefined"
              />
              <p v-if="errors.lastName" id="error-lastName" class="field-error" role="alert">{{ errors.lastName }}</p>
            </div>
          </div>

          <div class="form-group">
            <label for="email" class="form-label">Adresse e-mail <span class="required" aria-hidden="true">*</span></label>
            <input
              id="email"
              type="email"
              v-model.trim="form.email"
              autocomplete="email"
              class="form-input"
              :class="{ 'form-input--error': errors.email }"
              placeholder="marie.dupont@exemple.fr"
              aria-required="true"
              :aria-describedby="errors.email ? 'error-email' : undefined"
            />
            <p v-if="errors.email" id="error-email" class="field-error" role="alert">{{ errors.email }}</p>
          </div>
        </fieldset>

        <!-- Message -->
        <fieldset class="form-fieldset">
          <legend class="form-legend">Votre message</legend>

          <div class="form-group">
            <label for="subject" class="form-label">Objet <span class="required" aria-hidden="true">*</span></label>
            <input
              id="subject"
              type="text"
              v-model.trim="form.subject"
              class="form-input"
              :class="{ 'form-input--error': errors.subject }"
              placeholder="Proposition d'exposition, collaboration…"
              aria-required="true"
              :aria-describedby="errors.subject ? 'error-subject' : undefined"
            />
            <p v-if="errors.subject" id="error-subject" class="field-error" role="alert">{{ errors.subject }}</p>
          </div>

          <div class="form-group">
            <label for="message" class="form-label">Message <span class="required" aria-hidden="true">*</span></label>
            <textarea
              id="message"
              v-model.trim="form.message"
              class="form-input form-textarea"
              :class="{ 'form-input--error': errors.message }"
              rows="7"
              placeholder="Décrivez votre projet, votre demande…"
              aria-required="true"
              :aria-describedby="errors.message ? 'error-message' : undefined"
            ></textarea>
            <p v-if="errors.message" id="error-message" class="field-error" role="alert">{{ errors.message }}</p>
            <p class="char-count" :class="{ 'char-count--over': form.message.length > MAX_CHARS }">
              {{ form.message.length }} / {{ MAX_CHARS }}
            </p>
          </div>
        </fieldset>

        <!-- RGPD -->
        <fieldset class="form-fieldset form-fieldset--legal">
          <legend class="form-legend">Données personnelles</legend>

          <label class="checkbox-label" for="gdpr">
            <input
              id="gdpr"
              type="checkbox"
              v-model="form.gdpr"
              class="checkbox-input"
              aria-required="true"
              :aria-describedby="errors.gdpr ? 'error-gdpr' : 'gdpr-hint'"
            />
            <span class="checkbox-custom" aria-hidden="true"></span>
            <span class="checkbox-text">
              J'accepte que mes données personnelles (nom, prénom, adresse e-mail et message) soient utilisées par le collectif YoLoVi dans le seul but de répondre à ma demande. <strong>Aucune donnée ne sera transmise à des tiers ni utilisée à des fins commerciales.</strong>
              <span class="required" aria-hidden="true"> *</span>
            </span>
          </label>
          <p id="gdpr-hint" class="legal-hint">
            Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679), vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à
            <a href="mailto:contact@yolovi.fr">contact@yolovi.fr</a>.
            Vos données sont conservées le temps de traitement de votre demande, puis supprimées dans un délai de 30 jours.
          </p>
          <p v-if="errors.gdpr" id="error-gdpr" class="field-error" role="alert">{{ errors.gdpr }}</p>
        </fieldset>

        <div class="form-actions">
          <p class="required-note"><span class="required" aria-hidden="true">*</span> Champs obligatoires</p>
          <button
            type="submit"
            class="btn-submit"
            :disabled="status === 'loading'"
            :aria-busy="status === 'loading'"
          >
            <span v-if="status === 'loading'" class="btn-spinner" aria-hidden="true"></span>
            {{ status === 'loading' ? 'Envoi en cours…' : 'Envoyer le message' }}
          </button>
        </div>

        <!-- Feedback -->
        <div v-if="status === 'success'" class="form-feedback form-feedback--success" role="status" aria-live="polite">
          Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.
        </div>
        <div v-if="status === 'error'" class="form-feedback form-feedback--error" role="alert" aria-live="assertive">
          Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter directement par e-mail.
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const MAX_CHARS = 2000

const artists = [
  { label: 'Moly Route', value: 'moly-route' },
  { label: 'Claire Von Corda', value: 'claire-von-corda' },
  { label: 'Théo Renaut', value: 'theo-renaut' },
  { label: 'Rémy Gabalda', value: 'remy-gabalda' },
  { label: 'Le collectif (général)', value: 'collectif' },
]

const form = reactive({
  recipient: '',
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
  gdpr: false,
})

const errors = reactive({})
const status = ref('idle') // idle | loading | success | error

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate() {
  Object.keys(errors).forEach(k => delete errors[k])

  if (!form.recipient)                          errors.recipient  = 'Veuillez sélectionner un destinataire.'
  if (!form.firstName)                          errors.firstName  = 'Le prénom est obligatoire.'
  if (!form.lastName)                           errors.lastName   = 'Le nom est obligatoire.'
  if (!form.email)                              errors.email      = 'L\'adresse e-mail est obligatoire.'
  else if (!EMAIL_RE.test(form.email))          errors.email      = 'Veuillez saisir une adresse e-mail valide.'
  if (!form.subject)                            errors.subject    = 'L\'objet est obligatoire.'
  if (!form.message)                            errors.message    = 'Le message est obligatoire.'
  else if (form.message.length > MAX_CHARS)     errors.message    = `Le message ne doit pas dépasser ${MAX_CHARS} caractères.`
  if (!form.gdpr)                               errors.gdpr       = 'Vous devez accepter la politique de traitement des données pour envoyer votre message.'

  return Object.keys(errors).length === 0
}

async function handleSubmit() {
  if (!validate()) return

  status.value = 'loading'
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        recipient: form.recipient,
        firstName: form.firstName,
        lastName:  form.lastName,
        email:     form.email,
        subject:   form.subject,
        message:   form.message,
      },
    })
    status.value = 'success'
    Object.assign(form, { recipient: '', firstName: '', lastName: '', email: '', subject: '', message: '', gdpr: false })
  } catch {
    status.value = 'error'
  }
}
</script>

<style scoped>
/* ── Page Hero ───────────────────────────────────────────── */
.page-hero {
  text-align: center;
  padding: 6rem 2rem 4rem;
  max-width: 680px;
  margin: 0 auto;
}

.page-label {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 1rem;
}

.page-hero h1 {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #111;
  margin-bottom: 1.5rem;
}

.page-intro {
  font-size: 0.95rem;
  line-height: 1.85;
  color: #666;
}

/* ── Form Layout ─────────────────────────────────────────── */
.contact-section {
  max-width: 760px;
  margin: 0 auto 6rem;
  padding: 0 2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.form-fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

.form-legend {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e8e8e8;
  width: 100%;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-label {
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  color: #333;
}

.required {
  color: #c0392b;
}

/* ── Inputs ──────────────────────────────────────────────── */
.form-input {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #ddd;
  background: #fafafa;
  font-size: 0.95rem;
  color: #111;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
  font-family: inherit;
  border-radius: 0;
  -webkit-appearance: none;
}

.form-input:focus {
  border-color: #111;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
}

.form-input--error {
  border-color: #c0392b;
}

.form-textarea {
  resize: vertical;
  min-height: 160px;
  line-height: 1.7;
}

.char-count {
  font-size: 0.78rem;
  color: #aaa;
  text-align: right;
  margin-top: 0.25rem;
}

.char-count--over {
  color: #c0392b;
  font-weight: 500;
}

/* ── Radio buttons ───────────────────────────────────────── */
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #333;
  user-select: none;
}

.radio-label input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-custom {
  width: 18px;
  height: 18px;
  border: 1px solid #bbb;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s;
}

.radio-label input[type="radio"]:checked + .radio-custom {
  border-color: #111;
  background: #111;
  box-shadow: inset 0 0 0 3px #fff;
}

.radio-label input[type="radio"]:focus-visible + .radio-custom {
  outline: 3px solid rgba(0, 0, 0, 0.15);
  outline-offset: 2px;
}

/* ── Checkbox RGPD ───────────────────────────────────────── */
.form-fieldset--legal {
  background: #f8f8f8;
  border: 1px solid #e8e8e8;
  padding: 1.5rem;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox-custom {
  width: 18px;
  height: 18px;
  border: 1px solid #bbb;
  flex-shrink: 0;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, background 0.2s;
}

.checkbox-input:checked + .checkbox-custom {
  background: #111;
  border-color: #111;
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '';
  display: block;
  width: 5px;
  height: 9px;
  border: 2px solid #fff;
  border-top: none;
  border-left: none;
  transform: rotate(45deg) translate(-1px, -1px);
}

.checkbox-input:focus-visible + .checkbox-custom {
  outline: 3px solid rgba(0, 0, 0, 0.15);
  outline-offset: 2px;
}

.checkbox-text {
  font-size: 0.85rem;
  line-height: 1.7;
  color: #444;
}

.legal-hint {
  font-size: 0.78rem;
  line-height: 1.7;
  color: #888;
  margin-top: 1rem;
}

.legal-hint a {
  color: #555;
  text-decoration: underline;
}

/* ── Errors ──────────────────────────────────────────────── */
.field-error {
  font-size: 0.8rem;
  color: #c0392b;
  margin-top: 0.25rem;
}

/* ── Actions ─────────────────────────────────────────────── */
.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.required-note {
  font-size: 0.78rem;
  color: #aaa;
}

.btn-submit {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 2.5rem;
  background: #111;
  color: #fff;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  font-family: inherit;
}

.btn-submit:hover:not(:disabled) {
  background: #444;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── Feedback ────────────────────────────────────────────── */
.form-feedback {
  padding: 1rem 1.25rem;
  font-size: 0.9rem;
  line-height: 1.6;
}

.form-feedback--success {
  background: #f0faf4;
  border: 1px solid #a8d5b5;
  color: #2d6a45;
}

.form-feedback--error {
  background: #fdf3f3;
  border: 1px solid #e8b4b4;
  color: #8b2020;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-submit {
    width: 100%;
    justify-content: center;
  }
}
</style>
