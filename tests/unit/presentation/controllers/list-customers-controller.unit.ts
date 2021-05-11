import { ListCustomersController } from '@/presentation/controllers/list-customers-controller'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers/http-helpers'
import { HttpRequest } from '@/presentation/protocols/http-protocols'
import { ListCustomersValidatorSpy } from '@/tests/unit/presentation/mocks/customer-mock'
import { ListCustomersUseCaseSpy } from '@/tests/unit/presentation/mocks/list-customers-use-case-mock'
import { ValidationSchemaError } from '@/validation/validator-schema-error'
import faker from 'faker'

type SutTypes = {
  sut: ListCustomersController
  fakeRequest: HttpRequest<void>
  listCustomersValidatorSpy: ListCustomersValidatorSpy
  listCustomersUseCaseSpy: ListCustomersUseCaseSpy
}

const makeSut = (): SutTypes => {
  const listCustomersValidatorSpy = new ListCustomersValidatorSpy()
  const listCustomersUseCaseSpy = new ListCustomersUseCaseSpy()
  const sut = new ListCustomersController(listCustomersValidatorSpy, listCustomersUseCaseSpy)
  const fakeRequest: HttpRequest<void> = {
    user: {
      userEmail: faker.internet.email(),
      userGroup: 'admin'
    },
    path: '/any-path',
    pathParameters: {},
    queryStringParameters: {
      limit: 10,
      lastIdOffset: 0
    },
    body: null
  }
  return {
    sut,
    fakeRequest,
    listCustomersValidatorSpy,
    listCustomersUseCaseSpy
  }
}

describe('ListCustomersController', () => {
  test('Should call validator with correct values', async () => {
    const { sut, listCustomersValidatorSpy, fakeRequest } = makeSut()
    const { limit, lastIdOffset } = fakeRequest.queryStringParameters
    await sut.handle(fakeRequest)
    expect(listCustomersValidatorSpy.params).toEqual({ limit, lastIdOffset })
  })

  test('Should return 500 if validator throws an error', async () => {
    const { sut, listCustomersValidatorSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    jest.spyOn(listCustomersValidatorSpy, 'validate').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 400 if validator returns an ValidationSchemaError', async () => {
    const { sut, listCustomersValidatorSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    const schemaError = new ValidationSchemaError([])
    listCustomersValidatorSpy.result = Promise.resolve(schemaError)
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(badRequest(schemaError))
  })

  test('Should call ListCustomersUseCase with correct value', async () => {
    const { sut, listCustomersUseCaseSpy, fakeRequest } = makeSut()
    const { limit, lastIdOffset } = fakeRequest.queryStringParameters
    await sut.handle(fakeRequest)
    expect(listCustomersUseCaseSpy.params).toEqual({ limit, lastIdOffset })
  })

  test('Should return 204 if ListCustomersUseCase does not return customers', async () => {
    const { sut, listCustomersUseCaseSpy, fakeRequest } = makeSut()
    listCustomersUseCaseSpy.result = Promise.resolve(null)
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if ListCustomersUseCase succeeds', async () => {
    const { sut, fakeRequest, listCustomersUseCaseSpy } = makeSut()
    const pagedResult = await listCustomersUseCaseSpy.result
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(ok(pagedResult))
  })
})
