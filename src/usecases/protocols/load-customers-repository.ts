import { Customer } from '@/domain/customer'
import { PagedResult } from '@/domain/paged-result'

export interface LoadCustomersRepository {
  load: (limit: number, lastIdOffset?: string) => Promise<PagedResult<Customer>>
}
