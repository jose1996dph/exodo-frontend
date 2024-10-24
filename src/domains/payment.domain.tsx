export enum PaymentType {
  TRANSFERENCE = 'transference',
  MOBILE_PAYMENT = 'mobile payment',
  CASH = 'cash',
}

export type PaymentItem = {
  id: number
  mount: number
  paymentType: PaymentType
  referenceCode: string | undefined
  transferDate: Date | undefined
  createAt: Date
  updateAt: Date
}

export type PaymentDetail = PaymentItem & {
  id: number
  mount: number
  paymentType: PaymentType
  referenceCode: string | undefined
  transferDate: Date | undefined
}

export class CreatePayment {
  public mount: number
  public paymentType: PaymentType
  public referenceCode: string | undefined
  public transferDate: Date | undefined

  constructor(
    mount: number,
    paymentType: PaymentType,
    referenceCode?: string,
    transferDate?: Date,
  ) {
    this.mount = mount
    this.referenceCode = referenceCode
    this.paymentType = paymentType
    this.transferDate = transferDate
  }

  public isValid(totalToPay: number, invoiceCreatedDate: Date): Record<string, string> {
    const errors: Record<string, string> = {}
    if (totalToPay === 0) {
      errors['message'] = 'Factura ya fue pagada'
      return errors
    }
    if (!this.mount) {
      errors['mount'] = 'Monto es requerido'
    }
    if (this.mount && this.mount <= 0) {
      errors['mount'] = 'Monto es invalido'
    }
    if (this.mount && this.mount > totalToPay) {
      errors['mount'] = 'Monto pagado no puede exeder al monto a pagar'
    }
    if (!this.paymentType) {
      errors['paymentType'] = 'Medio de pago es requerido'
    }
    if (this.paymentType != PaymentType.CASH && !this.referenceCode) {
      errors['referenceCode'] = 'Numero de referencia es requerido'
    }
    if (this.paymentType != PaymentType.CASH && !this.transferDate) {
      errors['transferDate'] = 'Fecha de transferencia es requerido'
    }
    if (this.transferDate && this.transferDate > new Date()) {
      errors['transferDate'] = 'Fecha de transferencia es invalida'
    }
    if (this.transferDate && this.transferDate < new Date(invoiceCreatedDate)) {
      errors['transferDate'] = 'Fecha de transferencia es invalida'
    }

    return errors
  }

  public toRequest() {
    if (this.paymentType === PaymentType.CASH) {
      return {
        paymentType: this.paymentType,
        mount: this.mount,
      }
    }
    return {
      paymentType: this.paymentType,
      mount: this.mount,
      transferDate: this.transferDate,
      referenceCode: this.referenceCode,
    }
  }
}

export class UpdatePayment {
  public name: string
  public presentation: string
  public categoryId: number

  constructor(name: string, presentation: string, categoryId: number) {
    this.name = name
    this.presentation = presentation
    this.categoryId = categoryId
  }

  public isValid(): Record<string, string> {
    const errors: Record<string, string> = {}
    if (!this.name) {
      errors['name'] = 'Nombre es requerida'
    }
    if (!this.presentation) {
      errors['presentation'] = 'Presentación es requerida'
    }
    if (!this.categoryId || this.categoryId <= 0) {
      errors['salesPercentages'] = 'Categoria es requerido'
    }
    return errors
  }
}
