
import { createCustomerIdSchema } from '@/infra/validators/joi/schemas/customer-id-schema'
import { createCustomerSchema } from '@/infra/validators/joi/schemas/customer-schema'
import { createPaginationSchema } from '@/infra/validators/joi/schemas/pagination-schema'
import Joi from 'joi'

const buildCustomerSchema = (): Joi.ObjectSchema<any> => {
  return createCustomerSchema()
}

const buildCustomerIdSchema = (): Joi.ObjectSchema<any> => {
  return createCustomerIdSchema()
}

const buildPaginationSchema = (): Joi.ObjectSchema<any> => {
  return createPaginationSchema()
}

export const SchemaFactory = {
  buildCustomerSchema,
  buildCustomerIdSchema,
  buildPaginationSchema
}
