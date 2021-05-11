import { Customer } from '@/domain/customer'
import { LimitedPagedResult } from '@/shared/limited-paged-result'

export interface ListCustomersRepository {
  listAll: (limit: number, lastIdOffset?: string) => Promise<LimitedPagedResult<Customer>>
}
