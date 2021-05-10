import { Customer } from '@/domain/customer'
import { LoadCustomerByIdUseCase } from '@/presentation/protocols/usecases/load-customer-by-id-use-case'
import { FindCustomerByIdRepository } from '@/usecases/protocols/find-customer-by-id-repository'

export class LoadCustomerById implements LoadCustomerByIdUseCase {
  constructor (private readonly findCustomerByIdRepository: FindCustomerByIdRepository) {}

  async execute (customerId: string): Promise<Customer> {
    return await this.findCustomerByIdRepository.findById(customerId)
  }
}
