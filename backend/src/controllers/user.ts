import { User, UserDocument } from '../models/user'
import { Types } from 'mongoose'

export const create = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<UserDocument> => {
  const user = await User.create({
    email,
    password,
  })

  return user.toObject()
}

export const update = async ({
  id,
  email,
  password,
}: {
  id: Types.ObjectId
  email?: string
  password?: string
}): Promise<UserDocument> => {
  const user = await User.findById(id)
  if (!user) throw new Error(`UserNotFound`)

  if (email) user.email = email
  if (password) user.password = password
  await user.save()

  return user.toObject()
}

export const findById = async (
  id: Types.ObjectId,
): Promise<UserDocument | null> => {
  const user = await User.findById(id)

  return user?.toObject()
}

export const checkPassword = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<boolean> => {
  const user = await User.findOne({ email })
  if (!user) return false

  return user.comparePassword(password)
}
