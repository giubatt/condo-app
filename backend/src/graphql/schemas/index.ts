import { makeExecutableSchema, gql } from 'apollo-server-express'
import { resolvers as authResolvers } from './auth/resolvers'
import { resolvers as apartmentResolvers } from './apartment/resolvers'
import { typeDefs as authTypeDefs } from './auth/typeDefs'
import { typeDefs as apartmentTypeDefs } from './apartment/typeDefs'

const typeDefs = gql`
  type Query
  type Mutation
`

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs, authTypeDefs, apartmentTypeDefs],
  resolvers: [authResolvers, apartmentResolvers],
})
