import { AuthenticationError } from 'apollo-server-express'
import { BaseContext } from 'apollo-server-types'
import { login } from '../../../controllers/auth'
import { create } from '../../../controllers/user'
import { UserDocument } from '../../../models/user'

export const resolvers = {
  Mutation: {
    async login(
      _parent: undefined,
      { email, password }: { email: string; password: string },
      _ctx: BaseContext,
    ): Promise<string | null> {
      return login({ email, password })
    },

    async register(
      _parent: undefined,
      { email, password }: { email: string; password: string },
      _ctx: BaseContext,
    ): Promise<string | null> {
      await create({ email, password })

      return login({ email, password })
    },
  },

  Query: {
    checkToken(_parent: undefined, {}, { user }: { user: UserDocument }): boolean | null {
      if (!user) throw new AuthenticationError(``)

      return true
    },
  },
}
