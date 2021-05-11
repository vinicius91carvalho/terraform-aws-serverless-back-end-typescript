import { DeleteCustomerByIdRepository } from '@/usecases/protocols/delete-customer-by-id-repository'

export class DeleteCustomerByIdRepositorySpy implements DeleteCustomerByIdRepository {
  params: string

  async deleteById (id: string): Promise<void> {
    this.params = id
  }
}
