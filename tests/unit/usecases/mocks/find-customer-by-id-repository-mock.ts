import { Customer } from '@/domain/customer'
import { FindCustomerByIdRepository } from '@/usecases/protocols/find-customer-by-id-repository'

export class FindCustomerByIdRepositorySpy implements FindCustomerByIdRepository {
  params: string
  result: Customer

  async findById (id: string): Promise<Customer> {
    this.params = id
    return this.result
  }
}
