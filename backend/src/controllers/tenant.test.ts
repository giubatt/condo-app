import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import faker from 'faker'
import * as TenantController from './tenant'
import { Tenant } from '../models/tenant'

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

const fakeTenant = () => ({
  cpf: faker.random.number({ min: 10000000000, max: 99999999999 }).toString(),
  email: faker.internet.email(),
  name: faker.name.findName(),
  dateOfBirth: faker.date.past(30),
  phone: faker.lorem.word(),
})

describe(`create`, () => {
  test(`creates tenant`, async () => {
    // Arrange
    const data = fakeTenant()

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
      const tenant = await Tenant.create(fakeTenant())
      const data = {
        [key]: fakeTenant()[key],
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
    const expected = await Tenant.create(fakeTenant())

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
