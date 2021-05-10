import { GenderEnum } from '@/domain/customer'
import { createValidatorAdapter } from '@/main/factories/validators/validator-adapter-factory'
import { SchemaFactory } from '@/tests/integration/infra/validators/factories/schema-factory'
import { validateDateField } from '@/tests/integration/infra/validators/schemas/utils/date-field-validation-tests'
import { validateEmailField } from '@/tests/integration/infra/validators/schemas/utils/email-field-validation-tests'
import { validateEnumField } from '@/tests/integration/infra/validators/schemas/utils/enum-field-validation-tests'
import { validateTextField } from '@/tests/integration/infra/validators/schemas/utils/text-field-validation-tests'
import { validateUUIDField } from '@/tests/integration/infra/validators/schemas/utils/uuid-field-validation-tests'
import { buildCustomerDTOFake } from '@/tests/shared/mocks/customer-dto-mock'
import { Validator } from '@/validation/validator-protocol'

type SutTypes = {
  sut: Validator<any>
  objectToValidate: any
}

const makeSut = (): SutTypes => {
  const sut = createValidatorAdapter(SchemaFactory.buildCustomerSchema())
  return {
    sut,
    objectToValidate: buildCustomerDTOFake()
  }
}

describe('customerSchema', () => {
  validateUUIDField('id', { ...makeSut(), isRequired: false })
  validateTextField('fullName', { min: 3, max: 255, ...makeSut() })
  validateEmailField('email', makeSut())
  validateEnumField('gender', { enumValues: Object.keys(GenderEnum), ...makeSut() })
  validateDateField('birthDate', { ...makeSut() })
})
