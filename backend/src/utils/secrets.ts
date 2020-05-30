import logger from './logger'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), `../`, `.env`) })

export const ENVIRONMENT = process.env.NODE_ENV
export const PORT = process.env[`BACKEND_PORT`] || 5000
export const JWT_SECRET = process.env[`BACKEND_JWT_SECRET`]
export const MONGODB_URI = process.env[`BACKEND_MONGODB_URI`]

if (!JWT_SECRET) {
  logger.error(`No jwt secret. Set BACKEND_JWT_SECRET environment variable.`)
  process.exit(1)
}

if (!MONGODB_URI) {
  logger.error(`No mongo connection string. Set BACKEND_MONGODB_URI environment variable.`)
  process.exit(1)
}
