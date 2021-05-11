import { badRequest, noContent, ok, serverError } from '@/presentation/helpers/http-helpers'
import Controller from '@/presentation/protocols/controller-protocol'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http-protocols'
import { LoadCustomersUseCase } from '@/presentation/protocols/usecases/load-customers-use-case'
import { Validator } from '@/validation/validator-protocol'

export class LoadCustomersController implements Controller {
  constructor (
    private readonly loadCustomersValidator: Validator<any>,
    private readonly loadCustomersUseCase: LoadCustomersUseCase
  ) {}

  async handle (httpRequest: HttpRequest<void>): Promise<HttpResponse> {
    try {
      const { limit, lastIdOffset } = httpRequest.queryStringParameters
      const schemaValidationError = await this.loadCustomersValidator.validate({ limit, lastIdOffset })
      if (schemaValidationError) {
        return badRequest(schemaValidationError)
      }
      const pagedResult = await this.loadCustomersUseCase.execute(limit, lastIdOffset)
      if (pagedResult?.items?.length > 0) {
        return ok(pagedResult)
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
