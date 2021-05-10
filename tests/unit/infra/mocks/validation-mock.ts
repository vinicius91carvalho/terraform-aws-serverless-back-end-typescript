import { ValidationSchemaError, ValidationSchemaFieldError } from '@/validation/validator-schema-error'
import { ValidationError } from 'joi'

export class FakeJoiValidationError extends ValidationError {}

export const makeFakeJoiValidationError = (): FakeJoiValidationError => {
  return new FakeJoiValidationError('any_message', [{
    message: 'any_message',
    path: ['any_path'],
    type: 'any_type'
  }], 'any_value')
}

export const makeValidationSchemaError = (): ValidationSchemaError => {
  return new ValidationSchemaError([makeValidationSchemaFieldError()])
}

export const makeValidationSchemaFieldError = (): ValidationSchemaFieldError => {
  return new ValidationSchemaFieldError('any_message', ['any_path'], 'any_type')
}
