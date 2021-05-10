import { JoiValidatorAdapter } from '@/infra/validators/joi/joi-validator-adapter'
import { Validator } from '@/validation/validator-protocol'
import Joi from 'joi'

export const createValidatorAdapter = (schema: Joi.ObjectSchema<any>): Validator<any> => {
  return new JoiValidatorAdapter(schema)
}
