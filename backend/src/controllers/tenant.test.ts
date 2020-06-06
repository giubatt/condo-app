import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import * as TenantController from './tenant'
import { Tenant } from '../models/tenant'
import { createFakeTenant } from '../tests/utils'

const mongod = new MongoMemoryServer()

beforeAll(async (done) => {
  await mongoose.connect(await mongod.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
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

describe(`create`, () => {
  test(`creates tenant`, async () => {
    // Arrange
    const data = createFakeTenant()

    // Act
    const actual = await TenantController.create(data)

    // Assert
    expect(actual).toMatchObject(data)
  })
})

describe(`update`, () => {
  test(`throws error if tenant not found`, async () => {
    // Act
    const actual = TenantController.update({ id: mongoose.Types.ObjectId() })

    // Assert
    await expect(actual).rejects.toThrowErrorMatchingInlineSnapshot(`"TenantNotFound"`)
  })

  test.each([`cpf`, `email`, `name`, `dateOfBirth`, `phone`])(
    `update %s`,
    async (key: `cpf` | `email` | `name` | `dateOfBirth` | `phone`) => {
      // Arrange
      const tenant = await Tenant.create(createFakeTenant())
      const data = {
        [key]: createFakeTenant()[key],
      }

      // Act
      const actual = await TenantController.update({ id: tenant.id, ...data })

      // Assert
      expect(actual).toMatchObject(data)
    },
  )
})

describe(`findById`, () => {
  test(`tenant is returned`, async () => {
    // Arrange
    const expected = await Tenant.create(createFakeTenant())

    // Act
    const actual = await TenantController.findById(expected.id)

    // Assert
    expect(actual).toMatchObject(expected.toObject())
  })

  test(`undefined if tenant doesn't exist`, async () => {
    // Act
    const actual = await TenantController.findById(mongoose.Types.ObjectId())

    // Assert
    expect(actual).toBeUndefined()
  })
})

describe(`remove`, () => {
  test(`throws error if tenant not found`, async () => {
    // Act
    const actual = TenantController.remove(mongoose.Types.ObjectId())

    // Assert
    await expect(actual).rejects.toThrowErrorMatchingInlineSnapshot(`"TenantNotFound"`)
  })

  test(`tenant is removed`, async () => {
    // Arrange
    const tenant = await Tenant.create(createFakeTenant())
    await tenant.save()

    // Act
    await TenantController.remove(tenant.id)

    // Assert
    const actualTenant = await Tenant.findById(tenant.id)

    expect(actualTenant).toBeNull()
  })
})
