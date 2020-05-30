import { ApolloServer } from 'apollo-server-express'
import { schema } from './schemas'
import { decodeToken } from '../controllers/auth'
import { findById } from '../controllers/user'

export const graphqlServer = new ApolloServer({
  schema,
  context: async ({ req }): Promise<{ user: unknown }> => {
    let token
    if (req.headers.authorization) {
      token = req.headers.authorization.replace(`Bearer `, ``)
    }

    let user
    if (token) {
      try {
        const { id } = await decodeToken(token)
        user = await findById(id)
      } catch (error) {
        console.error(error)
      }
    }

    return { user }
  },
})
