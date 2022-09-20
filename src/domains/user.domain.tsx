import { RoleItem } from './role.domain'

export type UserItem = {
  id: number
  dni: string
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
  createAt: Date
  updateAt: Date
}

export type UserDetail = {
  id: number
  dni: string
  firstName: string
  lastName: string
  phone: string
  email: string
  role: RoleItem
  password: string
  createAt: Date
  updateAt: Date
}

export class CreateUser {
  public dni: string
  public firstName: string
  public lastName: string
  public phone: string
  public roleId: number
  public email: string
  constructor(
    dni: string,
    firstName: string,
    lastName: string,
    phone: string,
    roleId: number,
    email: string,
  ) {
    this.dni = dni
    this.firstName = firstName
    this.lastName = lastName
    this.phone = phone
    this.roleId = roleId
    this.email = email
  }

  public isValid(): Record<string, string> {
    const errors: Record<string, string> = {}
    if (!this.dni) {
      errors['dni'] = 'Cédula es requerida'
    }
    if (this.dni && (this.dni.length < 7 || this.dni.length > 8)) {
      errors['dni'] = 'Cédula debe tener solo caracteres numericos'
    }
    if (this.dni && (this.dni.length < 7 || this.dni.length > 8)) {
      errors['dni'] = 'Cédula debe tener entre 7 y 8 caracteres'
    }
    if (!this.firstName) {
      errors['firstName'] = 'Nombre es requerido'
    }
    if (!this.lastName) {
      errors['lastName'] = 'Apellido es requerido'
    }
    if (!this.phone) {
      errors['phone'] = 'Teléfono es requerido'
    }
    if (this.phone && this.phone.length !== 11) {
      errors['phone'] = 'Teléfono debe tener 11 caracteres'
    }
    if (!this.roleId) {
      errors['roleId'] = 'Rol es requerido'
    }
    if (!this.email) {
      errors['email'] = 'Correo es requerido'
    }
    return errors
  }
}

export class UpdateUser {
  public dni: string
  public firstName: string
  public lastName: string
  public phone: string
  public roleId: number
  public email: string

  constructor(
    dni: string,
    firstName: string,
    lastName: string,
    phone: string,
    roleId: number,
    email: string,
  ) {
    this.dni = dni
    this.firstName = firstName
    this.lastName = lastName
    this.phone = phone
    this.roleId = roleId
    this.email = email
  }

  public isValid(): Record<string, string> {
    const errors: Record<string, string> = {}
    if (!this.dni) {
      errors['dni'] = 'Cédula es requerida'
    }
    if (this.dni && (this.dni.length < 7 || this.dni.length > 8)) {
      errors['dni'] = 'Cédula debe tener solo caracteres numericos'
    }
    if (this.dni && (this.dni.length < 7 || this.dni.length > 8)) {
      errors['dni'] = 'Cédula debe tener entre 7 y 8 caracteres'
    }
    if (!this.firstName) {
      errors['firstName'] = 'Nombre es requerido'
    }
    if (!this.lastName) {
      errors['lastName'] = 'Apellido es requerido'
    }
    if (!this.phone) {
      errors['phone'] = 'Teléfono es requerido'
    }
    if (this.phone && this.phone.length !== 11) {
      errors['phone'] = 'Teléfono debe tener 11 caracteres'
    }
    if (!this.roleId) {
      errors['roleId'] = 'Rol es requerido'
    }
    if (!this.email) {
      errors['email'] = 'Correo es requerido'
    }
    return errors
  }
}
