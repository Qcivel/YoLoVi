import { defineEventHandler, readBody, createError } from 'h3'
import nodemailer from 'nodemailer'
import { parseContactPayload, buildContactMail } from '../utils/contact'

export default defineEventHandler(async (event) => {
  // Validation serveur (mêmes règles que le navigateur) et nettoyage des espaces
  const result = parseContactPayload(await readBody(event))
  if ('error' in result)
    throw createError({ statusCode: 400, message: result.error })

  const config = useRuntimeConfig()

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort),
    secure: Number(config.smtpPort) === 465,
    auth: { user: config.smtpUser, pass: config.smtpPassword },
  })

  try {
    await transporter.sendMail(buildContactMail(result.payload,config.smtpUser, config.mailTestTo))
  } catch (e) {
    console.error("Envoi du message de contact impossible :", e)
    throw createError({ statusCode: 502, message: "L'envoi du message a échoué." })
  }

  return { success: true }
})
