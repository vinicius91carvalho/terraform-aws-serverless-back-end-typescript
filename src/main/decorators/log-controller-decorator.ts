import Controller from '@/presentation/protocols/controller-protocol'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http-protocols'

export default class LogControllerDecorator implements Controller {
  constructor (private readonly controller: Controller) {}

  async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    console.info(httpRequest)
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode >= 500) {
      console.error(httpResponse)
    } else {
      console.info(httpResponse)
    }
    return httpResponse
  }
}
