import { NotFoundError } from '@/presentation/errors/not-found-error'
import { badRequest, noContent, notFound, serverError } from '@/presentation/helpers/http-helpers'
import Controller from '@/presentation/protocols/controller-protocol'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http-protocols'
import { DeleteCustomerByIdUseCase } from '@/presentation/protocols/usecases/delete-customer-by-id-use-case'
import { LoadCustomerByIdUseCase } from '@/presentation/protocols/usecases/load-customer-by-id-use-case'
import { Validator } from '@/validation/validator-protocol'

export class DeleteCustomerByIdController implements Controller {
  constructor (
    private readonly deleteCustomerByIdValidator: Validator,
    private readonly loadCustomerByIdUseCase: LoadCustomerByIdUseCase,
    private readonly deleteCustomerByIdUseCase: DeleteCustomerByIdUseCase
  ) {}

  async handle (httpRequest: HttpRequest<void>): Promise<HttpResponse> {
    try {
      const customerId = httpRequest.pathParameters.customerId
      const schemaValidationError = await this.deleteCustomerByIdValidator.validate({ customerId })
      if (schemaValidationError) {
        return badRequest(schemaValidationError)
      }
      const customerFound = await this.loadCustomerByIdUseCase.execute(customerId)
      await this.deleteCustomerByIdUseCase.execute(customerId)
      if (!customerFound) {
        return notFound(new NotFoundError())
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
