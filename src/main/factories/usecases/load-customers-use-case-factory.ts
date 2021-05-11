import { makeCustomerDynamoDBRepository } from '@/main/factories/infra/customer-dynamodb-repository-factory'
import { LoadCustomersUseCase } from '@/presentation/protocols/usecases/load-customers-use-case'
import { LoadCustomers } from '@/usecases/load-customers'

export const makeLoadCustomersUseCase = (): LoadCustomersUseCase => {
  const customerDynamoDBRepository = makeCustomerDynamoDBRepository()
  return new LoadCustomers(customerDynamoDBRepository)
}
