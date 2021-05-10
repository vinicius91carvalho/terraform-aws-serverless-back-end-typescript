import { badRequest, serverError } from '@/presentation/helpers/http-helpers'
import Controller from '@/presentation/protocols/controller-protocol'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http-protocols'
import { Validator } from '@/validation/validator-protocol'

export class LoadCustomerByIdController implements Controller {
  constructor (private readonly loadCustomerByIdValidator: Validator<string>) {}

  async handle (httpRequest: HttpRequest<void>): Promise<HttpResponse> {
    try {
      const schemaValidationError = await this.loadCustomerByIdValidator.validate(httpRequest.pathParameters.customerId)
      if (schemaValidationError) {
        return badRequest(schemaValidationError)
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
