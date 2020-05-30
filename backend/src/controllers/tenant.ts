import { Tenant, TenantDocument } from '../models/tenant'
import { Types } from 'mongoose'

export const create = async ({
  cpf,
  email,
  name,
  dateOfBirth,
  phone,
}: {
  cpf: string
  email: string
  name: string
  dateOfBirth: Date
  phone: string
}): Promise<TenantDocument> => {
  const tenant = await Tenant.create({
    cpf,
    email,
    name,
    dateOfBirth,
    phone,
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
}: {
  id: Types.ObjectId
  cpf?: string
  email?: string
  name?: string
  dateOfBirth?: Date
  phone?: string
}): Promise<TenantDocument> => {
  const tenant = await Tenant.findById(id)
  if (!tenant) throw new Error(`TenantNotFound`)

  if (cpf) tenant.cpf = cpf
  if (email) tenant.email = email
  if (name) tenant.name = name
  if (dateOfBirth) tenant.dateOfBirth = dateOfBirth
  if (phone) tenant.phone = phone

  await tenant.save()

  return tenant.toObject()
}

export const findById = async (id: Types.ObjectId): Promise<TenantDocument | null> => {
  const tenant = await Tenant.findById(id)

  return tenant?.toObject()
}
