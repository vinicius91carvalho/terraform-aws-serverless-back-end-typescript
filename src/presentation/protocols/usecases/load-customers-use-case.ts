import { Customer } from '@/domain/customer'
import { PagedResult } from '@/domain/paged-result'
export interface LoadCustomersUseCase {
  execute: (limit: number, lastIdOffset?: string) => Promise<PagedResult<Customer>>
}
