import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { Types } from 'mongoose'
import * as ApartmentController from './apartment'
import { Apartment } from '../models/apartment'
import { Tenant } from '../models/tenant'
import { createFakeTenant, createFakeApartment } from '../tests/utils'

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
    const data = createFakeApartment()

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
    const apartment = await Apartment.create(createFakeApartment())

    const data = {
      number: createFakeApartment().number,
    }

    // Act
    const actual = await ApartmentController.update({ id: apartment.id, ...data })

    // Assert
    expect(actual).toMatchObject(data)
  })

  test(`update apartment block`, async () => {
    // Arrange
    const apartment = await Apartment.create(createFakeApartment())

    const data = {
      block: createFakeApartment().block,
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
    const expected = await Apartment.create(createFakeApartment())

    // Act
    const actual = await ApartmentController.findById(expected.id)

    // Assert
    expect(actual).toMatchObject(expected.toObject())
  })

  test(`apartment is returned with tenants populated`, async () => {
    // Arrange
    const tenants = await Tenant.create(Array(3).fill(``).map(createFakeTenant))

    const apartment = await Apartment.create({
      ...createFakeApartment(),
      tenants: [
        {
          primary: true,
          tenant: tenants[0].id,
        },
        {
          tenant: tenants[1].id,
        },
        {
          tenant: tenants[2].id,
        },
      ],
    })

    const expected = apartment.toObject()
    expected.tenants = expected.tenants.map((item: { primary: boolean; tenant: Types.ObjectId }) => ({
      primary: item.primary,
      tenant: tenants.find(({ id }) => id === item.tenant.toHexString()).toObject(),
    }))

    // Act
    const actual = await ApartmentController.findById(apartment.id)

    // Assert
    expect(actual).toMatchObject(expected)
  })

  test(`undefined if apartment doesn't exist`, async () => {
    // Act
    const actual = await ApartmentController.findById(mongoose.Types.ObjectId())

    // Assert
    expect(actual).toBeUndefined()
  })
})
