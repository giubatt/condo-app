import { Apartment, ApartmentDocument } from '../models/apartment'
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

  if (number) apartment.number = number
  if (block) apartment.block = block
  await apartment.save()

  return apartment.toObject()
}

export const findById = async (id: Types.ObjectId): Promise<ApartmentDocument | null> => {
  const apartment = await Apartment.findById(id).populate(`tenants.tenant`)

  return apartment?.toObject()
}
