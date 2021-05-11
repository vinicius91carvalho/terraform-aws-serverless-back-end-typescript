export type CompletePagedResult<T> = {
  items: T[]
  total: any
  limit: number
  offset: number
}
