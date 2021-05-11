import { GenderEnum } from '@/domain/customer'
import { CustomerDTO } from '@/presentation/dtos/customer-dto'
import faker from 'faker'

export const buildFakeCustomer = (): CustomerDTO => ({
  id: faker.datatype.uuid(),
  fullName: faker.name.firstName() + ' ' + faker.name.lastName(),
  email: faker.internet.email(),
  gender: GenderEnum.FEMALE,
  birthDate: faker.date.past()
})

export const buildFakeCustomers = (): CustomerDTO[] => ([
  buildFakeCustomer(),
  buildFakeCustomer(),
  buildFakeCustomer()
])
