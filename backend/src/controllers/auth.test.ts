import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import faker from 'faker'
import * as AuthController from './auth'
import { User } from '../models/user'

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

describe(`login`, () => {
  test(`throws error on inexistent user`, async () => {
    // Act
    const actual = AuthController.login({
      email: faker.internet.email(),
      password: faker.internet.password(),
    })

    // Assert
    await expect(actual).rejects.toThrowErrorMatchingInlineSnapshot(`"InvalidCredentials"`)
  })

  test(`throws error on incorrect credentials`, async () => {
    // Arrange
    const data = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    await User.create(data)

    // Act
    const actual = AuthController.login({
      ...data,
      password: `test`,
    })

    // Assert
    await expect(actual).rejects.toThrowErrorMatchingInlineSnapshot(`"InvalidCredentials"`)
  })

  test(`returns token on correct credentials`, async () => {
    // Arrange
    const data = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    await User.create(data)

    // Act
    const actual = await AuthController.login(data)

    // Assert
    expect(actual).toEqual(expect.any(String))
  })
})

describe(`decodeToken`, () => {
  test(`throws error on invalid token`, async () => {
    // Assert
    expect(() => AuthController.decodeToken(`invalid_token`)).toThrowErrorMatchingInlineSnapshot(`"InvalidToken"`)
  })
})
