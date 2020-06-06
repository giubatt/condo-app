import { MongoMemoryServer } from 'mongodb-memory-server'
import { AnyFunction } from 'apollo-server-types'
import { createApolloTestClient } from '../../../tests/apolloServerTest'
import { graphqlServer } from '../../server'
import gql from 'graphql-tag'
import mongoose from 'mongoose'
import { createFakeUser, createFakeTenant } from '../../../tests/utils'
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
  describe(`createTenant`, () => {
    const CREATE_TENANT = gql`
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

    test(`error when unauthorized`, async () => {
      // Act
      const { mutate } = createApolloTestClient(graphqlServer)
      const { data, errors } = await mutate({
        mutation: CREATE_TENANT,
        variables: {
          ...createFakeTenant(),
          apartmentId: createFakeTenant().apartmentId.toHexString(),
        },
      })

      // Assert
      expect(errors[0].extensions).toMatchInlineSnapshot(`
        Object {
          "code": "UNAUTHENTICATED",
        }
      `)
      expect(data.createTenant).toBeNull()
    })

    test(`tenant is created and returned`, async () => {
      // Arrange
      const tenant = createFakeTenant()

      // Act
      const { data, errors } = await mutate({
        mutation: CREATE_TENANT,
        variables: {
          ...tenant,
          apartmentId: tenant.apartmentId.toHexString(),
        },
      })

      // Assert
      expect(errors).toBeUndefined()
      expect(data.createTenant).toMatchObject({
        ...tenant,
        apartmentId: tenant.apartmentId.toHexString(),
        dateOfBirth: tenant.dateOfBirth.toISOString(),
      })
    })
  })

  describe(`updateTenant`, () => {
    const UPDATE_TENANT = gql`
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

    test(`error when unauthorized`, async () => {
      // Act
      const { mutate } = createApolloTestClient(graphqlServer)
      const { data, errors } = await mutate({
        mutation: UPDATE_TENANT,
        variables: {
          id: mongoose.Types.ObjectId().toHexString(),
          ...createFakeTenant(),
          apartmentId: mongoose.Types.ObjectId().toHexString(),
        },
      })

      // Assert
      expect(errors[0].extensions).toMatchInlineSnapshot(`
        Object {
          "code": "UNAUTHENTICATED",
        }
      `)
      expect(data.updateTenant).toBeNull()
    })

    test(`tenant is updated and returned`, async () => {
      // Arrange
      const tenant = await Tenant.create(createFakeTenant())

      // Act
      const updateData = createFakeTenant()
      const { data, errors } = await mutate({
        mutation: UPDATE_TENANT,
        variables: {
          ...updateData,
          id: tenant.id,
          apartmentId: updateData.apartmentId.toHexString(),
        },
      })

      // Assert
      expect(errors).toBeUndefined()
      expect(data.updateTenant).toMatchObject({
        ...updateData,
        apartmentId: updateData.apartmentId.toHexString(),
        dateOfBirth: updateData.dateOfBirth.toISOString(),
      })
    })
  })

  describe(`removeTenant`, () => {
    const REMOVE_TENANT = gql`
      mutation RemoveTenant($id: ID!) {
        removeTenant(id: $id)
      }
    `

    test(`error when unauthorized`, async () => {
      // Act
      const { mutate } = createApolloTestClient(graphqlServer)
      const { data, errors } = await mutate({
        mutation: REMOVE_TENANT,
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
      expect(data.removeTenant).toBeNull()
    })

    test(`apartment and it's tenants are removed`, async () => {
      // Arrange
      const tenant = await Tenant.create(createFakeTenant())

      // Act
      const { data, errors } = await mutate({
        mutation: REMOVE_TENANT,
        variables: { id: tenant.id },
      })

      // Assert
      const actualTenant = await Tenant.findById(tenant.id)

      expect(errors).toBeUndefined()
      expect(data.removeTenant).toBe(true)

      expect(actualTenant).toBeNull()
    })
  })
})

describe(`Query`, () => {
  describe(`getTenant`, () => {
    const GET_TENANT = gql`
      query GetTenant($id: ID!) {
        getTenant(id: $id) {
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

    test(`error when unauthorized`, async () => {
      // Act
      const { query } = createApolloTestClient(graphqlServer)
      const { data, errors } = await query({
        query: GET_TENANT,
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
      expect(data.getTenant).toBeNull()
    })

    test(`apartment is returned`, async () => {
      // Arrange
      const tenant = createFakeTenant()
      const { id } = await Tenant.create(tenant)

      // Act
      const { data, errors } = await query({
        query: GET_TENANT,
        variables: { id },
      })

      // Assert
      expect(errors).toBeUndefined()
      expect(data.getTenant).toMatchObject({
        ...tenant,
        apartmentId: tenant.apartmentId.toHexString(),
        dateOfBirth: tenant.dateOfBirth.toISOString(),
      })
    })
  })

  describe(`getApartmentTenants`, () => {
    const GET_APARTMENT_TENANTS = gql`
      query GetApartmentTenants($apartmentId: ID!) {
        getApartmentTenants(apartmentId: $apartmentId) {
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

    test(`error when unauthorized`, async () => {
      // Act
      const { query } = createApolloTestClient(graphqlServer)
      const { data, errors } = await query({
        query: GET_APARTMENT_TENANTS,
        variables: {
          apartmentId: mongoose.Types.ObjectId().toHexString(),
        },
      })

      // Assert
      expect(errors[0].extensions).toMatchInlineSnapshot(`
        Object {
          "code": "UNAUTHENTICATED",
        }
      `)
      expect(data.getApartmentTenants).toBeNull()
    })

    test(`apartment tenants are returned`, async () => {
      // Arrange
      const apartmentId = mongoose.Types.ObjectId()
      const tenants = Array(10)
        .fill(``)
        .map(() => ({ ...createFakeTenant(), apartmentId }))
      await Promise.all(tenants.map((data) => Tenant.create(data)))

      // Act
      const { data, errors } = await query({
        query: GET_APARTMENT_TENANTS,
        variables: { apartmentId: apartmentId.toHexString() },
      })

      // Assert
      expect(errors).toBeUndefined()
      expect(data.getApartmentTenants).toMatchObject(
        tenants.map((tenant) => ({
          ...tenant,
          apartmentId: tenant.apartmentId.toHexString(),
          dateOfBirth: tenant.dateOfBirth.toISOString(),
        })),
      )
    })
  })
})
