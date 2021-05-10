import Joi from 'joi'

export const createLoadCustomerByIdSchema = (): Joi.ObjectSchema => {
  return Joi.object({
    customerId: Joi.string().uuid().required()
  })
}
