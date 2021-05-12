import { createValidatorAdapter } from '@/main/factories/validators/validator-adapter-factory'
import { SchemaFactory } from '@/tests/integration/infra/validators/factories/schema-factory'
import { validateNumberField } from '@/tests/integration/infra/validators/schemas/utils/number-field-validation-tests'
import { validateTextField } from '@/tests/integration/infra/validators/schemas/utils/text-field-validation-tests'
import { Validator } from '@/validation/validator-protocol'
import faker from 'faker'

type SutTypes = {
  sut: Validator
  objectToValidate: any
}

const makeSut = (): SutTypes => {
  const sut = createValidatorAdapter(SchemaFactory.buildCompletePaginationSchema())
  return {
    sut,
    objectToValidate: {
      limit: faker.datatype.number({ min: 0 }),
      offset: faker.datatype.number({ min: 0 }),
      textToSearch: faker.random.words()
    }
  }
}

describe('CompletePaginationSchema', () => {
  validateNumberField('limit', { min: 0, ...makeSut() })
  validateNumberField('offset', { min: 0, ...makeSut(), isRequired: false })
  validateTextField('textToSearch', { min: 3, max: 255, ...makeSut() })
})
