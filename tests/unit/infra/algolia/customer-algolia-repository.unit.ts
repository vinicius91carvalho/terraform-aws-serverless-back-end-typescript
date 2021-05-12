import { CustomerAlgoliaRepository } from '@/infra/algolia/customer-algolia-repository'
import { SearchCustomersRepositoryParams } from '@/usecases/protocols/search-customers-repository'
import algoliasearch from 'algoliasearch'
import faker from 'faker'

const searchSpy = jest.fn()
const initIndex = jest.fn()

jest.mock('algoliasearch', () => {
  return jest.fn().mockImplementation(() => ({
    initIndex: initIndex.mockImplementation(() => ({
      search: searchSpy
    }))
  }))
})

type SutTypes = {
  sut: CustomerAlgoliaRepository
  params: SearchCustomersRepositoryParams
}

const makeSut = (): SutTypes => {
  const sut = new CustomerAlgoliaRepository()
  const params: SearchCustomersRepositoryParams = {
    limit: faker.datatype.number(),
    offset: faker.datatype.number(),
    textToSearch: faker.random.words()
  }
  return {
    sut,
    params
  }
}

describe.only('CustomerAlgoliaRepository', () => {
  describe('search()', () => {
    test('Should call algoliasearch with correct values', async () => {
      const { sut, params } = makeSut()
      await sut.search(params)
      expect(algoliasearch).toHaveBeenCalledWith(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY)
    })

    test('Should call initIndex with correct value', async () => {
      const { sut, params } = makeSut()
      initIndex.mockReset()
      await sut.search(params)
      expect(algoliasearch(null, null).initIndex).toHaveBeenCalledWith(process.env.ALGOLIA_INDEX_NAME)
    })

    test('Should calls search with correct values', async () => {
      const { sut, params } = makeSut()
      searchSpy.mockReset()
      await sut.search(params)
      expect(searchSpy).toHaveBeenCalledWith(params.textToSearch, {
        hitsPerPage: params.limit,
        page: params.offset
      })
    })

    test('Should return data parsed', async () => {
      const { sut, params } = makeSut()
      const result = await sut.search(params)
      expect(result).toEqual({
        items: [],
        limit: params.limit,
        offset: params.offset,
        total: undefined
      })
    })
  })
})
