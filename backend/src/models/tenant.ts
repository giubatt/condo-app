import mongoose from 'mongoose'

export type TenantDocument = mongoose.Document & {
  cpf: string
  email: string
  name: string
  dateOfBirth?: Date
  phone?: string
  primary: boolean
  apartmentId: mongoose.Types.ObjectId
}

const tenantSchema = new mongoose.Schema(
  {
    cpf: {
      type: String,
      required: true,
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
    primary: {
      type: Boolean,
      default: false,
    },
    apartmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true },
)

export const Tenant = mongoose.model<TenantDocument>(`Tenant`, tenantSchema)
