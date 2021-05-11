import { LoadCustomersRepositorySpy } from '@/tests/unit/usecases/mocks/load-customers-repository-mock'
import { LoadCustomers } from '@/usecases/load-customers'
import faker from 'faker'

type SutTypes = {
  sut: LoadCustomers
  loadCustomersRepositorySpy: LoadCustomersRepositorySpy
  params: {
    limit: number
    lastIdOffset?: string
  }
}

const makeSut = (): SutTypes => {
  const loadCustomersRepositorySpy = new LoadCustomersRepositorySpy()
  const sut = new LoadCustomers(loadCustomersRepositorySpy)
  const params = {
    limit: faker.datatype.number()
  }
  return {
    sut,
    loadCustomersRepositorySpy,
    params
  }
}

describe('LoadCustomers', () => {
  test('Should call LoadCustomersRepository with correct value', async () => {
    const { sut, params, loadCustomersRepositorySpy } = makeSut()
    await sut.execute(params.limit)
    expect(loadCustomersRepositorySpy.params).toEqual({ limit: params.limit })
  })

  test('Should throw if LoadCustomersRepository throws', async () => {
    const { sut, params, loadCustomersRepositorySpy } = makeSut()
    jest.spyOn(loadCustomersRepositorySpy, 'load').mockRejectedValueOnce(new Error())
    await expect(sut.execute(params.limit)).rejects.toThrowError()
  })

  test('Should return a customer if LoadCustomersRepository succedds', async () => {
    const { sut, params, loadCustomersRepositorySpy } = makeSut()
    const customers = await sut.execute(params.limit)
    const customersOnDB = await loadCustomersRepositorySpy.result
    expect(customersOnDB).toEqual(customers)
  })
})
