// Fichier d'appel à la base de données MySQL

import mysql, { type Pool } from 'mysql2/promise'

let pool: Pool | undefined

export function useDb(): Pool {
  if (!pool) {
    const config = useRuntimeConfig()
    pool = mysql.createPool({
      host: config.dbHost,
      port: Number(config.dbPort),
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
      waitForConnections: true,
      connectionLimit: 10,
    })
  }
  return pool
}