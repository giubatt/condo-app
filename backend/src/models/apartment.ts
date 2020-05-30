import mongoose from 'mongoose'

export type ApartmentDocument = mongoose.Document & {
  number: number
  block: string
  tenants: [
    {
      primary: boolean
      tenant: mongoose.Types.ObjectId
    },
  ]
}

const apartmentTenantSchema = new mongoose.Schema({
  primary: Boolean,
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `Tenant`,
  },
})

const apartmentSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    block: {
      type: String,
      required: true,
    },
    tenants: [apartmentTenantSchema],
  },
  { timestamps: true },
)

export const Apartment = mongoose.model<ApartmentDocument>(`Apartment`, apartmentSchema)
