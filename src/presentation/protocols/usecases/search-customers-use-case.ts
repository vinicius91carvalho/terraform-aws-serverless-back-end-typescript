import { Customer } from '@/domain/customer'
import { CompletePagedResult } from '@/shared/complete-paged-result'

export type SearchCustomersUseCaseParams = {
  textToSearch: string
  limit: number
  offset?: number
}
export interface SearchCustomersUseCase {
  execute: (params: SearchCustomersUseCaseParams) => Promise<CompletePagedResult<Customer>>
}
