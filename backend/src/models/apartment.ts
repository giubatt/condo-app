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
    tenants: [
      {
        primary: {
          type: Boolean,
          default: false,
        },
        tenant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: `Tenant`,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
)

export const Apartment = mongoose.model<ApartmentDocument>(`Apartment`, apartmentSchema)
