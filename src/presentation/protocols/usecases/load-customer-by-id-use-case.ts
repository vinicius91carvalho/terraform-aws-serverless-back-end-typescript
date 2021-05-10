import { Customer } from '@/domain/customer'
export interface LoadCustomerByIdUseCase {
  execute: (customerId: string) => Promise<Customer | null>
}
