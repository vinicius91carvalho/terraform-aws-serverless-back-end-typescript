import { Customer } from '@/domain/customer'
import { ElasticSearchPagedResult } from '@/shared/elasticsearch-paged-result'

export type SearchCustomersUseCaseParams = {
  textToSearch: string
  limit: number
  offset?: number
}
export interface SearchCustomersUseCase {
  execute: (params: SearchCustomersUseCaseParams) => Promise<ElasticSearchPagedResult<Customer>>
}
