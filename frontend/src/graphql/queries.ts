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
