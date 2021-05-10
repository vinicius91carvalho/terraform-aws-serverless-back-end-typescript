import { Customer } from '@/domain/customer'
import { buildCustomerDTOFake } from '@/tests/shared/mocks/customer-dto-mock'
import { FindCustomerByIdRepositorySpy } from '@/tests/unit/usecases/mocks/find-customer-by-id-repository-mock'
import { LoadCustomerById } from '@/usecases/load-customer-by-id'
import faker from 'faker'

type SutTypes = {
  sut: LoadCustomerById
  findCustomerByIdRepositorySpy: FindCustomerByIdRepositorySpy
  fakeCustomer: Customer
}

const makeSut = (): SutTypes => {
  const findCustomerByIdRepositorySpy = new FindCustomerByIdRepositorySpy()
  const fakeCustomer = buildCustomerDTOFake()
  const sut = new LoadCustomerById(findCustomerByIdRepositorySpy)
  return {
    sut,
    fakeCustomer,
    findCustomerByIdRepositorySpy
  }
}

describe('LoadCustomerById', () => {
  test('Should call FindCustomerByIdRepository with correct value', async () => {
    const { sut, findCustomerByIdRepositorySpy } = makeSut()
    const customerId = faker.datatype.uuid()
    await sut.execute(customerId)
    expect(findCustomerByIdRepositorySpy.params).toEqual(customerId)
  })
})
