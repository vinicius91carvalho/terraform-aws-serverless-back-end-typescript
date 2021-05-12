import { makeCustomerDynamoDBRepository } from '@/main/factories/infra/customer-dynamodb-repository-factory'
import { ListCustomersUseCase } from '@/presentation/protocols/usecases/list-customers-use-case'
import { ListCustomers } from '@/usecases/list-customers'

export const makeListCustomersUseCase = (): ListCustomersUseCase => {
  const customerDynamoDBRepository = makeCustomerDynamoDBRepository()
  return new ListCustomers(customerDynamoDBRepository)
}
