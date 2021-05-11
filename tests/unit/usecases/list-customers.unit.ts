import { ListCustomersRepositorySpy } from '@/tests/unit/usecases/mocks/list-customers-repository-mock'
import { ListCustomers } from '@/usecases/list-customers'
import faker from 'faker'

type SutTypes = {
  sut: ListCustomers
  listCustomersRepositorySpy: ListCustomersRepositorySpy
  params: {
    limit: number
    lastIdOffset?: string
  }
}

const makeSut = (): SutTypes => {
  const listCustomersRepositorySpy = new ListCustomersRepositorySpy()
  const sut = new ListCustomers(listCustomersRepositorySpy)
  const params = {
    limit: faker.datatype.number()
  }
  return {
    sut,
    listCustomersRepositorySpy,
    params
  }
}

describe('ListCustomers', () => {
  test('Should call ListCustomersRepository with correct value', async () => {
    const { sut, params, listCustomersRepositorySpy } = makeSut()
    await sut.execute(params.limit)
    expect(listCustomersRepositorySpy.params).toEqual({ limit: params.limit })
  })

  test('Should throw if ListCustomersRepository throws', async () => {
    const { sut, params, listCustomersRepositorySpy } = makeSut()
    jest.spyOn(listCustomersRepositorySpy, 'listAll').mockRejectedValueOnce(new Error())
    await expect(sut.execute(params.limit)).rejects.toThrowError()
  })

  test('Should return a customer if ListCustomersRepository succedds', async () => {
    const { sut, params, listCustomersRepositorySpy } = makeSut()
    const customers = await sut.execute(params.limit)
    const customersOnDB = await listCustomersRepositorySpy.result
    expect(customersOnDB).toEqual(customers)
  })
})
