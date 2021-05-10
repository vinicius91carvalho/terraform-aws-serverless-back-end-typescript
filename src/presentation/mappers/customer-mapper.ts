import { Customer } from '@/domain/customer'
import { CustomerDTO } from '@/presentation/dtos/customer-dto'

const mapToCustomer = (customerDTO: CustomerDTO): Customer => {
  return {
    id: customerDTO.id,
    fullName: customerDTO.fullName,
    email: customerDTO.email,
    gender: customerDTO.gender,
    birthDate: customerDTO.birthDate
  }
}

const mapToCustomers = (customerDTOs: CustomerDTO[]): Customer[] => {
  return customerDTOs.map(customerDTO => mapToCustomer(customerDTO))
}

const customerMapper = {
  mapToCustomer,
  mapToCustomers
}

export default customerMapper
