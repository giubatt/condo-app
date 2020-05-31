import { MongoMemoryServer } from 'mongodb-memory-server'
import { AnyFunction } from 'apollo-server-types'
import { createApolloTestClient } from '../../../tests/apolloServerTest'
import { graphqlServer } from '../../server'
import gql from 'graphql-tag'
import mongoose from 'mongoose'
import { createFakeUser, createFakeApartment, createFakeTenant } from '../../../tests/utils'
import * as UserController from '../../../controllers/user'
import { Apartment } from '../../../models/apartment'
import { Tenant } from '../../../models/tenant'

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
  const user = createFakeUser()
  await UserController.create(user)
  ;({ mutate } = createApolloTestClient(graphqlServer))
  const { data } = await mutate({
    mutation: gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
      }
    `,
    variables: {
      email: user.email,
      password: user.password,
    },
  })

  ;({ query, mutate } = createApolloTestClient(graphqlServer, {
    authorization: data.login,
  }))
  done()
})

afterEach(async (done) => {
  await Apartment.deleteMany({})
  done()
})

afterAll(async (done) => {
  await mongoose.disconnect()
  await mongod.stop()
  done()
})

describe(`Mutation`, () => {
  describe(`createApartment`, () => {
    const CREATE_APARTMENT = gql`
      mutation CreateApartment($number: Int!, $block: String) {
        createApartment(number: $number, block: $block) {
          id
          number
          block
        }
      }
    `

    test(`error when unauthorized`, async () => {
      // Act
      const { mutate } = createApolloTestClient(graphqlServer)
      const { data, errors } = await mutate({
        mutation: CREATE_APARTMENT,
        variables: createFakeApartment(),
      })

      // Assert
      expect(errors[0].extensions).toMatchInlineSnapshot(`
        Object {
          "code": "UNAUTHENTICATED",
        }
      `)
      expect(data.createApartment).toBeNull()
    })

    test(`apartment is created and returned`, async () => {
      // Arrange
      const apartment = createFakeApartment()

      // Act
      const { data, errors } = await mutate({
        mutation: CREATE_APARTMENT,
        variables: apartment,
      })

      // Assert
      expect(errors).toBeUndefined()
      expect(data.createApartment).toMatchObject(apartment)
    })
  })

  describe(`updateApartment`, () => {
    const UPDATE_APARTMENT = gql`
      mutation UpdateApartment($id: ID!, $number: Int!, $block: String) {
        updateApartment(id: $id, number: $number, block: $block) {
          id
          number
          block
        }
      }
    `

    test(`error when unauthorized`, async () => {
      // Act
      const { mutate } = createApolloTestClient(graphqlServer)
      const { data, errors } = await mutate({
        mutation: UPDATE_APARTMENT,
        variables: {
          id: mongoose.Types.ObjectId().toHexString(),
          ...createFakeApartment(),
        },
      })

      // Assert
      expect(errors[0].extensions).toMatchInlineSnapshot(`
        Object {
          "code": "UNAUTHENTICATED",
        }
      `)
      expect(data.updateApartment).toBeNull()
    })

    test(`apartment is updated and returned`, async () => {
      // Arrange
      const apartment = await Apartment.create(createFakeApartment())

      // Act
      const updateData = createFakeApartment()
      const { data, errors } = await mutate({
        mutation: UPDATE_APARTMENT,
        variables: { ...updateData, id: apartment.id },
      })

      // Assert
      expect(errors).toBeUndefined()
      expect(data.updateApartment).toMatchObject(updateData)
    })
  })

  describe(`removeApartment`, () => {
    const REMOVE_APARTMENT = gql`
      mutation RemoveApartment($id: ID!) {
        removeApartment(id: $id)
      }
    `

    test(`error when unauthorized`, async () => {
      // Act
      const { mutate } = createApolloTestClient(graphqlServer)
      const { data, errors } = await mutate({
        mutation: REMOVE_APARTMENT,
        variables: {
          id: mongoose.Types.ObjectId().toHexString(),
        },
      })

      // Assert
      expect(errors[0].extensions).toMatchInlineSnapshot(`
        Object {
          "code": "UNAUTHENTICATED",
        }
      `)
      expect(data.removeApartment).toBeNull()
    })

    test(`apartment and it's tenants are removed`, async () => {
      // Arrange
      const apartment = await Apartment.create(createFakeApartment())

      const tenants = Array(10)
        .fill(``)
        .map(() => ({ ...createFakeTenant(), apartmentId: apartment.id }))
      const tenantsIds = (await Promise.all(tenants.map((tenant) => Tenant.create(tenant)))).map(
        ({ id }) => id,
      ) as mongoose.Types.ObjectId[]

      apartment.tenants = tenantsIds
      await apartment.save()

      // Act
      const { data, errors } = await mutate({
        mutation: REMOVE_APARTMENT,
        variables: { id: apartment.id },
      })

      // Assert
      const actualApartment = await Apartment.findById(apartment.id)
      const actualTenants = await Tenant.find({ apartmentId: apartment.id })

      expect(errors).toBeUndefined()
      expect(data.removeApartment).toBe(true)

      expect(actualApartment).toBeNull()
      expect(actualTenants.length).toBe(0)
    })
  })
})

describe(`Query`, () => {
  describe(`getApartment`, () => {
    const GET_APARTMENT = gql`
      query GetApartment($id: ID!) {
        getApartment(id: $id) {
          id
          number
          block
        }
      }
    `

    test(`error when unauthorized`, async () => {
      // Act
      const { query } = createApolloTestClient(graphqlServer)
      const { data, errors } = await query({
        query: GET_APARTMENT,
        variables: {
          id: mongoose.Types.ObjectId().toHexString(),
        },
      })

      // Assert
      expect(errors[0].extensions).toMatchInlineSnapshot(`
        Object {
          "code": "UNAUTHENTICATED",
        }
      `)
      expect(data.getApartment).toBeNull()
    })

    test(`apartment is returned`, async () => {
      // Arrange
      const apartment = createFakeApartment()
      const { id } = await Apartment.create(apartment)

      // Act
      const { data, errors } = await query({
        query: GET_APARTMENT,
        variables: { id },
      })

      // Assert
      expect(errors).toBeUndefined()
      expect(data.getApartment).toMatchObject(apartment)
    })
  })

  describe(`getApartments`, () => {
    const GET_APARTMENTS = gql`
      query GetApartments {
        getApartments {
          id
          number
          block
        }
      }
    `

    test(`error when unauthorized`, async () => {
      // Act
      const { query } = createApolloTestClient(graphqlServer)
      const { data, errors } = await query({
        query: GET_APARTMENTS,
      })

      // Assert
      expect(errors[0].extensions).toMatchInlineSnapshot(`
        Object {
          "code": "UNAUTHENTICATED",
        }
      `)
      expect(data.getApartments).toBeNull()
    })

    test(`apartments are returned`, async () => {
      // Arrange
      const apartments = Array(10).fill(``).map(createFakeApartment)
      await Promise.all(apartments.map((apartment) => Apartment.create(apartment)))

      // Act
      const { data, errors } = await query({
        query: GET_APARTMENTS,
      })

      // Assert
      expect(errors).toBeUndefined()
      expect(data.getApartments).toMatchObject(apartments)
    })
  })
})
