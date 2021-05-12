import { createValidatorAdapter } from '@/main/factories/validators/validator-adapter-factory'
import Controller from '@/presentation/protocols/controller-protocol'
import LogControllerDecorator from '@/main/decorators/log-controller-decorator'
import { makeSearchCustomersUseCase } from '@/main/factories/usecases/search-customers-use-case-factory'
import { SearchCustomersController } from '@/presentation/controllers/search-customers-controller'
import { createCompletePaginationSchema } from '@/infra/validators/joi/schemas/complete-pagination-schema'

export const makeSearchCustomersController = (): Controller => {
  const validatorAdapter = createValidatorAdapter(createCompletePaginationSchema())
  const searchCustomersUseCase = makeSearchCustomersUseCase()
  const controller = new SearchCustomersController(validatorAdapter, searchCustomersUseCase)
  return new LogControllerDecorator(controller)
}
