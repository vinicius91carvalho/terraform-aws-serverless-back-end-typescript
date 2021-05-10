import { Customer } from '@/domain/customer'
import { FindCustomerByEmailRepository } from '@/usecases/protocols/find-customer-by-email-repository'
import { SaveCustomerRepository } from '@/usecases/protocols/save-customer-repository'
import AWS from 'aws-sdk'
import getUuid from 'uuid-by-string'

export class CustomerDynamoDBRepository implements SaveCustomerRepository, FindCustomerByEmailRepository {
  async save (customer: Customer): Promise<Customer> {
    const customerToSave = {
      ...customer,
      id: getUuid(customer.email)
    }
    const dynamodb = new AWS.DynamoDB.DocumentClient()
    await dynamodb.put({
      TableName: process.env.DYNAMODB_CUSTOMER_TABLE_NAME,
      Item: customerToSave
    }).promise()
    return customerToSave
  }

  async findByEmail (email: string): Promise<Customer> {
    const id = getUuid(email)
    const dynamodb = new AWS.DynamoDB.DocumentClient()
    const data = await dynamodb.query({
      TableName: process.env.DYNAMODB_CUSTOMER_TABLE_NAME,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id
      }
    }).promise()
    return data.Items[0] as Customer
  }
}
