import { SearchCustomersRepositorySpy } from '@/tests/unit/usecases/mocks/search-customers-repository-mock'
import { SearchCustomersRepositoryParams } from '@/usecases/protocols/search-customers-repository'
import { SearchCustomers } from '@/usecases/search-customers'
import faker from 'faker'

type SutTypes = {
  sut: SearchCustomers
  searchCustomersRepositorySpy: SearchCustomersRepositorySpy
  params: SearchCustomersRepositoryParams
}

const makeSut = (): SutTypes => {
  const searchCustomersRepositorySpy = new SearchCustomersRepositorySpy()
  const sut = new SearchCustomers(searchCustomersRepositorySpy)
  const params = {
    limit: faker.datatype.number(),
    offset: faker.datatype.number(),
    textToSearch: faker.random.words()
  }
  return {
    sut,
    searchCustomersRepositorySpy,
    params
  }
}

describe('SearchCustomers', () => {
  test('Should call SearchCustomersRepository with correct value', async () => {
    const { sut, params, searchCustomersRepositorySpy } = makeSut()
    await sut.execute(params)
    expect(searchCustomersRepositorySpy.params).toEqual(params)
  })

  test('Should throw if SearchCustomersRepository throws', async () => {
    const { sut, params, searchCustomersRepositorySpy } = makeSut()
    jest.spyOn(searchCustomersRepositorySpy, 'search').mockRejectedValueOnce(new Error())
    await expect(sut.execute(params)).rejects.toThrowError()
  })

  test('Should return a customer if SearchCustomersRepository succedds', async () => {
    const { sut, params, searchCustomersRepositorySpy } = makeSut()
    const paginationResult = await sut.execute(params)
    const pagination = await searchCustomersRepositorySpy.result
    expect(paginationResult).toEqual(pagination)
  })
})
