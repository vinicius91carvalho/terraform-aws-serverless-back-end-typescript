import { adaptHandler } from '@/main/adapters/aws-lambda-handler-adapter'
import { makeSearchCustomersController } from '@/main/factories/controllers/search-customers-factory'

export const handler = async (event): Promise<any> => {
  const controller = makeSearchCustomersController()
  const adaptedHandler = adaptHandler(controller)
  return adaptedHandler(event)
}
