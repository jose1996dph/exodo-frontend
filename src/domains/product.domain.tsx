import { CategoryItem } from './category.domain'
import { SupplierProductItem } from './supplierProduct.domain'

export type ProductItem = {
  id: number
  name: string
  presentation: string
  category: CategoryItem
  categoryId: number
}

export type ProductDetail = ProductItem & {
  id: number
  name: string
  presentation: string
  categoryId: number
  supplierProducts?: SupplierProductItem[]
}

export class CreateProduct {
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
      errors['categoryId'] = 'Categoria es requerido'
    }
    return errors
  }
}

export class UpdateProduct {
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
