import { isRif } from '../framework/helpers/validation.helper'

export type CustomerItem = {
  id: number
  dni: string
  businessName: string
  storeName: string
  address: string
  referencePoint: string
  phone: string
  contactPhone: string
  contactName: string
}

export type CustomerDetail = {
  id: number
  dni: string
  businessName: string
  storeName: string
  address: string
  referencePoint: string
  phone: string
  contactPhone: string
  contactName: string
}

export class CreateCustomer {
  public dni: string
  public businessName: string
  public storeName: string
  public address: string
  public referencePoint: string
  public phone: string
  public contactName: string
  public contactPhone: string

  constructor(
    dni: string,
    businessName: string,
    storeName: string,
    address: string,
    referencePoint: string,
    phone: string,
    contactName: string,
    contactPhone: string,
  ) {
    this.dni = dni
    this.businessName = businessName
    this.storeName = storeName
    this.address = address
    this.referencePoint = referencePoint
    this.phone = phone
    this.contactName = contactName
    this.contactPhone = contactPhone
  }

  public isValid(): Record<string, string> {
    const errors: Record<string, string> = {}
    if (!this.dni) {
      errors['dni'] = 'Rif es requerida'
    }
    if (this.dni && !isRif(this.dni)) {
      errors['dni'] = 'Rif es invalido'
    }
    if (!this.businessName) {
      errors['businessName'] = 'Razón social es requerido'
    }
    if (!this.storeName) {
      errors['storeName'] = 'Nombre de la tienda es requerido'
    }
    if (!this.address) {
      errors['address'] = 'Dirección es requerida'
    }
    if (!this.referencePoint) {
      errors['referencePoint'] = 'Punto de referencia es requerido'
    }
    if (!this.phone) {
      errors['phone'] = 'Teléfono es requerido'
    }
    if (this.phone && this.phone.length !== 11) {
      errors['phone'] = 'Teléfono debe tener 11 caracteres'
    }
    if (!this.contactName) {
      errors['contactName'] = 'Persona de contacto es requerido'
    }
    if (!this.contactPhone) {
      errors['contactPhone'] = 'Teléfono de persona de contacto es requerido'
    }
    return errors
  }
}

export class UpdateCustomer {
  public dni: string
  public businessName: string
  public storeName: string
  public address: string
  public referencePoint: string
  public phone: string
  public contactName: string
  public contactPhone: string

  constructor(
    dni: string,
    businessName: string,
    storeName: string,
    address: string,
    referencePoint: string,
    phone: string,
    contactName: string,
    contactPhone: string,
  ) {
    this.dni = dni
    this.businessName = businessName
    this.storeName = storeName
    this.address = address
    this.referencePoint = referencePoint
    this.phone = phone
    this.contactName = contactName
    this.contactPhone = contactPhone
  }

  public isValid(): Record<string, string> {
    const errors: Record<string, string> = {}
    if (!this.dni) {
      errors['dni'] = 'Rif es requerida'
    }
    if (this.dni && !isRif(this.dni)) {
      errors['dni'] = 'Rif es invalido'
    }
    if (!this.businessName) {
      errors['businessName'] = 'Razón social es requerido'
    }
    if (!this.storeName) {
      errors['storeName'] = 'Nombre de la tienda es requerido'
    }
    if (!this.address) {
      errors['address'] = 'Dirección es requerida'
    }
    if (!this.referencePoint) {
      errors['referencePoint'] = 'Punto de referencia es requerido'
    }
    if (!this.phone) {
      errors['phone'] = 'Teléfono es requerido'
    }
    if (this.phone && this.phone.length !== 11) {
      errors['phone'] = 'Teléfono debe tener 11 caracteres'
    }
    if (!this.contactName) {
      errors['contactName'] = 'Persona de contacto es requerido'
    }
    if (!this.contactPhone) {
      errors['contactPhone'] = 'Teléfono de persona de contacto es requerido'
    }
    return errors
  }
}
