import { ValidationSchemaError } from '@/validation/validator-schema-error'

export interface Validator {
  validate: (value: any) => Promise<ValidationSchemaError | undefined>
}
