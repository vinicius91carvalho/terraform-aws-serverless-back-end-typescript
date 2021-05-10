import { HttpResponse } from '@/presentation/protocols/http-protocols'

export default interface Controller {
  handle: (httpRequest?: any) => Promise<HttpResponse>
}
