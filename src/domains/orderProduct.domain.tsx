import { ProductDetail, ProductItem } from './product.domain'

export class OrderProductItem {
  productId: number
  quantity: number
  product: ProductDetail

  constructor(product: ProductItem, quantity: number) {
    this.product = product
    this.productId = product.id
    this.quantity = quantity
  }

  public calculatePrice(): number {
    const _product = this.product as ProductDetail
    if (!_product) {
      throw 'Product invalid'
    }

    if (!_product.supplierProducts || _product.supplierProducts.length === 0) {
      throw 'Price product invalid'
    }

    return _product.supplierProducts[0].price * this.quantity
  }
}

export class CreateOrderProduct {
  productId: number
  quantity: number
  product: ProductItem

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
    return new OrderProductItem(this.product, this.quantity)
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
    return new OrderProductItem(this.product, this.quantity)
  }
}
