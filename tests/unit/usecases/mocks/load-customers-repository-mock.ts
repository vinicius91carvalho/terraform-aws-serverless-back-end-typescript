import { Customer } from '@/domain/customer'
import { PagedResult } from '@/domain/paged-result'
import { buildFakeCustomers } from '@/tests/shared/mocks/customer-dto-mock'
import { LoadCustomersRepository } from '@/usecases/protocols/load-customers-repository'

export class LoadCustomersRepositorySpy implements LoadCustomersRepository {
  params: any
  result: Promise<PagedResult<Customer>>

  constructor () {
    const customers = buildFakeCustomers()
    const lastKey = customers[customers.length - 1].id
    this.result = Promise.resolve({
      items: customers,
      lastKey
    })
  }

  async load (limit: number, lastIdOffset?: string): Promise<PagedResult<Customer>> {
    this.params = {
      limit,
      lastIdOffset
    }
    return this.result
  }
}
