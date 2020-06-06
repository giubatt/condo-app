import React, { ReactNode } from 'react'
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql'
import { cacheExchange, Data } from '@urql/exchange-graphcache'

import { GET_APARTMENTS, GET_APARTMENT_TENANTS } from 'src/graphql/queries'
import { GRAPHQL_URL } from 'src/config'

const client = createClient({
  url: GRAPHQL_URL,
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          createApartment: (result, args, cache) => {
            cache.updateQuery({ query: GET_APARTMENTS }, (data) => {
              return {
                ...data,
                getApartments: [...(data?.getApartments as []), result],
              } as Data
            })
          },
          createTenant: (result, args, cache) => {
            cache.updateQuery(
              {
                query: GET_APARTMENT_TENANTS,
                variables: { apartmentId: args.apartmentId },
              },
              (data) => {
                return {
                  ...data,
                  getApartmentTenants: [
                    ...(data?.getApartmentTenants as []),
                    result,
                  ],
                } as Data
              },
            )
          },
          removeApartment: (result, args, cache) => {
            cache.invalidate({ __typename: 'Apartment', id: args.id as string })
          },
          removeTenant: (result, args, cache) => {
            cache.invalidate({ __typename: 'Tenant', id: args.id as string })
          },
        },
      },
    }),
    fetchExchange,
  ],
  fetchOptions: () => {
    const token = localStorage.getItem('authToken')

    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    }
    return {}
  },
})

const GraphQLProvider: React.FC<{
  children: ReactNode
}> = ({ children }) => <Provider value={client}>{children}</Provider>

export default GraphQLProvider
