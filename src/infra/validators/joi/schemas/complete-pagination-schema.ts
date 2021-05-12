import Joi from 'joi'

export const createCompletePaginationSchema = (): Joi.ObjectSchema => {
  return Joi.object({
    limit: Joi.number().min(0).required(),
    offset: Joi.number().min(0),
    textToSearch: Joi.string().min(3).max(255).required()
  })
}
