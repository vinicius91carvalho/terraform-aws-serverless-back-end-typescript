import { deepCopy } from '@/shared/deep-copy.utils'
import { Validator } from '@/validation/validator-protocol'
import faker from 'faker'
import jsonpath from 'jsonpath'

type Params = {
  path?: string[]
  sut: Validator
  objectToValidate: any
}

export const validateArrayIsNotEmptyField = (fieldName: string, { path, sut, objectToValidate }: Params): void => {
  test(`Should returns an error if ${fieldName} is empty`, async () => {
    const data = deepCopy(objectToValidate)
    jsonpath.apply(data, `$.${fieldName}`, _ => [])
    const schemaError = await sut.validate(data)
    expect(schemaError?.errors[0].message).toEqual(`"${fieldName}" must contain at least 1 items`)
    expect(schemaError?.errors[0].path).toEqual(path ?? [fieldName])
    expect(schemaError?.errors[0].type).toEqual('array.min')
  })
}

export const validateRequiredField = (fieldName: string, { path, sut, objectToValidate }: Params): void => {
  test(`Should returns an error if no ${fieldName} is provided`, async () => {
    const data = deepCopy(objectToValidate)
    jsonpath.apply(data, `$.${fieldName}`, _ => undefined)
    const schemaError = await sut.validate(data)
    expect(schemaError?.errors[0].message).toEqual(`"${fieldName}" is required`)
    expect(schemaError?.errors[0].path).toEqual(path ?? [fieldName])
    expect(schemaError?.errors[0].type).toEqual('any.required')
  })
}

export const validateFieldSuccess = (fieldName: string, { sut, objectToValidate }: Params): void => {
  test(`Should returns undefined if a valid ${fieldName} is provided`, async () => {
    const result = await sut.validate(objectToValidate)
    expect(result).toBeUndefined()
  })
}

export const validateTextFieldMinLength = (fieldName: string, min: number, { path, sut, objectToValidate }: Params): void => {
  test(`Should returns an error if ${fieldName} is provided with less than ${min} characters`, async () => {
    const data = deepCopy(objectToValidate)
    jsonpath.apply(data, `$.${fieldName}`, _ => faker.lorem.words(min).substring(0, min - 1))
    const schemaError = await sut.validate(data)
    expect(schemaError?.errors[0].message).toEqual(`"${fieldName}" length must be at least ${min} characters long`)
    expect(schemaError?.errors[0].path).toEqual(path ?? [fieldName])
    expect(schemaError?.errors[0].type).toEqual('string.min')
  })
}

export const validateTextFieldMaxLength = (fieldName: string, max: number, { path, sut, objectToValidate }: Params): void => {
  test(`Should returns an error if ${fieldName} is provided with more than ${max} characters`, async () => {
    const data = deepCopy(objectToValidate)
    jsonpath.apply(data, `$.${fieldName}`, _ => faker.lorem.words(Math.floor(max / 3)))
    const schemaError = await sut.validate(data)
    expect(schemaError?.errors[0].message).toEqual(`"${fieldName}" length must be less than or equal to ${max} characters long`)
    expect(schemaError?.errors[0].path).toEqual(path ?? [fieldName])
    expect(schemaError?.errors[0].type).toEqual('string.max')
  })
}
