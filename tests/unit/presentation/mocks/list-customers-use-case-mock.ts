import { Customer } from '@/domain/customer'
import { DynamoDBPagedResult } from '@/shared/dynamodb-paged-result'
import { ListCustomersUseCase } from '@/presentation/protocols/usecases/list-customers-use-case'
import { buildFakeCustomers } from '@/tests/shared/mocks/customer-dto-mock'

export class ListCustomersUseCaseSpy implements ListCustomersUseCase {
  params: {
    limit: number
    lastIdOffset?: string
  }

  result: Promise<DynamoDBPagedResult<Customer>>

  constructor () {
    const customers = buildFakeCustomers()
    const lastKey = customers[customers.length - 1].id
    this.result = Promise.resolve({
      items: customers,
      lastKey
    })
  }

  async execute (limit: number, lastIdOffset?: string): Promise<DynamoDBPagedResult<Customer>> {
    this.params = {
      limit,
      lastIdOffset
    }
    return this.result
  }
}
