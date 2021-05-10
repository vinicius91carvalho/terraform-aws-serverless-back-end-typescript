
import { createCustomerSchema } from '@/infra/validators/joi/schemas/customer-schema'
import Joi from 'joi'

const buildCustomerSchema = (): Joi.ObjectSchema<any> => {
  return createCustomerSchema()
}

export const SchemaFactory = {
  buildCustomerSchema
}
