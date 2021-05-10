export class ValidationSchemaError extends Error {
  constructor (public readonly errors: ValidationSchemaFieldError[]) {
    super('ValidationSchemaError')
    this.name = 'ValidationSchemaError'
  }
}

export class ValidationSchemaFieldError {
  constructor (
    public readonly message: string,
    public readonly path: string[],
    public readonly type: string
  ) {}
}
