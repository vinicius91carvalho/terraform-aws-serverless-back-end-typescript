import { Customer } from '@/domain/customer'
import { BusinessError } from '@/presentation/errors/business-error'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { SaveCustomerUseCase } from '@/presentation/protocols/usecases/save-customer-use-case'
import { FindCustomerByEmailRepository } from '@/usecases/protocols/find-customer-by-email-repository'
import { SaveCustomerRepository } from '@/usecases/protocols/save-customer-repository'

export class SaveCustomer implements SaveCustomerUseCase {
  constructor (
    private readonly findCustomerByEmailRepository: FindCustomerByEmailRepository,
    private readonly saveCustomerRepository: SaveCustomerRepository
  ) {}

  async execute (customer: Customer): Promise<Customer | BusinessError> {
    const customerFound = await this.findCustomerByEmailRepository.findByEmail(customer.email)
    if (customerFound && customerFound.id !== customer.id) {
      return new EmailInUseError()
    }
    let customerToSave
    if (customer.id) {
      customerToSave = {
        ...customerFound,
        ...customer,
        updatedAt: new Date().toISOString()
      }
    } else {
      customerToSave = {
        ...customer,
        createdAt: new Date().toISOString()
      }
    }
    return this.saveCustomerRepository.save(customerToSave)
  }
}
