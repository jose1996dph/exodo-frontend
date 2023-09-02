import { ProductDetail, ProductItem } from './product.domain'

export type OrderProductItem = {
  productId: number
  quantity: number
  product: ProductDetail
}

export class CreateOrderProduct {
  orderId?: number
  productId: number
  quantity: number
  product: ProductItem

  constructor(product: ProductItem, quantity: number, orderId: number | undefined = undefined) {
    this.product = product
    this.productId = product.id
    this.quantity = quantity
    this.orderId = orderId
  }

  public isValid(): Record<string, string> {
    const errors: Record<string, string> = {}
    if (!this.quantity || this.quantity <= 0) {
      errors['quantity'] = 'Cantidad es requerida'
    }
    if (!this.productId || this.productId <= 0) {
      errors['productId'] = 'Producto es requerido'
    }
    return errors
  }

  public toOrderProductItem() {
    if (this.orderId) {
      return {
        productId: this.productId,
        quantity: this.quantity,
        product: this.product,
        orderId: this.orderId,
      } as OrderProductItem
    }

    return {
      productId: this.productId,
      quantity: this.quantity,
      product: this.product,
    } as OrderProductItem
  }
}

export class UpdateOrderProduct {
  productId: number
  quantity: number
  private product: ProductItem

  constructor(product: ProductItem, quantity: number) {
    this.product = product
    this.productId = product.id
    this.quantity = quantity
  }

  public isValid(): Record<string, string> {
    const errors: Record<string, string> = {}
    if (!this.quantity || this.quantity <= 0) {
      errors['quantity'] = 'Cantidad es requerida'
    }
    if (!this.productId || this.productId <= 0) {
      errors['productId'] = 'Producto es requerido'
    }
    return errors
  }

  public toOrderProductItem() {
    return {
      productId: this.productId,
      quantity: this.quantity,
      product: this.product,
    } as OrderProductItem
  }
}
