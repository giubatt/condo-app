import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Tenant {
    id: ID!
    cpf: String!
    email: String!
    name: String!
    primary: Boolean!
    dateOfBirth: Date
    phone: String
  }

  extend type Apartment {
    tenants: [Tenant]
  }

  extend type Mutation {
    createTenant: Tenant
    updateTenant: Tenant
  }

  extend type Query {
    getTenant(id: ID!): Tenant
  }
`
