import { ValidationSchemaError } from '@/validation/validator-schema-error'

export interface Validator<T> {
  validate: (value: T) => Promise<ValidationSchemaError | undefined>
}
