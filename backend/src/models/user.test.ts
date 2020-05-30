import { User } from './user'
import * as faker from 'faker'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

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
  test(`password is hashed on create`, async () => {
    // Arrange
    const info = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    // Act
    const actual = await User.create(info)

    // Assert
    expect(actual.password).not.toEqual(info.password)
  })
})

describe(`update`, () => {
  test(`password is rehashed on update if modified`, async () => {
    // Arrange
    const info = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    const user = await User.create(info)
    const oldHash = user.password

    // Act
    const newPassword = faker.internet.password()
    user.password = newPassword
    const updatedUser = await user.save()

    // Assert
    expect(updatedUser.password).not.toEqual(oldHash)
    expect(updatedUser.password).not.toEqual(newPassword)
  })

  test(`password is not rehashed on update if not modified`, async () => {
    // Arrange
    const info = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    const user = await User.create(info)

    // Act
    user.email = faker.internet.email()
    const updatedUser = await user.save()

    // Assert
    expect(updatedUser.password).toEqual(user.password)
  })
})

describe(`comparePassword`, () => {
  test(`returns true on correct password`, async () => {
    // Arrange
    const info = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    const user = await User.create(info)

    // Act
    const actual = await user.comparePassword(info.password)

    // Assert
    expect(actual).toBe(true)
  })

  test(`returns false on incorrect password`, async () => {
    // Arrange
    const info = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    const user = await User.create(info)

    // Act
    const actual = await user.comparePassword(faker.internet.password())

    // Assert
    expect(actual).toBe(false)
  })
})
