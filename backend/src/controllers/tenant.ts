import { Tenant, TenantDocument } from '../models/tenant'
import { Types } from 'mongoose'

export const create = async ({
  cpf,
  email,
  name,
  dateOfBirth,
  phone,
  primary,
  apartmentId,
}: {
  cpf: string
  email: string
  name: string
  dateOfBirth: Date
  phone: string
  primary: boolean
  apartmentId: Types.ObjectId
}): Promise<TenantDocument> => {
  const tenant = await Tenant.create({
    cpf,
    email,
    name,
    dateOfBirth,
    phone,
    primary,
    apartmentId,
  })

  return tenant.toObject()
}

export const update = async ({
  id,
  cpf,
  email,
  name,
  dateOfBirth,
  phone,
  primary,
  apartmentId,
}: {
  id: Types.ObjectId
  cpf?: string
  email?: string
  name?: string
  dateOfBirth?: Date
  phone?: string
  primary?: boolean
  apartmentId?: Types.ObjectId
}): Promise<TenantDocument> => {
  const tenant = await Tenant.findById(id)
  if (!tenant) throw new Error(`TenantNotFound`)

  if (cpf) tenant.cpf = cpf
  if (email) tenant.email = email
  if (name) tenant.name = name
  if (dateOfBirth) tenant.dateOfBirth = dateOfBirth
  if (phone) tenant.phone = phone
  if (primary) tenant.primary = primary
  if (apartmentId) tenant.apartmentId = apartmentId

  await tenant.save()

  return tenant.toObject()
}

export const findById = async (id: Types.ObjectId): Promise<TenantDocument | null> => {
  const tenant = await Tenant.findById(id)

  return tenant?.toObject()
}
