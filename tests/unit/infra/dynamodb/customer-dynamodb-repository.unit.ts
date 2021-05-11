import { Customer } from '@/domain/customer'
import { CustomerDynamoDBRepository } from '@/infra/dynamodb/customer-dynamodb-repository'
import { buildFakeCustomer } from '@/tests/shared/mocks/customer-dto-mock'
import faker from 'faker'
import getUuid from 'uuid-by-string'

const putSpy = jest.fn()
const querySpy = jest.fn()
const scanSpy = jest.fn()
const deleteSpy = jest.fn()

jest.mock('uuid-by-string', () => {
  return () => 'uuid'
})

jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: jest.fn().mockImplementation(() => ({
      put: putSpy,
      query: querySpy,
      delete: deleteSpy,
      scan: scanSpy
    }))
  }
}))

type SutTypes = {
  sut: CustomerDynamoDBRepository
  fakeCustomer: Customer
}

const makeSut = (): SutTypes => {
  const fakeCustomer = buildFakeCustomer()
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

  describe('findByEmail()', () => {
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

  describe('findById()', () => {
    test('Should call query method on DocumentClient with correct values', async () => {
      const { sut, fakeCustomer } = makeSut()
      querySpy.mockImplementationOnce(() => ({
        promise: async () => Promise.resolve({
          Items: [fakeCustomer]
        })
      }))
      await sut.findById(fakeCustomer.id)
      const params = {
        TableName: process.env.DYNAMODB_CUSTOMER_TABLE_NAME,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
          ':id': fakeCustomer.id
        }
      }
      expect(querySpy).toHaveBeenCalledWith(params)
    })
  })

  describe('deleteById()', () => {
    test('Should call delete method on DocumentClient with correct values', async () => {
      const { sut, fakeCustomer } = makeSut()
      deleteSpy.mockImplementationOnce(() => ({
        promise: async () => Promise.resolve()
      }))
      await sut.deleteById(fakeCustomer.id)
      const params = {
        TableName: process.env.DYNAMODB_CUSTOMER_TABLE_NAME,
        Key: {
          id: fakeCustomer.id
        }
      }
      expect(deleteSpy).toHaveBeenCalledWith(params)
    })
  })

  describe('load()', () => {
    test('Should call scan method on DocumentClient with correct values', async () => {
      const { sut, fakeCustomer } = makeSut()
      scanSpy.mockImplementationOnce(() => ({
        promise: async () => Promise.resolve({
          Items: [fakeCustomer]
        })
      }))
      const limit = faker.datatype.number()
      await sut.load(limit)
      const params = {
        TableName: process.env.DYNAMODB_CUSTOMER_TABLE_NAME,
        Limit: limit
      }
      expect(scanSpy).toHaveBeenCalledWith(params)
    })

    test('Should call scan method on DocumentClient with limit and lastIdOffset', async () => {
      const { sut, fakeCustomer } = makeSut()
      scanSpy.mockImplementationOnce(() => ({
        promise: async () => Promise.resolve({
          Items: [fakeCustomer]
        })
      }))
      const limit = faker.datatype.number()
      const lastIdOffset = faker.datatype.uuid()
      await sut.load(limit, lastIdOffset)
      const params = {
        TableName: process.env.DYNAMODB_CUSTOMER_TABLE_NAME,
        Limit: limit,
        ExclusiveStartKey: {
          id: lastIdOffset
        }
      }
      expect(scanSpy).toHaveBeenCalledWith(params)
    })
  })
})
