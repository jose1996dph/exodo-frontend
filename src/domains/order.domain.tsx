import { CustomerItem } from './customer.domain'
import { OrderProductItem } from './orderProduct.domain'
import { SupplierItem } from './supplier.domain'

export type OrderItem = {
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

export type OrderDetail = {
  id: number
  dni: string
  name: string
  address: string
  phone: string
}

class OrderProductRequest {
  public productId: number
  public quantity: number

  constructor(productId: number, quantity: number) {
    this.productId = productId
    this.quantity = quantity
  }
}

export class CreateOrder {
  public customerId: number
  public supplierId: number
  public products: OrderProductRequest[]

  constructor(customerId: number, supplierId: number, products: OrderProductItem[]) {
    this.customerId = customerId
    this.supplierId = supplierId
    this.products = products.map(
      (product) => new OrderProductRequest(product.productId, product.quantity),
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
