export interface DeleteCustomerByIdRepository {
  deleteById: (id: string) => Promise<void>
}
