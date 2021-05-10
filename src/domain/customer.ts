export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHERS = 'OTHERS'
}

export type Customer = {
  id?: string
  fullName: string
  email: string
  gender: GenderEnum
  birthDate: Date
  createdAt?: Date
  updatedAt?: Date
}
