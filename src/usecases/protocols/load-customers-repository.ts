import { Customer } from '@/domain/customer'

export interface LoadCustomersRepository {
  load: (limit: number, lastIdOffset?: string) => Promise<Customer[]>
}
