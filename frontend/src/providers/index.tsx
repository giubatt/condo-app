import React, { ReactNode } from 'react'
import GraphQLProvider from './GraphQL'

export const Providers: React.FC<{
  children: ReactNode
}> = ({ children }) => <GraphQLProvider>{children}</GraphQLProvider>

export default Providers
