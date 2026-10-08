import { defineEventHandler, readBody, createError } from 'h3'
import nodemailer from 'nodemailer'
import { validateContactPayload, buildContactMail, type ContactPayload } from '../utils/contact'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validation serveur
  const validationError = validateContactPayload(body)
  if (validationError)
    throw createError({ statusCode: 400, message: validationError })

  const config = useRuntimeConfig()

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort),
    secure: Number(config.smtpPort) === 465,
    auth: { user: config.smtpUser, pass: config.smtpPassword },
  })

  try {
    await transporter.sendMail(buildContactMail(body as ContactPayload, config.smtpUser, config.mailTestTo))
  } catch (e) {
    console.error("Envoi du message de contact impossible :", e)
    throw createError({ statusCode: 502, message: "L'envoi du message a échoué." })
  }

  return { success: true }
})
