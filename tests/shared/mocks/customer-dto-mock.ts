import { Customer, GenderEnum } from '@/domain/customer'
import faker from 'faker'

export const buildFakeCustomer = (): Customer => ({
  id: faker.datatype.uuid(),
  fullName: faker.name.firstName() + ' ' + faker.name.lastName(),
  email: faker.internet.email(),
  gender: GenderEnum.FEMALE,
  birthDate: faker.date.past()
})

export const buildFakeCustomers = (): Customer[] => ([
  buildFakeCustomer(),
  buildFakeCustomer(),
  buildFakeCustomer()
])
