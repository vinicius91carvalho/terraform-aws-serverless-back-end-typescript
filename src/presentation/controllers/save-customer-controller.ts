
import { badRequest, created, forbidden, ok, serverError } from '@/presentation/helpers/http-helpers'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http-protocols'
import { Validator } from '@/validation/validator-protocol'
import { CustomerDTO } from '@/presentation/dtos/customer-dto'
import { SaveCustomerUseCase } from '@/presentation/protocols/usecases/save-customer-use-case'
import CustomerMapper from '@/presentation/mappers/customer-mapper'
import { BusinessError } from '@/presentation/errors/business-error'
import Controller from '@/presentation/protocols/controller-protocol'

export class SaveCustomerController implements Controller {
  constructor (
    private readonly saveCustomerValidator: Validator<CustomerDTO>,
    private readonly saveCustomerUseCase: SaveCustomerUseCase
  ) {}

  async handle (request: HttpRequest<CustomerDTO>): Promise<HttpResponse | undefined> {
    try {
      const customerDTO: CustomerDTO = request.body
      const schemaValidationError = await this.saveCustomerValidator.validate(customerDTO)
      if (schemaValidationError) {
        return badRequest(schemaValidationError)
      }
      const result = await this.saveCustomerUseCase.execute(CustomerMapper.mapToCustomer(customerDTO))
      if (result instanceof BusinessError) {
        return forbidden(result)
      }
      if (customerDTO.id) {
        return ok(result)
      }
      return created(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
