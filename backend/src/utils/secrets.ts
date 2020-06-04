import logger from './logger'
import dotenv from 'dotenv'

dotenv.config()

export const ENVIRONMENT = process.env.NODE_ENV
export const PORT = process.env[`PORT`] || 3000
export const JWT_SECRET = process.env[`JWT_SECRET`]
export const MONGODB_URI = process.env[`MONGODB_URI`]

if (!JWT_SECRET) {
  logger.error(`No jwt secret. Set JWT_SECRET environment variable.`)
  process.exit(1)
}

if (!MONGODB_URI) {
  logger.error(`No mongo connection string. Set MONGODB_URI environment variable.`)
  process.exit(1)
}
