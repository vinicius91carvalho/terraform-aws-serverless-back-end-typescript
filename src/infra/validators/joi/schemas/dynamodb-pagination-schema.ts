import Joi from 'joi'

export const createDynamoDBPaginationSchema = (): Joi.ObjectSchema => {
  return Joi.object({
    limit: Joi.number().min(0).required(),
    lastIdOffset: Joi.string().uuid()
  })
}
