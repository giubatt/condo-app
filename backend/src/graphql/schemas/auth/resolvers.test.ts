import { MongoMemoryServer } from 'mongodb-memory-server'
import { AnyFunction } from 'apollo-server-types'
import { createApolloTestClient } from '../../../tests/apolloServerTest'
import { graphqlServer } from '../../server'
import gql from 'graphql-tag'
import mongoose from 'mongoose'
import { createFakeUser } from '../../../tests/utils'
import * as UserController from '../../../controllers/user'

const mongod = new MongoMemoryServer()

let mutate: AnyFunction
let query: AnyFunction

beforeAll(async (done) => {
  await mongoose.connect(await mongod.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  ;({ mutate, query } = createApolloTestClient(graphqlServer))
  done()
})

afterEach(async (done) => {
  await mongoose.connection.dropDatabase()
  done()
})

afterAll(async (done) => {
  await mongoose.disconnect()
  await mongod.stop()
  done()
})

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

const CHECK_TOKEN = gql`
  query CheckToken {
    checkToken
  }
`

describe(`Mutation`, () => {
  describe(`login`, () => {
    test(`token is returned`, async () => {
      // Arrange
      const user = createFakeUser()
      await UserController.create(user)

      // Act
      const { data, errors } = await mutate({
        mutation: LOGIN,
        variables: {
          email: user.email,
          password: user.password,
        },
      })

      // Assert
      expect(errors).toBeUndefined()
      expect(data.login).not.toBeNull()
      expect(typeof data.login).toBe(`string`)
    })

    test(`token is not returned on invalid credentials`, async () => {
      // Arrange
      const user = createFakeUser()
      await UserController.create(user)

      // Act
      const { data, errors } = await mutate({
        mutation: LOGIN,
        variables: {
          email: user.email,
          password: `user.password`,
        },
      })

      // Assert
      expect(errors[0].extensions).toMatchInlineSnapshot(`
        Object {
          "code": "INTERNAL_SERVER_ERROR",
        }
      `)
      expect(data.login).toBeNull()
    })
  })

  describe(`checkToken`, () => {
    test(`returns error on invalid token`, async () => {
      // Act
      const { data, errors } = await query({
        query: CHECK_TOKEN,
      })

      // Assert
      expect(errors[0].extensions).toMatchInlineSnapshot(`
        Object {
          "code": "UNAUTHENTICATED",
        }
      `)
      expect(data.checkToken).toBeNull()
    })

    test(`returns true when authenticated`, async () => {
      // Arrange
      const user = createFakeUser()
      await UserController.create(user)

      const {
        data: { login },
      } = await mutate({
        mutation: LOGIN,
        variables: {
          email: user.email,
          password: user.password,
        },
      })

      const { query } = createApolloTestClient(graphqlServer, {
        authorization: login,
      })

      // Act
      const { data, errors } = await query({
        query: CHECK_TOKEN,
      })

      // Assert
      expect(errors).toBeUndefined()
      expect(data).toMatchObject({ checkToken: true })
    })
  })
})
