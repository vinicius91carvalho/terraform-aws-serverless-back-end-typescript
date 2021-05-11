import { Customer } from '@/domain/customer'
import { Validator } from '@/validation/validator-protocol'
import { ValidationSchemaError } from '@/validation/validator-schema-error'

export class CustomerValidatorSpy implements Validator {
  params?: Customer
  result: Promise<ValidationSchemaError | undefined> = Promise.resolve(undefined)

  async validate (value: Customer): Promise<ValidationSchemaError | undefined> {
    this.params = value
    return this.result
  }
}

export class LoadCustomerByIdValidatorSpy implements Validator {
  params?: any
  result: Promise<ValidationSchemaError | undefined> = Promise.resolve(undefined)

  async validate (value: any): Promise<ValidationSchemaError | undefined> {
    this.params = value
    return this.result
  }
}

export class DeleteCustomerByIdValidatorSpy implements Validator {
  params?: any
  result: Promise<ValidationSchemaError | undefined> = Promise.resolve(undefined)

  async validate (value: any): Promise<ValidationSchemaError | undefined> {
    this.params = value
    return this.result
  }
}

export class ListCustomersValidatorSpy implements Validator {
  params?: any
  result: Promise<ValidationSchemaError | undefined> = Promise.resolve(undefined)

  async validate (value: any): Promise<ValidationSchemaError | undefined> {
    this.params = value
    return this.result
  }
}

export class SearchCustomersValidatorSpy implements Validator {
  params?: any
  result: Promise<ValidationSchemaError | undefined> = Promise.resolve(undefined)

  async validate (value: any): Promise<ValidationSchemaError | undefined> {
    this.params = value
    return this.result
  }
}
