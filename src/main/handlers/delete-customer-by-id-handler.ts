import { adaptHandler } from '@/main/adapters/aws-lambda-handler-adapter'
import { makeDeleteCustomerByIdController } from '@/main/factories/controllers/delete-customer-by-id-factory'

export const handler = async (event): Promise<any> => {
  const controller = makeDeleteCustomerByIdController()
  const adaptedHandler = adaptHandler(controller)
  return adaptedHandler(event)
}
