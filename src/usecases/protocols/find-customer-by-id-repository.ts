import { Customer } from '@/domain/customer'

export interface FindCustomerByIdRepository {
  findById: (id: string) => Promise<Customer>
}
