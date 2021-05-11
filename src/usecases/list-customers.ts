import { Customer } from '@/domain/customer'
import { DynamoDBPagedResult } from '@/shared/dynamodb-paged-result'
import { ListCustomersUseCase } from '@/presentation/protocols/usecases/list-customers-use-case'
import { ListCustomersRepository } from '@/usecases/protocols/list-customers-repository'

export class ListCustomers implements ListCustomersUseCase {
  constructor (private readonly listCustomersRepository: ListCustomersRepository) {}

  async execute (limit: number, lastIdOffset?: string): Promise<DynamoDBPagedResult<Customer>> {
    return await this.listCustomersRepository.listAll(limit, lastIdOffset)
  }
}
