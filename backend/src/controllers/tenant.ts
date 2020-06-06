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
  dateOfBirth?: Date
  phone?: string
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

  if (cpf !== undefined) tenant.cpf = cpf
  if (email !== undefined) tenant.email = email
  if (name !== undefined) tenant.name = name
  if (dateOfBirth !== undefined) tenant.dateOfBirth = dateOfBirth
  if (phone !== undefined) tenant.phone = phone
  if (primary !== undefined) tenant.primary = primary
  if (apartmentId !== undefined) tenant.apartmentId = apartmentId

  await tenant.save()

  return tenant.toObject()
}

export const findByApartmentId = async (apartmentId: Types.ObjectId): Promise<TenantDocument[] | null> => {
  let tenants = await Tenant.find({ apartmentId })
  tenants = tenants.map((item) => item.toObject())

  return tenants
}

export const findById = async (id: Types.ObjectId): Promise<TenantDocument | null> => {
  const tenant = await Tenant.findById(id)

  return tenant?.toObject()
}

export const remove = async (id: Types.ObjectId): Promise<boolean> => {
  const tenant = await Tenant.findById(id)
  if (!tenant) throw new Error(`TenantNotFound`)

  await Tenant.deleteOne({ _id: id })
  return true
}
