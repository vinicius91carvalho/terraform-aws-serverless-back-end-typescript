import { deepCopy } from '@/shared/deep-copy.utils'
import { validateFieldSuccess, validateRequiredField } from '@/tests/integration/infra/validators/schemas/utils/base-field-validation-tests'
import { Validator } from '@/validation/validator-protocol'
import jsonpath from 'jsonpath'

type Params = {
  sut: Validator
  objectToValidate: any
  enumValues: string[]
  path?: string[]
  isRequired?: boolean
}

export const validateEnumField = (fieldName: string, { sut, isRequired = true, objectToValidate, enumValues, path }: Params): void => {
  describe(fieldName, () => {
    if (isRequired) {
      validateRequiredField(fieldName, { path, sut, objectToValidate })
    }
    validateFieldSuccess(fieldName, { path, sut, objectToValidate })

    test(`Should returns an error if invalid ${fieldName} is provided`, async () => {
      const data = deepCopy(objectToValidate)
      jsonpath.apply(data, `$.${fieldName}`, _ => 'invalid_enum_value')
      const schemaError = await sut.validate(data)
      expect(schemaError?.errors[0].message.replace(/\s/g,'')).toEqual(`"${fieldName}" must be one of [${enumValues}]`.replace(/\s/g,''))
      expect(schemaError?.errors[0].path).toEqual(path ?? [fieldName])
      expect(schemaError?.errors[0].type).toEqual('any.only')
    })
  })
}
