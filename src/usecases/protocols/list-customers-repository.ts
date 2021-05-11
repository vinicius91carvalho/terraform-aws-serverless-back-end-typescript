import { Customer } from '@/domain/customer'
import { PagedResult } from '@/domain/paged-result'

export interface ListCustomersRepository {
  listAll: (limit: number, lastIdOffset?: string) => Promise<PagedResult<Customer>>
}
