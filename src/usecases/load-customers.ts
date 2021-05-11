import { Customer } from '@/domain/customer'
import { LoadCustomersUseCase } from '@/presentation/protocols/usecases/load-customers-use-case'
import { LoadCustomersRepository } from '@/usecases/protocols/load-customers-repository'

export class LoadCustomers implements LoadCustomersUseCase {
  constructor (private readonly loadCustomersRepository: LoadCustomersRepository) {}

  async execute (limit: number, lastIdOffset?: string): Promise<Customer[]> {
    return await this.loadCustomersRepository.load(limit, lastIdOffset)
  }
}
