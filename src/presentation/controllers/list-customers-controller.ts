import { badRequest, noContent, ok, serverError } from '@/presentation/helpers/http-helpers'
import Controller from '@/presentation/protocols/controller-protocol'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http-protocols'
import { ListCustomersUseCase } from '@/presentation/protocols/usecases/list-customers-use-case'
import { Validator } from '@/validation/validator-protocol'

export class ListCustomersController implements Controller {
  constructor (
    private readonly listCustomersValidator: Validator,
    private readonly listCustomersUseCase: ListCustomersUseCase
  ) {}

  async handle (httpRequest: HttpRequest<void>): Promise<HttpResponse> {
    try {
      const { limit = 100, lastIdOffset } = httpRequest.queryStringParameters || {}
      const schemaValidationError = await this.listCustomersValidator.validate({ limit, lastIdOffset })
      if (schemaValidationError) {
        return badRequest(schemaValidationError)
      }
      const limitedPagedResult = await this.listCustomersUseCase.execute(limit, lastIdOffset)
      if (limitedPagedResult?.items?.length > 0) {
        return ok(limitedPagedResult)
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
