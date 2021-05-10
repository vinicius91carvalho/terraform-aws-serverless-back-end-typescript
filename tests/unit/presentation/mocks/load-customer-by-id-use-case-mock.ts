import { Customer } from '@/domain/customer'
import { LoadCustomerByIdUseCase } from '@/presentation/protocols/usecases/load-customer-by-id-use-case'
import { buildCustomerDTOFake } from '@/tests/shared/mocks/customer-dto-mock'

export class LoadCustomerByIdUseCaseSpy implements LoadCustomerByIdUseCase {
  params: string
  result: Promise<Customer | null> = Promise.resolve(buildCustomerDTOFake())

  async execute (customerId: string): Promise<Customer | null> {
    this.params = customerId
    return this.result
  }
}
