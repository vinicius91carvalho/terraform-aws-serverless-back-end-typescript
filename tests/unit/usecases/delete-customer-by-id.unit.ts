import { DeleteCustomerByIdRepositorySpy } from '@/tests/unit/usecases/mocks/delete-customer-by-id-repository-mock'
import { DeleteCustomerById } from '@/usecases/delete-customer-by-id'
import faker from 'faker'

type SutTypes = {
  sut: DeleteCustomerById
  deleteCustomerByIdRepositorySpy: DeleteCustomerByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteCustomerByIdRepositorySpy = new DeleteCustomerByIdRepositorySpy()
  const sut = new DeleteCustomerById(deleteCustomerByIdRepositorySpy)
  return {
    sut,
    deleteCustomerByIdRepositorySpy
  }
}

describe('DeleteCustomerById', () => {
  test('Should call DeleteCustomerByIdRepository with correct value', async () => {
    const { sut, deleteCustomerByIdRepositorySpy } = makeSut()
    const customerId = faker.datatype.uuid()
    await sut.execute(customerId)
    expect(deleteCustomerByIdRepositorySpy.params).toEqual(customerId)
  })

  test('Should throw if DeleteCustomerByIdRepository throws', async () => {
    const { sut, deleteCustomerByIdRepositorySpy } = makeSut()
    jest.spyOn(deleteCustomerByIdRepositorySpy, 'deleteById').mockRejectedValueOnce(new Error())
    await expect(sut.execute(faker.datatype.uuid())).rejects.toThrowError()
  })
})
