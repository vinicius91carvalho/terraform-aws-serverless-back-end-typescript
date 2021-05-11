export type DynamoDBPagedResult<T> = {
  items: T[]
  lastKey: any
}
