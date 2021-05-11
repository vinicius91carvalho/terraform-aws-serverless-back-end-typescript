import { LoadCustomersController } from '@/presentation/controllers/load-customers-controller'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers/http-helpers'
import { HttpRequest } from '@/presentation/protocols/http-protocols'
import { LoadCustomersValidatorSpy } from '@/tests/unit/presentation/mocks/customer-mock'
import { LoadCustomersUseCaseSpy } from '@/tests/unit/presentation/mocks/load-customers-use-case-mock'
import { ValidationSchemaError } from '@/validation/validator-schema-error'
import faker from 'faker'

type SutTypes = {
  sut: LoadCustomersController
  fakeRequest: HttpRequest<void>
  loadCustomersValidatorSpy: LoadCustomersValidatorSpy
  loadCustomersUseCaseSpy: LoadCustomersUseCaseSpy
}

const makeSut = (): SutTypes => {
  const loadCustomersValidatorSpy = new LoadCustomersValidatorSpy()
  const loadCustomersUseCaseSpy = new LoadCustomersUseCaseSpy()
  const sut = new LoadCustomersController(loadCustomersValidatorSpy, loadCustomersUseCaseSpy)
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
    loadCustomersValidatorSpy,
    loadCustomersUseCaseSpy
  }
}

describe('LoadCustomersController', () => {
  test('Should call validator with correct values', async () => {
    const { sut, loadCustomersValidatorSpy, fakeRequest } = makeSut()
    const { limit, lastIdOffset } = fakeRequest.queryStringParameters
    await sut.handle(fakeRequest)
    expect(loadCustomersValidatorSpy.params).toEqual({ limit, lastIdOffset })
  })

  test('Should return 500 if validator throws an error', async () => {
    const { sut, loadCustomersValidatorSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    jest.spyOn(loadCustomersValidatorSpy, 'validate').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 400 if validator returns an ValidationSchemaError', async () => {
    const { sut, loadCustomersValidatorSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    const schemaError = new ValidationSchemaError([])
    loadCustomersValidatorSpy.result = Promise.resolve(schemaError)
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(badRequest(schemaError))
  })

  test('Should call LoadCustomersUseCase with correct value', async () => {
    const { sut, loadCustomersUseCaseSpy, fakeRequest } = makeSut()
    const { limit, lastIdOffset } = fakeRequest.queryStringParameters
    await sut.handle(fakeRequest)
    expect(loadCustomersUseCaseSpy.params).toEqual({ limit, lastIdOffset })
  })

  test('Should return 204 if LoadCustomersUseCase does not return customers', async () => {
    const { sut, loadCustomersUseCaseSpy, fakeRequest } = makeSut()
    loadCustomersUseCaseSpy.result = Promise.resolve(null)
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if LoadCustomersUseCase succeeds', async () => {
    const { sut, fakeRequest, loadCustomersUseCaseSpy } = makeSut()
    const customers = await loadCustomersUseCaseSpy.result
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(ok(customers))
  })
})
