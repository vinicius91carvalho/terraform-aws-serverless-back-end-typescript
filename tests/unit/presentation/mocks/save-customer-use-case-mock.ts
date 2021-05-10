import { Customer } from '@/domain/customer'
import { BusinessError } from '@/presentation/errors/business-error'
import { SaveCustomerUseCase } from '@/presentation/protocols/usecases/save-customer-use-case'

export class SaveCustomerUseCaseSpy implements SaveCustomerUseCase {
  params: Customer
  result: Customer | BusinessError

  async execute (customer: Customer): Promise<Customer | BusinessError> {
    this.params = customer
    return this.result || customer
  }
}
