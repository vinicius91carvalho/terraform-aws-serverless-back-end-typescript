import { Validator } from '@/validation/validator-protocol'
import { ValidationSchemaError, ValidationSchemaFieldError } from '@/validation/validator-schema-error'
import Joi from 'joi'

export class JoiValidatorAdapter implements Validator {
  constructor (private readonly joiSchema: Joi.ObjectSchema<any>) {}

  async validate (value: any): Promise<ValidationSchemaError | undefined> {
    try {
      await this.joiSchema.validateAsync(value)
    } catch (error) {
      if (Joi.isError(error)) {
        const errorFields = error.details
          .map(errorItem => new ValidationSchemaFieldError(
            errorItem.message,
            errorItem.path.map(path => String(path)),
            errorItem.type
          ))

        return new ValidationSchemaError(errorFields)
      } else {
        throw error
      }
    }
  }
}
