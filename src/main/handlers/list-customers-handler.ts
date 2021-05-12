import { adaptHandler } from '@/main/adapters/aws-lambda-handler-adapter'
import { makeListCustomersController } from '@/main/factories/controllers/list-customers-factory'

export const handler = async (event): Promise<any> => {
  const controller = makeListCustomersController()
  const adaptedHandler = adaptHandler(controller)
  return adaptedHandler(event)
}
