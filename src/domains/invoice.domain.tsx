import { CustomerItem } from './customer.domain'
import { InvoiceProductItem } from './invoiceProduct.domain'
import { SupplierItem } from './supplier.domain'

export enum InvoiceStatus {
  CURRENT = 'Activo',
  PAYED = 'Pagado',
}

export type InvoiceItem = {
  id: number
  total: number
  physicalInvoiceNumber: string
  physicalInvoiceDate: Date
  mountPayed: number
  status: InvoiceStatus
  isActive: boolean
  updateAt: string
  createAt: string
  userId: number
  customerId: number
  supplierId: number
  customer: CustomerItem
  supplier: SupplierItem
  currentDiscountPercentage: number
}

export class InvoiceDetail implements InvoiceItem {
  public id: number
  public total: number
  public mountPayed: number
  public status: InvoiceStatus
  public isActive: boolean
  public updateAt: string
  public createAt: string
  public userId: number
  public customerId: number
  public supplierId: number
  public customer: CustomerItem
  public supplier: SupplierItem
  public currentDiscountPercentage: number
  public physicalInvoiceNumber: string
  public physicalInvoiceDate: Date

  constructor(
    id: number,
    total: number,
    mountPayed: number,
    status: InvoiceStatus,
    isActive: boolean,
    updateAt: string,
    createAt: string,
    userId: number,
    customerId: number,
    supplierId: number,
    customer: CustomerItem,
    supplier: SupplierItem,
    currentDiscountPercentage: number,
    physicalInvoiceNumber: string,
    physicalInvoiceDate: Date,
  ) {
    this.id = id
    this.total = total
    this.mountPayed = mountPayed
    this.status = status
    this.isActive = isActive
    this.updateAt = updateAt
    this.createAt = createAt
    this.userId = userId
    this.customerId = customerId
    this.supplierId = supplierId
    this.customer = customer
    this.supplier = supplier
    this.currentDiscountPercentage = currentDiscountPercentage
    this.physicalInvoiceNumber = physicalInvoiceNumber
    this.physicalInvoiceDate = physicalInvoiceDate
  }

  get totalToPay() {
    if (this.status === InvoiceStatus.PAYED) {
      return 0
    }

    const mountDiscount =
      this.currentDiscountPercentage > 0 ? (this.total * this.currentDiscountPercentage) / 100 : 0
    return this.total - mountDiscount - this.mountPayed
  }
}

class InvoiceProductRequest {
  public productId: number
  public quantity: number

  constructor(productId: number, quantity: number) {
    this.productId = productId
    this.quantity = quantity
  }
}

export class CreateInvoice {
  public customerId: number
  public supplierId: number
  public physicalInvoiceNumber: string
  public physicalInvoiceDate: Date
  public products: InvoiceProductRequest[]

  constructor(
    customerId: number,
    supplierId: number,
    physicalInvoiceNumber: string,
    physicalInvoiceDate: Date,
    products: InvoiceProductItem[],
  ) {
    this.customerId = customerId
    this.supplierId = supplierId
    this.physicalInvoiceNumber = physicalInvoiceNumber
    this.physicalInvoiceDate = physicalInvoiceDate
    this.products = products.map(
      (product) => new InvoiceProductRequest(product.productId, product.quantity),
    )
  }

  public isValid(): Record<string, string> {
    const errors: Record<string, string> = {}
    if (!this.customerId || this.customerId === 0) {
      errors['customerId'] = 'Cliente es requerido'
    }
    if (!this.supplierId || this.supplierId === 0) {
      errors['supplierId'] = 'Proveedor es requerido'
    }
    if (!this.physicalInvoiceNumber || this.physicalInvoiceNumber.length === 0) {
      errors['physicalInvoiceNumber'] = 'El número de factura física es requerido'
    }
    if (!this.physicalInvoiceDate || this.physicalInvoiceDate > new Date()) {
      errors['physicalInvoiceDate'] = 'La fecha de la factura física'
    }
    if (!this.products || this.products.length === 0) {
      errors['products'] = 'Los productos son requeridos'
    }

    return errors
  }
}
