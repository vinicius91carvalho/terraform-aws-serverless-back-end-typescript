import { adaptHandler } from '@/main/adapters/aws-lambda-handler-adapter'
import { makeLoadCustomerByIdController } from '@/main/factories/controllers/load-customer-by-id-factory'

export const handler = async (event): Promise<any> => {
  const controller = makeLoadCustomerByIdController()
  const adaptedHandler = adaptHandler(controller)
  return adaptedHandler(event)
}
