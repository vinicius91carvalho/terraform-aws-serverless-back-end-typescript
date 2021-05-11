import { makeCustomerDynamoDBRepository } from '@/main/factories/infra/customer-dynamodb-repository-factory'
import { DeleteCustomerByIdUseCase } from '@/presentation/protocols/usecases/delete-customer-by-id-use-case'
import { DeleteCustomerById } from '@/usecases/delete-customer-by-id'

export const makeDeleteCustomerByIdUseCase = (): DeleteCustomerByIdUseCase => {
  const customerDynamoDBRepository = makeCustomerDynamoDBRepository()
  return new DeleteCustomerById(customerDynamoDBRepository)
}
