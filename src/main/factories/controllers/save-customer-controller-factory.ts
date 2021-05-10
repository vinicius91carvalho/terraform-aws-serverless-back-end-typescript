import { SaveCustomerController } from '@/presentation/controllers/save-customer-controller'

import { createValidatorAdapter } from '@/main/factories/validators/validator-adapter-factory'
import { makeSaveCustomerUseCase } from '@/main/factories/usecases/save-customer-use-case-factory'
import Controller from '@/presentation/protocols/controller-protocol'
import { createCustomerSchema } from '@/infra/validators/joi/schemas/customer-schema'
import LogControllerDecorator from '@/main/decorators/log-controller-decorator'

export const makeSaveCustomerController = (): Controller => {
  const validatorAdapter = createValidatorAdapter(createCustomerSchema())
  const saveCustomerUseCase = makeSaveCustomerUseCase()
  const controller = new SaveCustomerController(validatorAdapter, saveCustomerUseCase)
  return new LogControllerDecorator(controller)
}
