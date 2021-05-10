import { LoadCustomerByIdController } from '@/presentation/controllers/load-customer-by-id-controller'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers/http-helpers'
import { HttpRequest } from '@/presentation/protocols/http-protocols'
import { LoadCustomerByIdValidatorSpy } from '@/tests/unit/presentation/mocks/customer-mock'
import { LoadCustomerByIdUseCaseSpy } from '@/tests/unit/presentation/mocks/load-customer-by-id-use-case-mock'
import { ValidationSchemaError } from '@/validation/validator-schema-error'
import faker from 'faker'

type SutTypes = {
  sut: LoadCustomerByIdController
  fakeRequest: HttpRequest<void>
  loadCustomerByIdValidatorSpy: LoadCustomerByIdValidatorSpy
  loadCustomerByIdUseCaseSpy: LoadCustomerByIdUseCaseSpy
}

const makeSut = (): SutTypes => {
  const loadCustomerByIdValidatorSpy = new LoadCustomerByIdValidatorSpy()
  const loadCustomerByIdUseCaseSpy = new LoadCustomerByIdUseCaseSpy()
  const sut = new LoadCustomerByIdController(loadCustomerByIdValidatorSpy, loadCustomerByIdUseCaseSpy)
  const fakeRequest: HttpRequest<void> = {
    user: {
      userEmail: faker.internet.email(),
      userGroup: 'admin'
    },
    path: '/any-path',
    pathParameters: {
      customerId: faker.datatype.uuid()
    },
    queryStringParameters: {},
    body: null
  }
  return {
    sut,
    fakeRequest,
    loadCustomerByIdValidatorSpy,
    loadCustomerByIdUseCaseSpy
  }
}

describe('LoadCustomerByIdController', () => {
  test('Should call validator with correct values', async () => {
    const { sut, loadCustomerByIdValidatorSpy, fakeRequest } = makeSut()
    const customerId = fakeRequest.pathParameters.customerId
    await sut.handle(fakeRequest)
    expect(loadCustomerByIdValidatorSpy.params).toEqual({ customerId })
  })

  test('Should return 500 if validator throws an error', async () => {
    const { sut, loadCustomerByIdValidatorSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    jest.spyOn(loadCustomerByIdValidatorSpy, 'validate').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 400 if validator returns an ValidationSchemaError', async () => {
    const { sut, loadCustomerByIdValidatorSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    const schemaError = new ValidationSchemaError([])
    loadCustomerByIdValidatorSpy.result = Promise.resolve(schemaError)
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(badRequest(schemaError))
  })

  test('Should call LoadCustomerByIdUseCase with correct value', async () => {
    const { sut, loadCustomerByIdUseCaseSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    expect(loadCustomerByIdUseCaseSpy.params).toEqual(fakeRequest.pathParameters.customerId)
  })

  test('Should return 204 if LoadCustomerByIdUseCase does not return a customer', async () => {
    const { sut, loadCustomerByIdUseCaseSpy, fakeRequest } = makeSut()
    loadCustomerByIdUseCaseSpy.result = Promise.resolve(null)
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if LoadCustomerByIdUseCase succeeds', async () => {
    const { sut, fakeRequest, loadCustomerByIdUseCaseSpy } = makeSut()
    const customer = await loadCustomerByIdUseCaseSpy.result
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(ok(customer))
  })
})
