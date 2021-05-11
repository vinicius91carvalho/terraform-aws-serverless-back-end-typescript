import { SaveCustomerController } from '@/presentation/controllers/save-customer-controller'
import { CustomerDTO } from '@/presentation/dtos/customer-dto'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { badRequest, created, forbidden, ok, serverError } from '@/presentation/helpers/http-helpers'
import { HttpRequest } from '@/presentation/protocols/http-protocols'
import { buildFakeCustomer } from '@/tests/shared/mocks/customer-dto-mock'
import { CustomerValidatorSpy } from '@/tests/unit/presentation/mocks/customer-mock'
import { SaveCustomerUseCaseSpy } from '@/tests/unit/presentation/mocks/save-customer-use-case-mock'
import { ValidationSchemaError } from '@/validation/validator-schema-error'
import faker from 'faker'

type SutTypes = {
  sut: SaveCustomerController
  fakeRequest: HttpRequest<CustomerDTO>
  customerValidatorSpy: CustomerValidatorSpy
  saveCustomerUseCaseSpy: SaveCustomerUseCaseSpy
}

const makeSut = (): SutTypes => {
  const customerValidatorSpy = new CustomerValidatorSpy()
  const saveCustomerUseCaseSpy = new SaveCustomerUseCaseSpy()
  const sut = new SaveCustomerController(customerValidatorSpy, saveCustomerUseCaseSpy)
  const fakeRequest: HttpRequest<CustomerDTO> = {
    user: {
      userEmail: faker.internet.email(),
      userGroup: 'admin'
    },
    path: '/any-path',
    pathParameters: {},
    queryStringParameters: {},
    body: buildFakeCustomer()
  }
  return {
    sut,
    fakeRequest,
    customerValidatorSpy,
    saveCustomerUseCaseSpy
  }
}

describe('SaveCustomerController', () => {
  test('Should call validator with correct values', async () => {
    const { sut, customerValidatorSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    expect(customerValidatorSpy.params).toEqual(fakeRequest.body)
  })

  test('Should return 500 if validator throws an error', async () => {
    const { sut, customerValidatorSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    jest.spyOn(customerValidatorSpy, 'validate').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 400 if validator returns an ValidationSchemaError', async () => {
    const { sut, customerValidatorSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    const schemaError = new ValidationSchemaError([])
    customerValidatorSpy.result = Promise.resolve(schemaError)
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(badRequest(schemaError))
  })

  test('Should call SaveCustomerUseCase with correct value', async () => {
    const { sut, saveCustomerUseCaseSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    expect(saveCustomerUseCaseSpy.params).toEqual(fakeRequest.body)
  })

  test('Should return 500 if SaveCustomerUseCase throws', async () => {
    const { sut, saveCustomerUseCaseSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    jest.spyOn(saveCustomerUseCaseSpy, 'execute').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if SaveCustomerUseCase returns an error', async () => {
    const { sut, saveCustomerUseCaseSpy, fakeRequest } = makeSut()
    saveCustomerUseCaseSpy.result = new EmailInUseError()
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 200 if SaveCustomerUseCase updates the user', async () => {
    const { sut, fakeRequest } = makeSut()
    const customer = fakeRequest.body
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(ok(customer))
  })

  test('Should return 201 if SaveCustomerUseCase creates a new user', async () => {
    const { sut, fakeRequest } = makeSut()
    fakeRequest.body.id = null
    const customer = fakeRequest.body
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(created(customer))
  })
})
