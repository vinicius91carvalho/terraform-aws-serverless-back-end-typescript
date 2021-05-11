import { adaptHandler } from '@/main/adapters/aws-lambda-handler-adapter'
import { makeLoadCustomersController } from '@/main/factories/controllers/load-customers-factory'

export const handler = async (event): Promise<any> => {
  const controller = makeLoadCustomersController()
  const adaptedHandler = adaptHandler(controller)
  return adaptedHandler(event)
}
