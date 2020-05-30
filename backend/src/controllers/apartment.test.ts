import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import faker from 'faker'
import * as ApartmentController from './apartment'
import { Apartment } from '../models/apartment'

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
  test(`creates apartment`, async () => {
    // Arrange
    const data = {
      number: faker.random.number({ min: 1, max: 200 }),
      block: faker.random.alphaNumeric(2),
    }

    // Act
    const actual = await ApartmentController.create(data)

    // Assert
    expect(actual).toMatchObject(data)
  })
})

describe(`update`, () => {
  test(`throws error if apartment not found`, async () => {
    // Act
    const actual = ApartmentController.update({ id: mongoose.Types.ObjectId() })

    // Assert
    await expect(actual).rejects.toThrowErrorMatchingInlineSnapshot(`"ApartmentNotFound"`)
  })

  test(`update apartment number`, async () => {
    // Arrange
    const apartment = await Apartment.create({
      number: faker.random.number({ min: 1, max: 200 }),
      block: faker.random.alphaNumeric(2),
    })

    const data = {
      number: faker.random.number({ min: 1, max: 200 }),
    }

    // Act
    const actual = await ApartmentController.update({ id: apartment.id, ...data })

    // Assert
    expect(actual).toMatchObject(data)
  })

  test(`update apartment block`, async () => {
    // Arrange
    const apartment = await Apartment.create({
      number: faker.random.number({ min: 1, max: 200 }),
      block: faker.random.alphaNumeric(2),
    })

    const data = {
      block: faker.random.alphaNumeric(2),
    }

    // Act
    const actual = await ApartmentController.update({ id: apartment.id, ...data })

    // Assert
    expect(actual).toMatchObject(data)
  })
})

describe(`findById`, () => {
  test(`apartment is returned`, async () => {
    // Arrange
    const expected = await Apartment.create({
      number: faker.random.number({ min: 1, max: 200 }),
      block: faker.random.alphaNumeric(2),
    })

    // Act
    const actual = await ApartmentController.findById(expected.id)

    // Assert
    expect(actual).toMatchObject(expected.toObject())
  })

  test(`undefined if apartment doesn't exist`, async () => {
    // Act
    const actual = await ApartmentController.findById(mongoose.Types.ObjectId())

    // Assert
    expect(actual).toBeUndefined()
  })
})
