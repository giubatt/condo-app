import { AuthenticationError } from 'apollo-server-express'
import { Types } from 'mongoose'
import { create, update, findById, find } from '../../../controllers/apartment'
import { ApartmentDocument } from '../../../models/apartment'
import { UserDocument } from '../../../models/user'

export const resolvers = {
  Mutation: {
    async createApartment(
      _parent: undefined,
      { number, block }: { number: number; block?: string },
      { user }: { user: UserDocument },
    ): Promise<ApartmentDocument | null> {
      if (!user) throw new AuthenticationError(``)

      return await create({ number, block })
    },

    async updateApartment(
      _parent: undefined,
      { id, number, block }: { id: Types.ObjectId; number: number; block?: string },
      { user }: { user: UserDocument },
    ): Promise<ApartmentDocument | null> {
      if (!user) throw new AuthenticationError(``)

      return await update({ id, number, block })
    },
  },

  Query: {
    async getApartment(
      _parent: undefined,
      { id }: { id: Types.ObjectId },
      { user }: { user: UserDocument },
    ): Promise<ApartmentDocument | null> {
      if (!user) throw new AuthenticationError(``)

      return await findById(id)
    },

    async getApartments(
      _parent: undefined,
      _params: undefined,
      { user }: { user: UserDocument },
    ): Promise<ApartmentDocument[] | null> {
      if (!user) throw new AuthenticationError(``)

      return await find()
    },
  },

  Apartment: {
    id(_parent: { _id: Types.ObjectId }): string {
      return _parent._id.toHexString()
    },
  },
}
