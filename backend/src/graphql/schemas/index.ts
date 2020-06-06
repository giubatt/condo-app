import { makeExecutableSchema, gql } from 'apollo-server-express'
import { resolvers as authResolvers } from './auth/resolvers'
import { resolvers as apartmentResolvers } from './apartment/resolvers'
import { resolvers as tenantResolvers } from './tenant/resolvers'

import { typeDefs as authTypeDefs } from './auth/typeDefs'
import { typeDefs as apartmentTypeDefs } from './apartment/typeDefs'
import { typeDefs as tenantTypeDefs } from './tenant/typeDefs'

import { DateTimeResolver, DateTimeTypeDefinition } from 'graphql-scalars'

const typeDefs = gql`
  type Query
  type Mutation
`

const scalarsResolvers = {
  DateTime: DateTimeResolver,
}

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs, authTypeDefs, apartmentTypeDefs, tenantTypeDefs, DateTimeTypeDefinition],
  resolvers: [authResolvers, apartmentResolvers, tenantResolvers, scalarsResolvers],
})
