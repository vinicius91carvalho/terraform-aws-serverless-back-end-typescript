import { Customer } from '@/domain/customer'
import { CompletePagedResult } from '@/shared/complete-paged-result'
import { SearchCustomersRepository, SearchCustomersRepositoryParams } from '@/usecases/protocols/search-customers-repository'
import algoliasearch from 'algoliasearch'

export class CustomerAlgoliaRepository implements SearchCustomersRepository {
  async search (params: SearchCustomersRepositoryParams): Promise<CompletePagedResult<Customer>> {
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY)
    const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME)

    const data = await index.search(params.textToSearch, {
      hitsPerPage: params.limit,
      page: params.offset
    })

    const customers = data?.hits?.map((item: any) => ({
      id: item.id,
      fullName: item.fullName,
      email: item.email,
      gender: item.gender,
      birthDate: item.birthDate,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }))

    const result: CompletePagedResult<Customer> = {
      items: customers || [],
      limit: params.limit,
      offset: params.offset,
      total: data?.nbHits
    }

    return result
  }
}
