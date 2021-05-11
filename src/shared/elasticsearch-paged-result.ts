export type ElasticSearchPagedResult<T> = {
  items: T[]
  total: any
  limit: number
  offset: number
}
