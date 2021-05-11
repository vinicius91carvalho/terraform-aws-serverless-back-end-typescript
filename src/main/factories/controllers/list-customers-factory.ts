import { createValidatorAdapter } from '@/main/factories/validators/validator-adapter-factory'
import Controller from '@/presentation/protocols/controller-protocol'
import LogControllerDecorator from '@/main/decorators/log-controller-decorator'
import { createPaginationSchema } from '@/infra/validators/joi/schemas/pagination-schema'
import { makeListCustomersUseCase } from '@/main/factories/usecases/list-customers-use-case-factory'
import { ListCustomersController } from '@/presentation/controllers/list-customers-controller'

export const makeListCustomersController = (): Controller => {
  const validatorAdapter = createValidatorAdapter(createPaginationSchema())
  const listCustomersUseCase = makeListCustomersUseCase()
  const controller = new ListCustomersController(validatorAdapter, listCustomersUseCase)
  return new LogControllerDecorator(controller)
}
