import { Customer } from '@/domain/customer'
import { LoadCustomersUseCase } from '@/presentation/protocols/usecases/load-customers-use-case'
import { buildFakeCustomers } from '@/tests/shared/mocks/customer-dto-mock'

export class LoadCustomersUseCaseSpy implements LoadCustomersUseCase {
  params: {
    limit: number
    lastIdOffset?: string
  }

  result: Promise<Customer[]> = Promise.resolve(buildFakeCustomers())

  async execute (limit: number, lastIdOffset?: string): Promise<Customer[]> {
    this.params = {
      limit,
      lastIdOffset
    }
    return this.result
  }
}
