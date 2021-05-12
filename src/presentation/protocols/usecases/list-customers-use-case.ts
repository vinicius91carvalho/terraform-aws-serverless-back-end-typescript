import { Customer } from '@/domain/customer'
import { LimitedPagedResult } from '@/shared/limited-paged-result'
export interface ListCustomersUseCase {
  execute: (limit: number, lastIdOffset?: string) => Promise<LimitedPagedResult<Customer>>
}
