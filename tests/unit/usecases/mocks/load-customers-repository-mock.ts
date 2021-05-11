import { Customer } from '@/domain/customer'
import { buildFakeCustomers } from '@/tests/shared/mocks/customer-dto-mock'
import { LoadCustomersRepository } from '@/usecases/protocols/load-customers-repository'

export class LoadCustomersRepositorySpy implements LoadCustomersRepository {
  params: any
  result: Promise<Customer[]> = Promise.resolve(buildFakeCustomers())

  async load (limit: number, lastIdOffset?: string): Promise<Customer[]> {
    this.params = {
      limit,
      lastIdOffset
    }
    return this.result
  }
}
