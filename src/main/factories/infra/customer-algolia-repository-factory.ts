import { CustomerAlgoliaRepository } from '@/infra/algolia/customer-algolia-repository'

export const makeCustomerAlgoliaRepository = (): CustomerAlgoliaRepository => {
  return new CustomerAlgoliaRepository()
}
