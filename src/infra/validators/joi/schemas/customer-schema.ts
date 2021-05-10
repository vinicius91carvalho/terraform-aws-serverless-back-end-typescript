import Joi from 'joi'
import { GenderEnum } from '@/domain/customer'

export const createCustomerSchema = (): Joi.ObjectSchema => {
  return Joi.object({
    id: Joi.string().uuid(),
    fullName: Joi.string().required().min(3).max(255),
    email: Joi.string().required().email(),
    gender: Joi.string().required().valid(...Object.keys(GenderEnum)),
    birthDate: Joi.date().required().less('now')
  })
}
