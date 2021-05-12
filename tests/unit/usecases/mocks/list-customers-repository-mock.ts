import { Customer } from '@/domain/customer'
import { LimitedPagedResult } from '@/shared/limited-paged-result'
import { buildFakeCustomers } from '@/tests/shared/mocks/customer-dto-mock'
import { ListCustomersRepository } from '@/usecases/protocols/list-customers-repository'

export class ListCustomersRepositorySpy implements ListCustomersRepository {
  params: any
  result: Promise<LimitedPagedResult<Customer>>

  constructor () {
    const customers = buildFakeCustomers()
    const lastKey = customers[customers.length - 1].id
    this.result = Promise.resolve({
      items: customers,
      lastKey
    })
  }

  async listAll (limit: number, lastIdOffset?: string): Promise<LimitedPagedResult<Customer>> {
    this.params = {
      limit,
      lastIdOffset
    }
    return this.result
  }
}
