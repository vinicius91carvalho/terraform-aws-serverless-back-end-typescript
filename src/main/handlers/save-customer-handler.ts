import { adaptHandler } from '@/main/adapters/aws-lambda-handler-adapter'
import { makeSaveCustomerController } from '@/main/factories/controllers/save-customer-controller-factory'

export const handler = async (event): Promise<any> => {
  const controller = makeSaveCustomerController()
  const adaptedHandler = adaptHandler(controller)
  return adaptedHandler(event)
}
