import { deepCopy } from '@/shared/deep-copy.utils'
import { validateFieldSuccess, validateRequiredField } from '@/tests/integration/infra/validators/schemas/utils/base-field-validation-tests'
import { Validator } from '@/validation/validator-protocol'
import jsonpath from 'jsonpath'

type Params = {
  sut: Validator<any>
  objectToValidate: any
  path?: string[]
  isRequired?: boolean
}

export const validateEmailField = (fieldName: string, { sut, objectToValidate, path, isRequired = true }: Params): void => {
  describe(fieldName, () => {
    if (isRequired) {
      validateRequiredField(fieldName, { path, sut, objectToValidate })
    }
    validateFieldSuccess(fieldName, { path, sut, objectToValidate })

    test(`Should returns an error if invalid ${fieldName} is provided`, async () => {
      const data = deepCopy(objectToValidate)
      jsonpath.apply(data, `$.${fieldName}`, _ => 'invalid_email')
      const schemaError = await sut.validate(data)
      expect(schemaError?.errors[0].message).toEqual(`"${fieldName}" must be a valid email`)
      expect(schemaError?.errors[0].path).toEqual([fieldName])
      expect(schemaError?.errors[0].type).toEqual('string.email')
    })
  })
}
