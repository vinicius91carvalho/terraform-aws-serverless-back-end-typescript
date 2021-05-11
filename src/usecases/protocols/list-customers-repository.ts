import { Customer } from '@/domain/customer'
import { DynamoDBPagedResult } from '@/shared/dynamodb-paged-result'

export interface ListCustomersRepository {
  listAll: (limit: number, lastIdOffset?: string) => Promise<DynamoDBPagedResult<Customer>>
}
