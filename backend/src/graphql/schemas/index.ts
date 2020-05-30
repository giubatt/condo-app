import { makeExecutableSchema, gql } from 'apollo-server-express'
import { resolvers as authResolvers } from './auth/resolvers'
import { typeDefs as authTypeDefs } from './auth/typeDefs'

const typeDefs = gql`
  type Query
  type Mutation
`

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs, authTypeDefs],
  resolvers: [authResolvers],
})
