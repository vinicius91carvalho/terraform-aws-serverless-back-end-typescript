import { createValidatorAdapter } from '@/main/factories/validators/validator-adapter-factory'
import Controller from '@/presentation/protocols/controller-protocol'
import LogControllerDecorator from '@/main/decorators/log-controller-decorator'
import { LoadCustomerByIdController } from '@/presentation/controllers/load-customer-by-id-controller'
import { createCustomerIdSchema } from '@/infra/validators/joi/schemas/customer-id-schema'
import { makeLoadCustomerByIdUseCase } from '@/main/factories/usecases/load-customer-by-id-use-case-factory'

export const makeLoadCustomerByIdController = (): Controller => {
  const validatorAdapter = createValidatorAdapter(createCustomerIdSchema())
  const loadCustomerByIdUseCase = makeLoadCustomerByIdUseCase()
  const controller = new LoadCustomerByIdController(validatorAdapter, loadCustomerByIdUseCase)
  return new LogControllerDecorator(controller)
}
