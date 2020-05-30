/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing'
import { ApolloServer } from 'apollo-server-express'
import { Request, Response } from 'express'

// This is a simple wrapper around apollo-server-testing's createTestClient.
// A massive shortcoming of that code is that the ctx object gets passed in
// to the context function as an empty object. So, critically, we can't test
// authorization headers, which is gonna be like all the requests we do in our
// tests. This wrapper allows some headers to be passed in. See:
// https://github.com/apollographql/apollo-server/issues/2277
export const createApolloTestClient = (
  server: ApolloServer,
  headers = {},
): ApolloServerTestClient => {
  // @ts-ignore B/c context is marked as private.
  const oldContext = server.context

  const context = ({ req, res }: { req: Request; res: Response }): null => {
    return oldContext({ res, req: { ...req, headers } })
  }

  const serverWithHeaderContext = Object.assign({}, server, { context })
  // @ts-ignore -- Typescript doesn't know about __proto__, huh...
  serverWithHeaderContext.__proto__ = server.__proto__

  return createTestClient(serverWithHeaderContext)
}
