
import { JoiValidatorAdapter } from '@/infra/validators/joi/joi-validator-adapter'
import { makeFakeJoiValidationError } from '@/tests/unit/infra/mocks/validation-mock'
import { ValidationSchemaError, ValidationSchemaFieldError } from '@/validation/validator-schema-error'
import Joi from 'joi'

type SutTypes = {
  sut: JoiValidatorAdapter
  schema: Joi.ObjectSchema<any>
}

const makeSut = (): SutTypes => {
  const schema = Joi.object()
  const sut = new JoiValidatorAdapter(schema)

  return {
    sut,
    schema
  }
}

describe('JoiValidatorAdapter', () => {
  test('Should receive an schema on constructor', async () => {
    const { schema, sut } = makeSut()
    const validateSpy = jest.spyOn(schema, 'validateAsync').mockResolvedValueOnce({})
    await sut.validate({
      name: 'any_name'
    })
    expect(validateSpy).toHaveBeenCalledWith({
      name: 'any_name'
    })
  })

  test('Should returns an error if validation fails with ValidationError', async () => {
    const fakeJoiValidationError = makeFakeJoiValidationError()
    const { schema, sut } = makeSut()
    jest.spyOn(schema, 'validateAsync').mockRejectedValueOnce(fakeJoiValidationError)
    const validatorSchemaError = await sut.validate({
      name: 'wrong_name'
    })
    const schemaError = new ValidationSchemaError([new ValidationSchemaFieldError('any_message', ['any_path'], 'any_type')])
    expect(validatorSchemaError).toEqual(schemaError)
  })

  test('Should throws if Joi throws an unexpected error', async () => {
    const { schema, sut } = makeSut()
    jest.spyOn(schema, 'validateAsync').mockRejectedValueOnce(new Error())
    await expect(sut.validate({ name: 'wrong_name' })).rejects.toThrowError()
  })

  test('Should returns undefined if validation succeeds', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({
      name: 'correct_name'
    })
    expect(result).toBeUndefined()
  })
})
