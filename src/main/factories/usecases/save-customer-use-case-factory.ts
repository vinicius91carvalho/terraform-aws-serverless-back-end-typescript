import { makeCustomerDynamoDBRepository } from '@/main/factories/infra/customer-dynamodb-repository-factory'
import { SaveCustomerUseCase } from '@/presentation/protocols/usecases/save-customer-use-case'
import { SaveCustomer } from '@/usecases/save-customer'

export const makeSaveCustomerUseCase = (): SaveCustomerUseCase => {
  const customerDynamoDBRepository = makeCustomerDynamoDBRepository()
  return new SaveCustomer(customerDynamoDBRepository, customerDynamoDBRepository)
}
