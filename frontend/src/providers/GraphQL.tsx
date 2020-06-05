import React, { ReactNode } from 'react'
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql'
import { cacheExchange, Data } from '@urql/exchange-graphcache'

import { GET_APARTMENTS } from 'src/graphql/queries'

const client = createClient({
  url: import.meta.env.SNOWPACK_PUBLIC_GRAPHQL_URL,
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          createApartment: (result, args, cache, info) => {
            cache.updateQuery({ query: GET_APARTMENTS }, (data) => {
              return {
                ...data,
                getApartments: [...(data?.getApartments as []), result],
              } as Data
            })
          },
          removeApartment: (result, args, cache, info) => {
            cache.invalidate({ __typename: 'Apartment', id: args.id as string })
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
