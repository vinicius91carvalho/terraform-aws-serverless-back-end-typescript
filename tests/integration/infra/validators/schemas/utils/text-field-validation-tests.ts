import { validateFieldSuccess, validateRequiredField, validateTextFieldMaxLength, validateTextFieldMinLength } from '@/tests/integration/infra/validators/schemas/utils/base-field-validation-tests'
import { Validator } from '@/validation/validator-protocol'

type Params = {
  sut: Validator
  objectToValidate: any
  path?: string[]
  isRequired?: boolean
  min: number
  max: number
}

export const validateTextField = (fieldName: string, { sut, path, min, max, objectToValidate, isRequired = true }: Params): void => {
  describe(fieldName, () => {
    if (isRequired) {
      validateRequiredField(fieldName, { path, sut, objectToValidate })
    }
    validateFieldSuccess(fieldName, { path, sut, objectToValidate })
    validateTextFieldMinLength(fieldName, min, { path, sut, objectToValidate })
    validateTextFieldMaxLength(fieldName, max, { path, sut, objectToValidate })
  })
}
