import { Customer } from '@/domain/customer'
import { CustomerDynamoDBRepository } from '@/infra/dynamodb/customer-dynamodb-repository'
import { buildCustomerDTOFake } from '@/tests/shared/mocks/customer-dto-mock'
import getUuid from 'uuid-by-string'

const putSpy = jest.fn()
const querySpy = jest.fn()

jest.mock('uuid-by-string', () => {
  return () => 'uuid'
})

jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: jest.fn().mockImplementation(() => ({
      put: putSpy,
      query: querySpy
    }))
  }
}))

type SutTypes = {
  sut: CustomerDynamoDBRepository
  fakeCustomer: Customer
}

const makeSut = (): SutTypes => {
  const fakeCustomer = buildCustomerDTOFake()
  const sut = new CustomerDynamoDBRepository()
  return {
    fakeCustomer,
    sut
  }
}

describe('CustomerDynamoDBRepository', () => {
  describe('save()', () => {
    test('Should call put method on DocumentClient with correct values', async () => {
      const { sut, fakeCustomer } = makeSut()
      putSpy.mockImplementationOnce(() => ({
        promise: async () => Promise.resolve({
          Attributes: ''
        })
      }))
      await sut.save(fakeCustomer)
      const params = {
        TableName: process.env.DYNAMODB_CUSTOMER_TABLE_NAME,
        Item: {
          ...fakeCustomer,
          id: getUuid(fakeCustomer.email)
        }
      }
      expect(putSpy).toHaveBeenCalledWith(params)
    })

    test('Should return the updated customer', async () => {
      const { sut, fakeCustomer } = makeSut()
      putSpy.mockImplementationOnce(() => ({
        promise: async () => Promise.resolve({
          Attributes: fakeCustomer
        })
      }))
      const customer = await sut.save(fakeCustomer)
      expect(customer).toEqual(customer)
    })
  })

  describe('find()', () => {
    test('Should call query method on DocumentClient with correct values', async () => {
      const { sut, fakeCustomer } = makeSut()
      querySpy.mockImplementationOnce(() => ({
        promise: async () => Promise.resolve({
          Items: [fakeCustomer]
        })
      }))
      await sut.findByEmail(fakeCustomer.email)
      const params = {
        TableName: process.env.DYNAMODB_CUSTOMER_TABLE_NAME,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
          ':id': getUuid(fakeCustomer.email)
        }
      }
      expect(querySpy).toHaveBeenCalledWith(params)
    })
  })
})
