import gql from 'graphql-tag'

export const GET_APARTMENTS = gql`
  query GetApartments {
    getApartments {
      id
      number
      block
    }
  }
`

export const GET_TENANT = gql`
  query GetTenant($id: ID!) {
    getTenant(id: $id) {
      id
      cpf
      email
      name
      primary
      dateOfBirth
      phone
      apartmentId
    }
  }
`

export const GET_APARTMENT_TENANTS = gql`
  query GetApartmentTenants($apartmentId: ID!) {
    getApartmentTenants(apartmentId: $apartmentId) {
      id
      cpf
      email
      name
      primary
      dateOfBirth
      phone
      apartmentId
    }
  }
`
