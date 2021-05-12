
import { createCustomerIdSchema } from '@/infra/validators/joi/schemas/customer-id-schema'
import { createCustomerSchema } from '@/infra/validators/joi/schemas/customer-schema'
import { createDynamoDBPaginationSchema } from '@/infra/validators/joi/schemas/dynamodb-pagination-schema'
import { createCompletePaginationSchema } from '@/infra/validators/joi/schemas/complete-pagination-schema'
import Joi from 'joi'

const buildCustomerSchema = (): Joi.ObjectSchema<any> => {
  return createCustomerSchema()
}

const buildCustomerIdSchema = (): Joi.ObjectSchema<any> => {
  return createCustomerIdSchema()
}

const buildDynamoDBPaginationSchema = (): Joi.ObjectSchema<any> => {
  return createDynamoDBPaginationSchema()
}

const buildCompletePaginationSchema = (): Joi.ObjectSchema<any> => {
  return createCompletePaginationSchema()
}

export const SchemaFactory = {
  buildCustomerSchema,
  buildCustomerIdSchema,
  buildDynamoDBPaginationSchema,
  buildCompletePaginationSchema
}
