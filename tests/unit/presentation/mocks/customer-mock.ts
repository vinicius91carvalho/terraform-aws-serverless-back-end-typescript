import { CustomerDTO } from '@/presentation/dtos/customer-dto'
import { Validator } from '@/validation/validator-protocol'
import { ValidationSchemaError } from '@/validation/validator-schema-error'

export class CustomerValidatorSpy implements Validator<CustomerDTO> {
  params?: CustomerDTO
  result: Promise<ValidationSchemaError | undefined> = Promise.resolve(undefined)

  async validate (value: CustomerDTO): Promise<ValidationSchemaError | undefined> {
    this.params = value
    return this.result
  }
}

export class LoadCustomerByIdValidatorSpy implements Validator<any> {
  params?: any
  result: Promise<ValidationSchemaError | undefined> = Promise.resolve(undefined)

  async validate (value: any): Promise<ValidationSchemaError | undefined> {
    this.params = value
    return this.result
  }
}

export class DeleteCustomerByIdValidatorSpy implements Validator<any> {
  params?: any
  result: Promise<ValidationSchemaError | undefined> = Promise.resolve(undefined)

  async validate (value: any): Promise<ValidationSchemaError | undefined> {
    this.params = value
    return this.result
  }
}

export class ListCustomersValidatorSpy implements Validator<any> {
  params?: any
  result: Promise<ValidationSchemaError | undefined> = Promise.resolve(undefined)

  async validate (value: any): Promise<ValidationSchemaError | undefined> {
    this.params = value
    return this.result
  }
}
