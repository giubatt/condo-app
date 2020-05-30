import mongoose from 'mongoose'
import { TentantDocument } from './tentant'

export type ApartmentDocument = mongoose.Document & {
  number: number
  block: string
  tentants: [TentantDocument]
}

const apartmentSchema = new mongoose.Schema(
  {
    number: Number,
    block: String,
    tentants: [
      {
        type: String,
        tentant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: `Tenant`,
        },
      },
    ],
  },
  { timestamps: true },
)

export const Apartment = mongoose.model<ApartmentDocument>(`Apartment`, apartmentSchema)
