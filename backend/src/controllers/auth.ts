import { User } from '../models/user'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/secrets'
import { Types } from 'mongoose'

export const login = async ({ email, password }: { email: string; password: string }): Promise<string> => {
  const user = await User.findOne({ email })
  if (!user) throw new Error(`InvalidCredentials`)

  const validPassword = await user.comparePassword(password)
  if (!validPassword) throw new Error(`InvalidCredentials`)

  return jwt.sign(
    {
      id: user.id,
    },
    JWT_SECRET,
  )
}

export const decodeToken = (token: string): { id: Types.ObjectId } => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: Types.ObjectId }
    return payload
  } catch (error) {
    throw new Error(`InvalidToken`)
  }
}
