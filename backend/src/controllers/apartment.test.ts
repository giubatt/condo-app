import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { Types } from 'mongoose'
import * as ApartmentController from './apartment'
import { Apartment } from '../models/apartment'
import { Tenant } from '../models/tenant'
import { createFakeApartment, createFakeTenant } from '../tests/utils'

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

  test(`undefined if apartment doesn't exist`, async () => {
    // Act
    const actual = await ApartmentController.findById(mongoose.Types.ObjectId())

    // Assert
    expect(actual).toBeUndefined()
  })
})

describe(`find`, () => {
  test(`apartment list is returned`, async () => {
    // Arrange
    const apartments = Array(10).fill(``).map(createFakeApartment)
    await Promise.all(apartments.map((apartment) => Apartment.create(apartment)))

    // Act
    const actual = await ApartmentController.find()

    // Assert
    expect(actual).toMatchObject(expect.arrayContaining(apartments.map(expect.objectContaining)))
  })
})

describe(`remove`, () => {
  test(`throws error if apartment not found`, async () => {
    // Act
    const actual = ApartmentController.remove(mongoose.Types.ObjectId())

    // Assert
    await expect(actual).rejects.toThrowErrorMatchingInlineSnapshot(`"ApartmentNotFound"`)
  })

  test(`apartment and tenants are removed`, async () => {
    // Arrange
    const apartment = await Apartment.create(createFakeApartment())

    const tenants = Array(10)
      .fill(``)
      .map(() => ({ ...createFakeTenant(), apartmentId: apartment.id }))
    const tenantsIds = (await Promise.all(tenants.map((tenant) => Tenant.create(tenant)))).map(
      ({ id }) => id,
    ) as Types.ObjectId[]

    apartment.tenants = tenantsIds
    await apartment.save()

    // Act
    await ApartmentController.remove(apartment.id)

    // Assert
    const actualApartment = await Apartment.findById(apartment.id)
    const actualTenants = await Tenant.find({ apartmentId: apartment.id })

    expect(actualApartment).toBeNull()
    expect(actualTenants.length).toBe(0)
  })
})
