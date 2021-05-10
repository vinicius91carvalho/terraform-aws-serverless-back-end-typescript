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

  test('Should throw if FindCustomerByIdRepository throws', async () => {
    const { sut, findCustomerByIdRepositorySpy } = makeSut()
    jest.spyOn(findCustomerByIdRepositorySpy, 'findById').mockRejectedValueOnce(new Error())
    await expect(sut.execute(faker.datatype.uuid())).rejects.toThrowError()
  })

  test('Should return a customer if FindCustomerByIdRepository succedds', async () => {
    const { sut, findCustomerByIdRepositorySpy } = makeSut()
    const customer = await sut.execute(faker.datatype.uuid())
    expect(findCustomerByIdRepositorySpy.result).toEqual(customer)
  })
})
