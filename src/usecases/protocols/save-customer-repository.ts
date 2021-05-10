import { Customer } from '@/domain/customer'

export interface SaveCustomerRepository {
  save: (customer: Customer) => Promise<Customer>
}
