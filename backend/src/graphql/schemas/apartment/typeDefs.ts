import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Apartment {
    id: ID!
    number: Int
    block: String
  }

  extend type Mutation {
    createApartment(number: Int!, block: String): Apartment
    updateApartment(id: ID!, number: Int, block: String): Apartment
    removeApartment(id: ID!): Boolean
  }

  extend type Query {
    getApartment(id: ID!): Apartment
    getApartments: [Apartment]
  }
`
