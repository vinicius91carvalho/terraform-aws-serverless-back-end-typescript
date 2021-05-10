import { LoadCustomerByIdController } from '@/presentation/controllers/load-customer-by-id-controller'
import { HttpRequest } from '@/presentation/protocols/http-protocols'
import { LoadCustomerByIdValidatorSpy } from '@/tests/unit/presentation/mocks/customer-mock'
import faker from 'faker'

type SutTypes = {
  sut: LoadCustomerByIdController
  fakeRequest: HttpRequest<void>
  loadCustomerByIdValidatorSpy: LoadCustomerByIdValidatorSpy
}

const makeSut = (): SutTypes => {
  const loadCustomerByIdValidatorSpy = new LoadCustomerByIdValidatorSpy()
  const sut = new LoadCustomerByIdController(loadCustomerByIdValidatorSpy)
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
    loadCustomerByIdValidatorSpy
  }
}

describe('LoadCustomerByIdController', () => {
  test('Should call validator with correct values', async () => {
    const { sut, loadCustomerByIdValidatorSpy, fakeRequest } = makeSut()
    await sut.handle(fakeRequest)
    expect(loadCustomerByIdValidatorSpy.params).toEqual(fakeRequest.pathParameters.customerId)
  })
})
