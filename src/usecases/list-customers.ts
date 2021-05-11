import { Customer } from '@/domain/customer'
import { PagedResult } from '@/domain/paged-result'
import { ListCustomersUseCase } from '@/presentation/protocols/usecases/list-customers-use-case'
import { ListCustomersRepository } from '@/usecases/protocols/list-customers-repository'

export class ListCustomers implements ListCustomersUseCase {
  constructor (private readonly listCustomersRepository: ListCustomersRepository) {}

  async execute (limit: number, lastIdOffset?: string): Promise<PagedResult<Customer>> {
    return await this.listCustomersRepository.listAll(limit, lastIdOffset)
  }
}
