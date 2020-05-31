import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  extend type Mutation {
    login(email: String!, password: String!): String
    register(email: String!, password: String!): String
  }

  extend type Query {
    checkToken: Boolean
  }
`
