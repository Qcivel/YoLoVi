import { defineEventHandler, readBody, createError } from 'h3'
import nodemailer from 'nodemailer'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const RECIPIENT_EMAILS = {
  'test-contact': 'yolovitest@gmail.com',
  'julie-garrido': 'julie@yolovi.fr',
  'theo-renaut':   'theo@yolovi.fr',
  'remy-gabalda':  'remy@yolovi.fr',
  'collectif':     'contact@yolovi.fr',
} as const

type RecipientKey = keyof typeof RECIPIENT_EMAILS

// En test, tous les messages vont dans UNE boîte Gmail, avec un alias + par destinataire
function resolveRecipient(key: RecipientKey, testTo: string): string {
  if (!testTo) return RECIPIENT_EMAILS[key]
  const [local, domain] = testTo.split('@')
  return `${local}+${key}@${domain}`
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { recipient, firstName, lastName, email, subject, message } = body ?? {}

  // Validation serveur
  if (!recipient || !Object.hasOwn(RECIPIENT_EMAILS, recipient))
    throw createError({ statusCode: 400, message: 'Destinataire invalide.' })
  if (!firstName?.trim() || !lastName?.trim())
    throw createError({ statusCode: 400, message: 'Nom et prénom obligatoires.' })
  if (!email || !EMAIL_RE.test(email))
    throw createError({ statusCode: 400, message: 'Adresse e-mail invalide.' })
  if (!subject?.trim())
    throw createError({ statusCode: 400, message: 'Objet obligatoire.' })
  if (!message?.trim() || message.length > 2000)
    throw createError({ statusCode: 400, message: 'Message invalide ou trop long.' })

  const config = useRuntimeConfig()

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort),
    secure: Number(config.smtpPort) === 465,
    auth: { user: config.smtpUser, pass: config.smtpPassword },
  })

  try {
    await transporter.sendMail({
      from: { name: 'Site YoLoVi', address: config.smtpUser },
      to: resolveRecipient(recipient, config.mailTestTo),
      replyTo: { name: `${firstName} ${lastName}`, address: email },
      subject: `[YoLoVi] ${subject.replace(/[\r\n]+/g, ' ')}`,
      text: `De : ${firstName} ${lastName} <${email}>\n\n${message}`,
    })
  } catch (e) {
    console.error("Envoi du message de contact impossible :", e)
    throw createError({ statusCode: 502, message: "L'envoi du message a échoué." })
  }

  return { success: true }
})