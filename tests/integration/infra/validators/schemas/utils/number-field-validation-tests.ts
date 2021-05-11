import { deepCopy } from '@/shared/deep-copy.utils'
import { validateFieldSuccess, validateRequiredField } from '@/tests/integration/infra/validators/schemas/utils/base-field-validation-tests'
import { Validator } from '@/validation/validator-protocol'
import faker from 'faker'
import jsonpath from 'jsonpath'

type Params = {
  sut: Validator<any>
  objectToValidate: any
  path?: string[]
  isRequired?: boolean
  min?: number
  max?: number
}

export const validateNumberField = (fieldName: string, { sut, path, min, objectToValidate, isRequired = true }: Params): void => {
  describe(fieldName, () => {
    if (isRequired) {
      validateRequiredField(fieldName, { path, sut, objectToValidate })
    }
    validateFieldSuccess(fieldName, { path, sut, objectToValidate })

    test(`Should returns an error if ${fieldName} is provided with less than ${min} characters`, async () => {
      const data = deepCopy(objectToValidate)
      jsonpath.apply(data, `$.${fieldName}`, _ => faker.datatype.number({ max: min - 1 }))
      const schemaError = await sut.validate(data)
      expect(schemaError?.errors[0].message).toEqual(`"${fieldName}" must be greater than or equal to ${min}`)
      expect(schemaError?.errors[0].path).toEqual(path ?? [fieldName])
      expect(schemaError?.errors[0].type).toEqual('number.min')
    })
  })
}
