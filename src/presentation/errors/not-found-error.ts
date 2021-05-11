import { BusinessError } from '@/presentation/errors/business-error'

export class NotFoundError extends BusinessError {
  constructor () {
    super('The resource was not found')
    this.name = 'NotFoundError'
  }
}
