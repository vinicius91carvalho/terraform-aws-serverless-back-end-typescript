
import { createCustomerIdSchema } from '@/infra/validators/joi/schemas/customer-id-schema'
import { createCustomerSchema } from '@/infra/validators/joi/schemas/customer-schema'
import Joi from 'joi'

const buildCustomerSchema = (): Joi.ObjectSchema<any> => {
  return createCustomerSchema()
}

const buildCustomerIdSchema = (): Joi.ObjectSchema<any> => {
  return createCustomerIdSchema()
}

export const SchemaFactory = {
  buildCustomerSchema,
  buildCustomerIdSchema
}
