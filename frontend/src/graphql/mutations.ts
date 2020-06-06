import gql from 'graphql-tag'

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`

export const CREATE_APARTMENT = gql`
  mutation CreateApartment($number: Int!, $block: String) {
    createApartment(number: $number, block: $block) {
      id
      number
      block
    }
  }
`

export const UPDATE_APARTMENT = gql`
  mutation UpdateApartment($id: ID!, $number: Int!, $block: String) {
    updateApartment(id: $id, number: $number, block: $block) {
      id
      number
      block
    }
  }
`

export const REMOVE_APARTMENT = gql`
  mutation RemoveApartment($id: ID!) {
    removeApartment(id: $id)
  }
`

export const CREATE_TENANT = gql`
  mutation CreateTenant(
    $cpf: String!
    $email: String!
    $name: String!
    $primary: Boolean!
    $dateOfBirth: DateTime
    $phone: String
    $apartmentId: String!
  ) {
    createTenant(
      cpf: $cpf
      email: $email
      name: $name
      primary: $primary
      dateOfBirth: $dateOfBirth
      phone: $phone
      apartmentId: $apartmentId
    ) {
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

export const UPDATE_TENANT = gql`
  mutation UpdateTenant(
    $id: ID!
    $cpf: String
    $email: String
    $name: String
    $primary: Boolean
    $dateOfBirth: DateTime
    $phone: String
    $apartmentId: String
  ) {
    updateTenant(
      id: $id
      cpf: $cpf
      email: $email
      name: $name
      primary: $primary
      dateOfBirth: $dateOfBirth
      phone: $phone
      apartmentId: $apartmentId
    ) {
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

export const REMOVE_TENANT = gql`
  mutation RemoveTenant($id: ID!) {
    removeTenant(id: $id)
  }
`
