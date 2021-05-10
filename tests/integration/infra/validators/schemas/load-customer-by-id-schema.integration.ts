import { createValidatorAdapter } from '@/main/factories/validators/validator-adapter-factory'
import { SchemaFactory } from '@/tests/integration/infra/validators/factories/schema-factory'
import { validateUUIDField } from '@/tests/integration/infra/validators/schemas/utils/uuid-field-validation-tests'
import { Validator } from '@/validation/validator-protocol'
import faker from 'faker'

type SutTypes = {
  sut: Validator<any>
  objectToValidate: any
}

const makeSut = (): SutTypes => {
  const sut = createValidatorAdapter(SchemaFactory.buildCustomerIdSchema())
  return {
    sut,
    objectToValidate: {
      customerId: faker.datatype.uuid()
    }
  }
}

describe('CustomerIdSchema', () => {
  validateUUIDField('customerId', { ...makeSut(), isRequired: true })
})
