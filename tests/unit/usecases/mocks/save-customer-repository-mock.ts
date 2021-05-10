import { Customer } from '@/domain/customer'
import { SaveCustomerRepository } from '@/usecases/protocols/save-customer-repository'

export class SaveCustomerRepositorySpy implements SaveCustomerRepository {
  params: Customer
  result: Customer
  async save (customer: Customer): Promise<Customer> {
    this.params = customer
    return this.result || customer
  }
}
