import { Customer } from '@/domain/customer'
import { PagedResult } from '@/domain/paged-result'
import { LoadCustomersUseCase } from '@/presentation/protocols/usecases/load-customers-use-case'
import { buildFakeCustomers } from '@/tests/shared/mocks/customer-dto-mock'

export class LoadCustomersUseCaseSpy implements LoadCustomersUseCase {
  params: {
    limit: number
    lastIdOffset?: string
  }

  result: Promise<PagedResult<Customer>>

  constructor () {
    const customers = buildFakeCustomers()
    const lastKey = customers[customers.length - 1].id
    this.result = Promise.resolve({
      items: customers,
      lastKey
    })
  }

  async execute (limit: number, lastIdOffset?: string): Promise<PagedResult<Customer>> {
    this.params = {
      limit,
      lastIdOffset
    }
    return this.result
  }
}
