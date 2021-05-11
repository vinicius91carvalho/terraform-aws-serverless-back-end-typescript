import { SearchCustomersController } from '@/presentation/controllers/search-customers-controller'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers/http-helpers'
import { HttpRequest } from '@/presentation/protocols/http-protocols'
import { SearchCustomersValidatorSpy } from '@/tests/unit/presentation/mocks/customer-mock'
import { SearchCustomersUseCaseSpy } from '@/tests/unit/presentation/mocks/search-customers-use-case-mock'
import { ValidationSchemaError } from '@/validation/validator-schema-error'
import faker from 'faker'

type SutTypes = {
  sut: SearchCustomersController
  fakeRequest: HttpRequest<void>
  searchCustomersValidatorSpy: SearchCustomersValidatorSpy
  searchCustomersUseCaseSpy: SearchCustomersUseCaseSpy
}

const makeSut = (): SutTypes => {
  const searchCustomersValidatorSpy = new SearchCustomersValidatorSpy()
  const searchCustomersUseCaseSpy = new SearchCustomersUseCaseSpy()
  const sut = new SearchCustomersController(searchCustomersValidatorSpy, searchCustomersUseCaseSpy)
  const fakeRequest: HttpRequest<void> = {
    user: {
      userEmail: faker.internet.email(),
      userGroup: 'admin'
    },
    path: '/any-path',
    pathParameters: {},
    queryStringParameters: {
      limit: 10,
      offset: 0,
      textToSearch: faker.random.word()
    },
    body: null
  }
  return {
    sut,
    fakeRequest,
    searchCustomersValidatorSpy,
    searchCustomersUseCaseSpy
  }
}

describe('SearchCustomersController', () => {
  test('Should call validator with correct values', async () => {
    const { sut, searchCustomersValidatorSpy, fakeRequest } = makeSut()
    const { limit, offset, textToSearch } = fakeRequest.queryStringParameters
    await sut.handle(fakeRequest)
    expect(searchCustomersValidatorSpy.params).toEqual({ limit, offset, textToSearch })
  })

  test('Should return 500 if validator throws an error', async () => {
    const { sut, searchCustomersValidatorSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    jest.spyOn(searchCustomersValidatorSpy, 'validate').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 400 if validator returns an ValidationSchemaError', async () => {
    const { sut, searchCustomersValidatorSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    const schemaError = new ValidationSchemaError([])
    searchCustomersValidatorSpy.result = Promise.resolve(schemaError)
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(badRequest(schemaError))
  })

  test('Should call SearchCustomersUseCase with correct value', async () => {
    const { sut, searchCustomersUseCaseSpy, fakeRequest } = makeSut()
    const { limit, offset, textToSearch } = fakeRequest.queryStringParameters
    await sut.handle(fakeRequest)
    expect(searchCustomersUseCaseSpy.params).toEqual({ limit, offset, textToSearch })
  })

  test('Should return 204 if SearchCustomersUseCase does not return customers', async () => {
    const { sut, searchCustomersUseCaseSpy, fakeRequest } = makeSut()
    searchCustomersUseCaseSpy.result = Promise.resolve(null)
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if SearchCustomersUseCase succeeds', async () => {
    const { sut, fakeRequest, searchCustomersUseCaseSpy } = makeSut()
    const dynamoDBPagedResult = await searchCustomersUseCaseSpy.result
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(ok(dynamoDBPagedResult))
  })
})
