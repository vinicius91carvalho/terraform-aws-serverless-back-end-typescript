import { Customer } from '@/domain/customer'
import { SearchCustomersUseCase, SearchCustomersUseCaseParams } from '@/presentation/protocols/usecases/search-customers-use-case'
import { CompletePagedResult } from '@/shared/complete-paged-result'
import { buildFakeCustomers } from '@/tests/shared/mocks/customer-dto-mock'

export class SearchCustomersUseCaseSpy implements SearchCustomersUseCase {
  params: {
    textToSearch: string
    limit: number
    offset?: number
  }

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

  async execute (params: SearchCustomersUseCaseParams): Promise<CompletePagedResult<Customer>> {
    this.params = params
    return this.result
  }
}
