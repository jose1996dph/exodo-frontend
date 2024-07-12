import { isRif } from '../framework/helpers/validation.helper'

export type SupplierItem = {
  id: number
  dni: string
  name: string
  address: string
  phone: string
}

export type SupplierDetail = {
  id: number
  dni: string
  name: string
  address: string
  phone: string
  isActive: boolean
}

export class CreateSupplier {
  public dni: string
  public name: string
  public address: string
  public phone: string

  constructor(dni: string, name: string, address: string, phone: string) {
    this.dni = dni
    this.name = name
    this.address = address
    this.phone = phone
  }

  public isValid(): Record<string, string> {
    const errors: Record<string, string> = {}
    if (!this.dni) {
      errors['dni'] = 'Rif es requerida'
    }
    if (this.dni && !isRif(this.dni)) {
      errors['dni'] = 'Rif es invalido'
    }
    if (!this.name) {
      errors['name'] = 'El nombre es requerido'
    }
    if (!this.address) {
      errors['address'] = 'Dirección es requerida'
    }
    if (!this.phone) {
      errors['phone'] = 'Teléfono es requerido'
    }
    if (this.phone && this.phone.length !== 11) {
      errors['phone'] = 'Teléfono debe tener 11 caracteres'
    }
    return errors
  }
}

export class UpdateSupplier {
  public dni: string
  public name: string
  public address: string
  public phone: string

  constructor(dni: string, name: string, address: string, phone: string) {
    this.dni = dni
    this.name = name
    this.address = address
    this.phone = phone
  }

  public isValid(): Record<string, string> {
    const errors: Record<string, string> = {}
    if (!this.dni) {
      errors['dni'] = 'Rif es requerida'
    }
    if (this.dni && !isRif(this.dni)) {
      errors['dni'] = 'Rif es invalido'
    }
    if (!this.name) {
      errors['name'] = 'El nombre es requerido'
    }
    if (!this.address) {
      errors['address'] = 'Dirección es requerida'
    }
    if (!this.phone) {
      errors['phone'] = 'Teléfono es requerido'
    }
    if (this.phone && this.phone.length !== 11) {
      errors['phone'] = 'Teléfono debe tener 11 caracteres'
    }
    return errors
  }
}
