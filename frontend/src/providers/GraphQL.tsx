import React, { ReactNode } from 'react'
import { createClient, Provider } from 'urql'

const client = createClient({
  url: import.meta.env.SNOWPACK_PUBLIC_GRAPHQL_URL,
  fetchOptions: () => {
    const token = localStorage.getItem('authToken')
    console.log({ token })

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
