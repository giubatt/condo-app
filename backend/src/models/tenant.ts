import mongoose from 'mongoose'

export type TenantDocument = mongoose.Document & {
  cpf: string
  email: string
  name: string
  dateOfBirth?: Date
  phone: string
}

const tenantSchema = new mongoose.Schema(
  {
    cpf: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dateOfBirth: Date,
    phone: String,
  },
  { timestamps: true },
)

export const Tenant = mongoose.model<TenantDocument>(`Tenant`, tenantSchema)
