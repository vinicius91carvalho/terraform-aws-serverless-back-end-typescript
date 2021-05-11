import { Customer } from '@/domain/customer'
import { SearchCustomersUseCase, SearchCustomersUseCaseParams } from '@/presentation/protocols/usecases/search-customers-use-case'
import { CompletePagedResult } from '@/shared/complete-paged-result'
import { SearchCustomersRepository } from '@/usecases/protocols/search-customers-repository'

export class SearchCustomers implements SearchCustomersUseCase {
  constructor (private readonly searchCustomersRepository: SearchCustomersRepository) {}

  async execute (params: SearchCustomersUseCaseParams): Promise<CompletePagedResult<Customer>> {
    return await this.searchCustomersRepository.search(params)
  }
}
