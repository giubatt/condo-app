import { Apartment, ApartmentDocument } from '../models/apartment'
import { Tenant } from '../models/tenant'
import { Types } from 'mongoose'

export const create = async ({ number, block }: { number: number; block: string }): Promise<ApartmentDocument> => {
  const apartment = await Apartment.create({
    number,
    block,
  })

  return apartment.toObject()
}

export const update = async ({
  id,
  number,
  block,
}: {
  id: Types.ObjectId
  number?: number
  block?: string
}): Promise<ApartmentDocument> => {
  const apartment = await Apartment.findById(id)
  if (!apartment) throw new Error(`ApartmentNotFound`)

  if (number !== undefined) apartment.number = number
  if (block !== undefined) apartment.block = block
  await apartment.save()

  return apartment.toObject()
}

export const findById = async (id: Types.ObjectId): Promise<ApartmentDocument | null> => {
  const apartment = await Apartment.findById(id)

  return apartment?.toObject()
}

export const find = async (): Promise<ApartmentDocument[] | null> => {
  const apartments = await Apartment.find()

  return apartments
}

export const remove = async (id: Types.ObjectId): Promise<boolean> => {
  const apartment = await Apartment.findById(id)
  if (!apartment) throw new Error(`ApartmentNotFound`)

  await Tenant.deleteMany({ _id: { $in: apartment.tenants } })
  await Apartment.deleteOne({ _id: id })
  return true
}
