import { makeExecutableSchema, gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query
  type Mutation
`

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: [],
})
