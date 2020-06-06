import { AuthenticationError } from 'apollo-server-express'
import * as TenantController from '../../../controllers/tenant'
import { TenantDocument } from '../../../models/tenant'
import { UserDocument } from '../../../models/user'
import { Types } from 'mongoose'

export const resolvers = {
  Mutation: {
    async createTenant(
      _parent: undefined,
      {
        cpf,
        email,
        name,
        primary,
        dateOfBirth,
        phone,
        apartmentId,
      }: {
        cpf: string
        email: string
        name: string
        primary: boolean
        dateOfBirth?: Date
        phone?: string
        apartmentId: Types.ObjectId
      },
      { user }: { user: UserDocument },
    ): Promise<TenantDocument | null> {
      if (!user) throw new AuthenticationError(``)

      return await TenantController.create({
        cpf,
        email,
        name,
        primary,
        dateOfBirth,
        phone,
        apartmentId,
      })
    },

    async updateTenant(
      _parent: undefined,
      {
        id,
        cpf,
        email,
        name,
        primary,
        dateOfBirth,
        phone,
        apartmentId,
      }: {
        id: Types.ObjectId
        cpf: string
        email: string
        name: string
        primary: boolean
        dateOfBirth?: Date
        phone?: string
        apartmentId: Types.ObjectId
      },
      { user }: { user: UserDocument },
    ): Promise<TenantDocument | null> {
      if (!user) throw new AuthenticationError(``)

      return await TenantController.update({
        id,
        cpf,
        email,
        name,
        primary,
        dateOfBirth,
        phone,
        apartmentId,
      })
    },

    async removeTenant(
      _parent: undefined,
      { id }: { id: Types.ObjectId },
      { user }: { user: UserDocument },
    ): Promise<boolean | null> {
      if (!user) throw new AuthenticationError(``)

      return await TenantController.remove(id)
    },
  },

  Query: {
    async getTenant(
      _parent: undefined,
      { id }: { id: Types.ObjectId },
      { user }: { user: UserDocument },
    ): Promise<TenantDocument | null> {
      if (!user) throw new AuthenticationError(``)

      return await TenantController.findById(id)
    },
    async getApartmentTenants(
      _parent: undefined,
      { apartmentId }: { apartmentId: Types.ObjectId },
      { user }: { user: UserDocument },
    ): Promise<TenantDocument[] | null> {
      if (!user) throw new AuthenticationError(``)

      return await TenantController.findByApartmentId(apartmentId)
    },
  },

  Tenant: {
    id(_parent: { _id: Types.ObjectId }): string {
      return _parent._id.toHexString()
    },
  },
}
