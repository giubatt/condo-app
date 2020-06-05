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
