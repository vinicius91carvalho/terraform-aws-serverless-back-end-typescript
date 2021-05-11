import { createValidatorAdapter } from '@/main/factories/validators/validator-adapter-factory'
import Controller from '@/presentation/protocols/controller-protocol'
import LogControllerDecorator from '@/main/decorators/log-controller-decorator'
import { createPaginationSchema } from '@/infra/validators/joi/schemas/pagination-schema'
import { makeLoadCustomersUseCase } from '@/main/factories/usecases/load-customers-use-case-factory'
import { LoadCustomersController } from '@/presentation/controllers/load-customers-controller'

export const makeLoadCustomersController = (): Controller => {
  const validatorAdapter = createValidatorAdapter(createPaginationSchema())
  const loadCustomersUseCase = makeLoadCustomersUseCase()
  const controller = new LoadCustomersController(validatorAdapter, loadCustomersUseCase)
  return new LogControllerDecorator(controller)
}
