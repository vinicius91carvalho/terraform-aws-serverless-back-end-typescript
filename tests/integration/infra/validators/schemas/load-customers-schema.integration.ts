import { createValidatorAdapter } from '@/main/factories/validators/validator-adapter-factory'
import { SchemaFactory } from '@/tests/integration/infra/validators/factories/schema-factory'
import { validateNumberField } from '@/tests/integration/infra/validators/schemas/utils/number-field-validation-tests'
import { validateUUIDField } from '@/tests/integration/infra/validators/schemas/utils/uuid-field-validation-tests'
import { Validator } from '@/validation/validator-protocol'
import faker from 'faker'

type SutTypes = {
  sut: Validator<any>
  objectToValidate: any
}

const makeSut = (): SutTypes => {
  const sut = createValidatorAdapter(SchemaFactory.buildPaginationSchema())
  return {
    sut,
    objectToValidate: {
      limit: faker.datatype.number({ min: 0 }),
      lastIdOffset: faker.datatype.uuid()
    }
  }
}

describe('PaginationSchema', () => {
  validateNumberField('limit', { min: 0, ...makeSut() })
  validateUUIDField('lastIdOffset', { ...makeSut(), isRequired: false })
})
