import { badRequest, noContent, ok, serverError } from '@/presentation/helpers/http-helpers'
import Controller from '@/presentation/protocols/controller-protocol'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http-protocols'
import { SearchCustomersUseCase } from '@/presentation/protocols/usecases/search-customers-use-case'
import { Validator } from '@/validation/validator-protocol'

export class SearchCustomersController implements Controller {
  constructor (
    private readonly searchCustomersValidator: Validator,
    private readonly searchCustomersUseCase: SearchCustomersUseCase
  ) {}

  async handle (httpRequest: HttpRequest<void>): Promise<HttpResponse> {
    try {
      const { limit = 100, offset, textToSearch } = httpRequest.queryStringParameters || {}
      const schemaValidationError = await this.searchCustomersValidator.validate({ limit, offset, textToSearch })
      if (schemaValidationError) {
        return badRequest(schemaValidationError)
      }
      const completePagedResult = await this.searchCustomersUseCase.execute({ limit, offset, textToSearch })
      if (completePagedResult?.items?.length > 0) {
        return ok(completePagedResult)
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
