import Joi from 'joi'

export const createCustomerIdSchema = (): Joi.ObjectSchema => {
  return Joi.object({
    customerId: Joi.string().uuid().required()
  })
}
