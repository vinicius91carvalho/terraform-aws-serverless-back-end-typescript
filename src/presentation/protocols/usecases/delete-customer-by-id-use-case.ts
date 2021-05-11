export interface DeleteCustomerByIdUseCase {
  execute: (customerId: string) => Promise<void>
}
