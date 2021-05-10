import { Customer } from '@/domain/customer'

export interface FindCustomerByEmailRepository {
  findByEmail: (email: string) => Promise<Customer>
}
