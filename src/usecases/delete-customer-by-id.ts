import { DeleteCustomerByIdUseCase } from '@/presentation/protocols/usecases/delete-customer-by-id-use-case'
import { DeleteCustomerByIdRepository } from '@/usecases/protocols/delete-customer-by-id-repository'

export class DeleteCustomerById implements DeleteCustomerByIdUseCase {
  constructor (private readonly deleteCustomerByIdRepository: DeleteCustomerByIdRepository) {}

  async execute (customerId: string): Promise<void> {
    await this.deleteCustomerByIdRepository.deleteById(customerId)
  }
}
