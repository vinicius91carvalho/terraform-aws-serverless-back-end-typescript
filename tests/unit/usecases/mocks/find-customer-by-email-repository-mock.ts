import { Customer } from '@/domain/customer'
import { FindCustomerByEmailRepository } from '@/usecases/protocols/find-customer-by-email-repository'

export class FindCustomerByEmailRepositorySpy implements FindCustomerByEmailRepository {
  params: string
  result: Customer

  async findByEmail (email: string): Promise<Customer> {
    this.params = email
    return this.result
  }
}
