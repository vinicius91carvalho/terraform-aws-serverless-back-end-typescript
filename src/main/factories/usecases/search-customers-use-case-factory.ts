import { makeCustomerAlgoliaRepository } from '@/main/factories/infra/customer-algolia-repository-factory'
import { SearchCustomersUseCase } from '@/presentation/protocols/usecases/search-customers-use-case'
import { SearchCustomers } from '@/usecases/search-customers'

export const makeSearchCustomersUseCase = (): SearchCustomersUseCase => {
  const customerAlgoliaRepository = makeCustomerAlgoliaRepository()
  return new SearchCustomers(customerAlgoliaRepository)
}
