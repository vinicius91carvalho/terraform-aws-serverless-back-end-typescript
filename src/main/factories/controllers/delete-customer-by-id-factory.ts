import { createValidatorAdapter } from '@/main/factories/validators/validator-adapter-factory'
import Controller from '@/presentation/protocols/controller-protocol'
import LogControllerDecorator from '@/main/decorators/log-controller-decorator'
import { DeleteCustomerByIdController } from '@/presentation/controllers/delete-customer-by-id-controller'
import { createCustomerIdSchema } from '@/infra/validators/joi/schemas/customer-id-schema'
import { makeDeleteCustomerByIdUseCase } from '@/main/factories/usecases/delete-customer-by-id-use-case-factory'
import { makeLoadCustomerByIdUseCase } from '@/main/factories/usecases/load-customer-by-id-use-case-factory'

export const makeDeleteCustomerByIdController = (): Controller => {
  const validatorAdapter = createValidatorAdapter(createCustomerIdSchema())
  const loadCustomerByIdUseCase = makeLoadCustomerByIdUseCase()
  const deleteCustomerByIdUseCase = makeDeleteCustomerByIdUseCase()
  const controller = new DeleteCustomerByIdController(validatorAdapter, loadCustomerByIdUseCase, deleteCustomerByIdUseCase)
  return new LogControllerDecorator(controller)
}
