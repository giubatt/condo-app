import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import faker from 'faker'
import * as UserController from './user'
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

describe(`create`, () => {
  test(`creates user`, async () => {
    // Arrange
    const data = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    // Act
    const actual = await UserController.create(data)

    // Assert
    expect(actual).toMatchObject({
      ...data,
      password: expect.any(String),
    })
  })
})

describe(`update`, () => {
  test(`throws error if user not found`, async () => {
    // Act
    const actual = UserController.update({ id: mongoose.Types.ObjectId() })

    // Assert
    await expect(actual).rejects.toThrowErrorMatchingInlineSnapshot(`"UserNotFound"`)
  })

  test(`update user email`, async () => {
    // Arrange
    const user = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    })

    const data = {
      email: faker.internet.email(),
    }

    // Act
    const actual = await UserController.update({ id: user.id, ...data })

    // Assert
    expect(actual).toMatchObject({
      ...data,
      password: user.password,
    })
  })

  test(`update user password`, async () => {
    // Arrange
    const user = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    })

    const data = {
      password: faker.internet.password(),
    }

    // Act
    const actual = await UserController.update({ id: user.id, ...data })
    const updatedUser = await User.findById(user.id)
    const passwordMatches = await updatedUser.comparePassword(data.password)

    // Assert
    expect(actual.password).not.toEqual(user.password)
    expect(passwordMatches).toBe(true)
  })
})

describe(`findById`, () => {
  test(`user is returned`, async () => {
    // Arrange
    const user = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    })

    // Act
    const actual = await UserController.findById(user.id)

    // Assert
    expect(actual).toMatchObject(user.toObject())
  })

  test(`undefined if user doesn't exist`, async () => {
    // Act
    const actual = await UserController.findById(mongoose.Types.ObjectId())

    // Assert
    expect(actual).toBeUndefined()
  })
})
