import { HttpRequest, HttpResponse } from '@/presentation/protocols/http-protocols'

export default interface Controller {
  handle: (httpRequest?: HttpRequest<any>) => Promise<HttpResponse>
}
