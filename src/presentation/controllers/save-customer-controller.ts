import { badRequest, created, forbidden, ok, serverError } from '@/presentation/helpers/http-helpers'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http-protocols'
import { Validator } from '@/validation/validator-protocol'
import { SaveCustomerUseCase } from '@/presentation/protocols/usecases/save-customer-use-case'
import { BusinessError } from '@/presentation/errors/business-error'
import Controller from '@/presentation/protocols/controller-protocol'
import { Customer } from '@/domain/customer'

export class SaveCustomerController implements Controller {
  constructor (
    private readonly saveCustomerValidator: Validator,
    private readonly saveCustomerUseCase: SaveCustomerUseCase
  ) {}

  async handle (request: HttpRequest<Customer>): Promise<HttpResponse | undefined> {
    try {
      const customer = request.body
      const schemaValidationError = await this.saveCustomerValidator.validate(customer)
      if (schemaValidationError) {
        return badRequest(schemaValidationError)
      }
      const result = await this.saveCustomerUseCase.execute(customer)
      if (result instanceof BusinessError) {
        return forbidden(result)
      }
      if (customer.id) {
        return ok(result)
      }
      return created(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
