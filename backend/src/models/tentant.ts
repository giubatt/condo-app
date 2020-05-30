import mongoose from 'mongoose'

export type TentantDocument = mongoose.Document & {
  cpf: string
  email: string
  name: string
  dateOfBirth: Date
  phone: string
}

const tentantSchema = new mongoose.Schema(
  {
    cpf: String,
    email: String,
    name: String,
    dateOfBirth: Date,
    phone: String,
  },
  { timestamps: true },
)

export const Tentant = mongoose.model<TentantDocument>('Tentant', tentantSchema)
