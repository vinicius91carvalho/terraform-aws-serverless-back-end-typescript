import { DeleteCustomerByIdUseCase } from '@/presentation/protocols/usecases/delete-customer-by-id-use-case'

export class DeleteCustomerByIdUseCaseSpy implements DeleteCustomerByIdUseCase {
  params: string
  result: Promise<void>

  async execute (customerId: string): Promise<void> {
    this.params = customerId
    return this.result
  }
}
