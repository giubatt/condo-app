import { Types } from 'mongoose'
import faker from 'faker'

export const createFakeTenant = (): {
  cpf: string
  email: string
  name: string
  dateOfBirth: Date
  phone: string
  primary: boolean
  apartmentId: Types.ObjectId
} => ({
  cpf: faker.random.number({ min: 10000000000, max: 99999999999 }).toString(),
  email: faker.internet.email(),
  name: faker.name.findName(),
  dateOfBirth: faker.date.past(30),
  phone: faker.lorem.word(),
  primary: faker.random.boolean(),
  apartmentId: Types.ObjectId(),
})

export const createFakeApartment = (): { number: number; block: string } => ({
  number: faker.random.number({ min: 1, max: 200 }),
  block: faker.random.alphaNumeric(2),
})

export const createFakeUser = (): { email: string; password: string } => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})
