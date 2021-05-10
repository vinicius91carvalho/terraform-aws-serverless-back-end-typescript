import { CustomerDynamoDBRepository } from '@/infra/dynamodb/customer-dynamodb-repository'

export const makeCustomerDynamoDBRepository = (): CustomerDynamoDBRepository => {
  return new CustomerDynamoDBRepository()
}
