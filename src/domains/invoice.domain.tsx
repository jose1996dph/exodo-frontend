import { CustomerItem } from './customer.domain'
import { InvoiceProductItem } from './invoiceProduct.domain'
import { SupplierItem } from './supplier.domain'

export type InvoiceItem = {
  id: number
  total: number
  isActive: boolean
  updateAt: string
  createAt: string
  userId: number
  customerId: number
  supplierId: number
  customer: CustomerItem
  supplier: SupplierItem
}

export type InvoiceDetail = InvoiceItem & {
  id: number
  total: number
  isActive: boolean
  updateAt: string
  createAt: string
  userId: number
  customerId: number
  supplierId: number
  customer: CustomerItem
  supplier: SupplierItem
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
  public products: InvoiceProductRequest[]

  constructor(customerId: number, supplierId: number, products: InvoiceProductItem[]) {
    this.customerId = customerId
    this.supplierId = supplierId
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
      errors['supplierId'] = 'Distribuidor es requerido'
    }
    if (!this.products || this.products.length === 0) {
      errors['products'] = 'Los productos son requeridos'
    }
    return errors
  }
}
