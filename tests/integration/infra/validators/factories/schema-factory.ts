
import { createCustomerIdSchema } from '@/infra/validators/joi/schemas/customer-id-schema'
import { createCustomerSchema } from '@/infra/validators/joi/schemas/customer-schema'
import { createDynamoDBPaginationSchema } from '@/infra/validators/joi/schemas/dynamodb-pagination-schema'
import { createElasticSearchPaginationSchema } from '@/infra/validators/joi/schemas/elasticsearch-pagination-schema'
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

const buildElasticSearchPaginationSchema = (): Joi.ObjectSchema<any> => {
  return createElasticSearchPaginationSchema()
}

export const SchemaFactory = {
  buildCustomerSchema,
  buildCustomerIdSchema,
  buildDynamoDBPaginationSchema,
  buildElasticSearchPaginationSchema
}
