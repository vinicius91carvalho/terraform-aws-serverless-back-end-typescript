import { makeCustomerDynamoDBRepository } from '@/main/factories/infra/customer-dynamodb-repository-factory'
import { LoadCustomerByIdUseCase } from '@/presentation/protocols/usecases/load-customer-by-id-use-case'
import { LoadCustomerById } from '@/usecases/load-customer-by-id'

export const makeLoadCustomerByIdUseCase = (): LoadCustomerByIdUseCase => {
  const customerDynamoDBRepository = makeCustomerDynamoDBRepository()
  return new LoadCustomerById(customerDynamoDBRepository)
}
