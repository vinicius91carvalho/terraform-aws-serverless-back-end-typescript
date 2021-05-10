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

export const validateUUIDField = (fieldName: string, { sut, path, objectToValidate, isRequired = true }: Params): void => {
  describe(fieldName, () => {
    if (isRequired) {
      validateRequiredField(fieldName, { path, sut, objectToValidate })
    }
    validateFieldSuccess(fieldName, { path, sut, objectToValidate })

    test(`Should returns an error if ${fieldName} is not a valid UUID`, async () => {
      const data = deepCopy(objectToValidate)
      jsonpath.apply(data, `$.${fieldName}`, _ => '')
      const schemaError = await sut.validate(data)
      expect(schemaError?.errors[0].message).toEqual(`"${fieldName}" is not allowed to be empty`)
      expect(schemaError?.errors[0].path).toEqual(path ?? [fieldName])
      expect(schemaError?.errors[0].type).toEqual('string.empty')
    })
  })
}
