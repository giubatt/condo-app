import { ApolloServer } from 'apollo-server-express'
import { schema } from './schemas'

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
        // user = await verifyToken({ token })
      } catch (error) {
        // console.error(error)
      }
    }

    return { user }
  },
})
