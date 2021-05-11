import { Customer } from '@/domain/customer'
import { CompletePagedResult } from '@/shared/complete-paged-result'

export type SearchCustomersRepositoryParams = {
  textToSearch: string
  limit: number
  offset?: number
}

export interface SearchCustomersRepository {
  search: (params: SearchCustomersRepositoryParams) => Promise<CompletePagedResult<Customer>>
}
