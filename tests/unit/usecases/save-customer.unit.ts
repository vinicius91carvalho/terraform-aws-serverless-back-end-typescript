import { Customer } from '@/domain/customer'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { buildFakeCustomer } from '@/tests/shared/mocks/customer-dto-mock'
import { FindCustomerByEmailRepositorySpy } from '@/tests/unit/usecases/mocks/find-customer-by-email-repository-mock'
import { SaveCustomerRepositorySpy } from '@/tests/unit/usecases/mocks/save-customer-repository-mock'
import { SaveCustomer } from '@/usecases/save-customer'
import MockDate from 'mockdate'

type SutTypes = {
  sut: SaveCustomer
  findCustomerByEmailRepositorySpy: FindCustomerByEmailRepositorySpy
  fakeCustomer: Customer
  saveCustomerRepositorySpy: SaveCustomerRepositorySpy
}

const makeSut = (): SutTypes => {
  const findCustomerByEmailRepositorySpy = new FindCustomerByEmailRepositorySpy()
  const saveCustomerRepositorySpy = new SaveCustomerRepositorySpy()
  const fakeCustomer = buildFakeCustomer()
  const sut = new SaveCustomer(findCustomerByEmailRepositorySpy, saveCustomerRepositorySpy)
  return {
    sut,
    fakeCustomer,
    findCustomerByEmailRepositorySpy,
    saveCustomerRepositorySpy
  }
}

describe('SaveCustomer', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call FindCustomerByEmailRepository with correct value', async () => {
    const { sut, fakeCustomer, findCustomerByEmailRepositorySpy } = makeSut()
    await sut.execute(fakeCustomer)
    expect(findCustomerByEmailRepositorySpy.params).toEqual(fakeCustomer.email)
  })

  test('Should throw if FindCustomerByEmailRepository throws', async () => {
    const { sut, fakeCustomer, findCustomerByEmailRepositorySpy } = makeSut()
    jest.spyOn(findCustomerByEmailRepositorySpy, 'findByEmail').mockRejectedValueOnce(new Error())
    await expect(sut.execute(fakeCustomer)).rejects.toThrowError()
  })

  test('Should return EmailInUseError if customer returned from database has different id', async () => {
    const { sut, fakeCustomer, findCustomerByEmailRepositorySpy } = makeSut()
    findCustomerByEmailRepositorySpy.result = buildFakeCustomer()
    const result = await sut.execute(fakeCustomer)
    expect(result).toEqual(new EmailInUseError())
  })

  test('Should call SaveCustomerRepository with correct value', async () => {
    const { sut, fakeCustomer, findCustomerByEmailRepositorySpy, saveCustomerRepositorySpy } = makeSut()
    findCustomerByEmailRepositorySpy.result = fakeCustomer
    await sut.execute(fakeCustomer)
    expect(saveCustomerRepositorySpy.params).toEqual({
      ...fakeCustomer,
      updatedAt: new Date().toISOString()
    })
  })

  test('Should throw if SaveCustomerRepository throws', async () => {
    const { sut, fakeCustomer, saveCustomerRepositorySpy } = makeSut()
    jest.spyOn(saveCustomerRepositorySpy, 'save').mockRejectedValueOnce(new Error())
    await expect(sut.execute(fakeCustomer)).rejects.toThrowError()
  })

  test('Should return the updated customer if SaveCustomerRepository succeeds', async () => {
    const { sut, fakeCustomer, findCustomerByEmailRepositorySpy } = makeSut()
    findCustomerByEmailRepositorySpy.result = fakeCustomer
    const customer = await sut.execute(fakeCustomer)
    expect(customer).toEqual({
      ...fakeCustomer,
      updatedAt: new Date().toISOString()
    })
  })

  test('Should update createdAt if its a new customer', async () => {
    const { sut, saveCustomerRepositorySpy, fakeCustomer } = makeSut()
    fakeCustomer.id = null
    await sut.execute(fakeCustomer)
    expect(saveCustomerRepositorySpy.params).toEqual({
      ...fakeCustomer,
      createdAt: new Date().toISOString()
    })
  })
})
