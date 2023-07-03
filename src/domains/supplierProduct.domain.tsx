import { ProductItem } from './product.domain'

export type SupplierProductItem = {
  supplierId: number
  productId: number
  price: number
  product: ProductItem
}

export class CreateSupplierProduct {
  productId: number
  price: number

  constructor(supplierId: number, productId: number, price: number) {
    this.productId = productId
    this.price = price
  }
  public isValid(): Record<string, string> {
    const errors: Record<string, string> = {}
    if (!this.price || this.price <= 0) {
      errors['price'] = 'Precio es requerida'
    }
    if (!this.productId || this.productId <= 0) {
      errors['productId'] = 'Producto es requerido'
    }
    return errors
  }
}

export class UpdateSupplierProduct {
  price: number

  constructor(price: number) {
    this.price = price
  }

  public isValid(): Record<string, string> {
    const errors: Record<string, string> = {}
    if (!this.price || this.price <= 0) {
      errors['price'] = 'Precio es requerida'
    }
    return errors
  }
}
