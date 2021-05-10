import ServerError from '@/presentation/errors/server-error'
import { HttpResponse } from '@/presentation/protocols/http-protocols'
import { ValidationSchemaError } from '@/validation/validator-schema-error'

const processErrorMessage = (error: Error): any => {
  if (error instanceof ValidationSchemaError) {
    return error
  } else {
    return {
      error: error.message
    }
  }
}

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const created = (body: any): HttpResponse => ({
  statusCode: 201,
  body
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: processErrorMessage(error)
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: processErrorMessage(error)
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
