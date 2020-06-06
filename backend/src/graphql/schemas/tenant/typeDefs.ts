import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Tenant {
    id: ID!
    cpf: String!
    email: String!
    name: String!
    primary: Boolean!
    dateOfBirth: DateTime
    phone: String
    apartmentId: String!
  }

  extend type Mutation {
    createTenant(
      cpf: String!
      email: String!
      name: String!
      primary: Boolean!
      dateOfBirth: DateTime
      phone: String
      apartmentId: String!
    ): Tenant

    updateTenant(
      id: ID!
      cpf: String
      email: String
      name: String
      primary: Boolean
      dateOfBirth: DateTime
      phone: String
      apartmentId: String
    ): Tenant

    removeTenant(id: ID!): Boolean
  }

  extend type Query {
    getTenant(id: ID!): Tenant
    getApartmentTenants(apartmentId: ID!): [Tenant]
  }
`
