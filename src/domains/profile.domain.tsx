import { isEmail, isNumeric } from '../framework/helpers/validation.helper'

export type ProfileDetail = {
  id: number
  dni: string
  firstName: string
  lastName: string
  phone: string
  email: string
  createAt: Date
  updateAt: Date
}

export class UpdateProfile {
  public dni: string
  public firstName: string
  public lastName: string
  public phone: string
  public email: string

  constructor(dni: string, firstName: string, lastName: string, phone: string, email: string) {
    this.dni = dni
    this.firstName = firstName
    this.lastName = lastName
    this.phone = phone
    this.email = email
  }

  public isValid(): Record<string, string> {
    const errors: Record<string, string> = {}
    if (!this.dni) {
      errors['dni'] = 'Cédula es requerida'
    }
    if (this.dni && isNumeric(this.dni)) {
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
    if (!this.email) {
      errors['email'] = 'Correo es requerido'
    }
    if (this.email && !isEmail(this.email)) {
      errors['email'] = 'Correo no valido'
    }
    return errors
  }
}

export class ChangePassword {
  public password: string
  public newPassword: string
  public confirmPassword: string

  constructor(password: string, newPassword: string, confirmPassword: string) {
    this.password = password
    this.newPassword = newPassword
    this.confirmPassword = confirmPassword
  }

  public isValid(): Record<string, string> {
    const errors: Record<string, string> = {}
    if (!this.password) {
      errors['password'] = 'Contraseña es requerida'
    }
    if (this.password && (this.password.length < 8 || this.password.length > 16)) {
      errors['password'] = 'Contraseña debe tener entre 8 y 16 caracteres'
    }
    if (!this.newPassword) {
      errors['newPassword'] = 'Nueva contraseña es requerida'
    }
    if (this.newPassword && (this.newPassword.length < 8 || this.newPassword.length > 16)) {
      errors['newPassword'] = 'Nueva contraseña debe tener entre 8 y 16 caracteres'
    }
    if (!this.confirmPassword) {
      errors['confirmPassword'] = 'Nueva contraseña es requerida'
    }
    if (
      this.confirmPassword &&
      (this.confirmPassword.length < 8 || this.confirmPassword.length > 16)
    ) {
      errors['confirmPassword'] = 'Confirmacion de contraseña debe tener entre 8 y 16 caracteres'
    }
    if (this.newPassword && this.confirmPassword && this.newPassword !== this.confirmPassword) {
      errors['confirmPassword'] = 'Confirmacion contraseña debe igual a la nueva contraseña'
    }

    return errors
  }
}
