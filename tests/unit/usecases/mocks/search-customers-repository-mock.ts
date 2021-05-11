import { Customer } from '@/domain/customer'
import { CompletePagedResult } from '@/shared/complete-paged-result'
import { buildFakeCustomers } from '@/tests/shared/mocks/customer-dto-mock'
import { SearchCustomersRepository, SearchCustomersRepositoryParams } from '@/usecases/protocols/search-customers-repository'

export class SearchCustomersRepositorySpy implements SearchCustomersRepository {
  params: any
  result: Promise<CompletePagedResult<Customer>>

  constructor () {
    const customers = buildFakeCustomers()
    this.result = Promise.resolve({
      items: customers,
      limit: 10,
      offset: 0,
      total: 3
    })
  }

  async search (params: SearchCustomersRepositoryParams): Promise<CompletePagedResult<Customer>> {
    this.params = params
    return this.result
  }
}
