import { NotFoundError } from '@/presentation/errors/not-found-error'
import { badRequest, notFound, ok, serverError } from '@/presentation/helpers/http-helpers'
import Controller from '@/presentation/protocols/controller-protocol'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http-protocols'
import { LoadCustomerByIdUseCase } from '@/presentation/protocols/usecases/load-customer-by-id-use-case'
import { Validator } from '@/validation/validator-protocol'

export class LoadCustomerByIdController implements Controller {
  constructor (
    private readonly loadCustomerByIdValidator: Validator,
    private readonly loadCustomerByIdUseCase: LoadCustomerByIdUseCase
  ) {}

  async handle (httpRequest: HttpRequest<void>): Promise<HttpResponse> {
    try {
      const customerId = httpRequest.pathParameters.customerId
      const schemaValidationError = await this.loadCustomerByIdValidator.validate({ customerId })
      if (schemaValidationError) {
        return badRequest(schemaValidationError)
      }
      const customerFound = await this.loadCustomerByIdUseCase.execute(customerId)
      if (!customerFound) {
        return notFound(new NotFoundError())
      }
      return ok(customerFound)
    } catch (error) {
      return serverError(error)
    }
  }
}
