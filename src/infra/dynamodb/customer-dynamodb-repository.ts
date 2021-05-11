import { Customer } from '@/domain/customer'
import { DynamoDBPagedResult } from '@/shared/dynamodb-paged-result'
import { DeleteCustomerByIdRepository } from '@/usecases/protocols/delete-customer-by-id-repository'
import { FindCustomerByEmailRepository } from '@/usecases/protocols/find-customer-by-email-repository'
import { FindCustomerByIdRepository } from '@/usecases/protocols/find-customer-by-id-repository'
import { ListCustomersRepository } from '@/usecases/protocols/list-customers-repository'
import { SaveCustomerRepository } from '@/usecases/protocols/save-customer-repository'
import AWS from 'aws-sdk'
import getUuid from 'uuid-by-string'

export class CustomerDynamoDBRepository implements SaveCustomerRepository, FindCustomerByEmailRepository, FindCustomerByIdRepository, DeleteCustomerByIdRepository, ListCustomersRepository {
  private readonly dynamodb: AWS.DynamoDB.DocumentClient

  constructor () {
    this.dynamodb = new AWS.DynamoDB.DocumentClient()
  }

  async save (customer: Customer): Promise<Customer> {
    const customerToSave = {
      ...customer,
      id: getUuid(customer.email)
    }
    await this.dynamodb.put({
      TableName: process.env.DYNAMODB_CUSTOMER_TABLE_NAME,
      Item: customerToSave
    }).promise()
    return customerToSave
  }

  async findByEmail (email: string): Promise<Customer> {
    const id = getUuid(email)
    const data = await this.dynamodb.query({
      TableName: process.env.DYNAMODB_CUSTOMER_TABLE_NAME,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id
      }
    }).promise()
    return data.Items[0] as Customer
  }

  async findById (id: string): Promise<Customer> {
    const data = await this.dynamodb.query({
      TableName: process.env.DYNAMODB_CUSTOMER_TABLE_NAME,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id
      }
    }).promise()
    return (data.Items && data.Items.length > 0) ? data.Items[0] as Customer : null
  }

  async deleteById (id: string): Promise<void> {
    await this.dynamodb.delete({
      TableName: process.env.DYNAMODB_CUSTOMER_TABLE_NAME,
      Key: {
        id
      }
    }).promise()
  }

  async listAll (limit: number, lastIdOffset?: string): Promise<DynamoDBPagedResult<Customer>> {
    const params: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: process.env.DYNAMODB_CUSTOMER_TABLE_NAME,
      Limit: limit
    }
    if (lastIdOffset) {
      params.ExclusiveStartKey = { id: lastIdOffset }
    }
    const response = await this.dynamodb.scan(params).promise()
    return {
      items: response.Items as Customer[],
      lastKey: response.LastEvaluatedKey
    }
  }
}
