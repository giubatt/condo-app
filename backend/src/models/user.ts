import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

export type UserDocument = mongoose.Document & {
  email: string
  password: string

  tokens: string[]

  comparePassword: (password: string) => boolean
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
)

userSchema.pre(`save`, async function save(next) {
  const user = this as UserDocument

  if (!user.isModified(`password`)) {
    return next()
  }

  const hash = await bcrypt.hash(user.password, 10)
  user.password = hash
  next()
})

const comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password)
}

userSchema.methods.comparePassword = comparePassword

export const User = mongoose.model<UserDocument>(`User`, userSchema)
