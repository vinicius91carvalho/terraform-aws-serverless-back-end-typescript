import { Customer } from '@/domain/customer'
import { DynamoDBPagedResult } from '@/shared/dynamodb-paged-result'
export interface ListCustomersUseCase {
  execute: (limit: number, lastIdOffset?: string) => Promise<DynamoDBPagedResult<Customer>>
}
