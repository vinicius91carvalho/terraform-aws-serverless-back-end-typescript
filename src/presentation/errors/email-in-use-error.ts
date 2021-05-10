import { BusinessError } from '@/presentation/errors/business-error'

export class EmailInUseError extends BusinessError {
  constructor () {
    super('The received email is already in use')
    this.name = 'EmailInUseError'
  }
}
