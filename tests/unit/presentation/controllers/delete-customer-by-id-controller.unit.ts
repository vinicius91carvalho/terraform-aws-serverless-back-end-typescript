
import { DeleteCustomerByIdController } from '@/presentation/controllers/delete-customer-by-id-controller'
import { NotFoundError } from '@/presentation/errors/not-found-error'
import { badRequest, noContent, notFound, serverError } from '@/presentation/helpers/http-helpers'
import { HttpRequest } from '@/presentation/protocols/http-protocols'
import { DeleteCustomerByIdValidatorSpy } from '@/tests/unit/presentation/mocks/customer-mock'
import { DeleteCustomerByIdUseCaseSpy } from '@/tests/unit/presentation/mocks/delete-customer-by-id-use-case-mock'
import { LoadCustomerByIdUseCaseSpy } from '@/tests/unit/presentation/mocks/load-customer-by-id-use-case-mock'
import { ValidationSchemaError } from '@/validation/validator-schema-error'
import faker from 'faker'

type SutTypes = {
  sut: DeleteCustomerByIdController
  fakeRequest: HttpRequest<void>
  deleteCustomerByIdValidatorSpy: DeleteCustomerByIdValidatorSpy
  loadCustomerByIdUseCaseSpy: LoadCustomerByIdUseCaseSpy
  deleteCustomerByIdUseCaseSpy: DeleteCustomerByIdUseCaseSpy
}

const makeSut = (): SutTypes => {
  const deleteCustomerByIdValidatorSpy = new DeleteCustomerByIdValidatorSpy()
  const loadCustomerByIdUseCaseSpy = new LoadCustomerByIdUseCaseSpy()
  const deleteCustomerByIdUseCaseSpy = new DeleteCustomerByIdUseCaseSpy()
  const sut = new DeleteCustomerByIdController(deleteCustomerByIdValidatorSpy, loadCustomerByIdUseCaseSpy, deleteCustomerByIdUseCaseSpy)
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
    deleteCustomerByIdValidatorSpy,
    loadCustomerByIdUseCaseSpy,
    deleteCustomerByIdUseCaseSpy
  }
}

describe('DeleteCustomerByIdController', () => {
  test('Should call validator with correct values', async () => {
    const { sut, deleteCustomerByIdValidatorSpy, fakeRequest } = makeSut()
    const customerId = fakeRequest.pathParameters.customerId
    await sut.handle(fakeRequest)
    expect(deleteCustomerByIdValidatorSpy.params).toEqual({ customerId })
  })

  test('Should return 500 if validator throws an error', async () => {
    const { sut, deleteCustomerByIdValidatorSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    jest.spyOn(deleteCustomerByIdValidatorSpy, 'validate').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 400 if validator returns an ValidationSchemaError', async () => {
    const { sut, deleteCustomerByIdValidatorSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    const schemaError = new ValidationSchemaError([])
    deleteCustomerByIdValidatorSpy.result = Promise.resolve(schemaError)
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(badRequest(schemaError))
  })

  test('Should call LoadCustomerByIdUseCase with correct value', async () => {
    const { sut, loadCustomerByIdUseCaseSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    expect(loadCustomerByIdUseCaseSpy.params).toEqual(fakeRequest.pathParameters.customerId)
  })

  test('Should return 404 if LoadCustomerByIdUseCase does not return a customer', async () => {
    const { sut, loadCustomerByIdUseCaseSpy, fakeRequest } = makeSut()
    loadCustomerByIdUseCaseSpy.result = Promise.resolve(null)
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(notFound(new NotFoundError()))
  })

  test('Should call DeleteCustomerByIdUseCase with correct value', async () => {
    const { sut, deleteCustomerByIdUseCaseSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    expect(deleteCustomerByIdUseCaseSpy.params).toEqual(fakeRequest.pathParameters.customerId)
  })

  test('Should return 204 if DeleteCustomerByIdController succeeds', async () => {
    const { sut, fakeRequest } = makeSut()
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(noContent())
  })
})
