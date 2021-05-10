import { Customer } from '@/domain/customer'
import { BusinessError } from '@/presentation/errors/business-error'

export interface SaveCustomerUseCase {
  execute: (customer: Customer) => Promise<Customer | BusinessError>
}
