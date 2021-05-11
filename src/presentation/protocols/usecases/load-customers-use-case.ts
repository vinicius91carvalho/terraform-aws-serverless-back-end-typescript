import { Customer } from '@/domain/customer'
export interface LoadCustomersUseCase {
  execute: (limit: number, lastIdOffset?: string) => Promise<Customer[]>
}
