import { CategoryItem } from './category.domain'

export type ProductItem = {
  id: number
  name: string
  presentation: string
  category: CategoryItem
  categoryId: number
  salesPercentages: number[]
}

export type ProductDetail = {
  id: number
  name: string
  presentation: string
  categoryId: number
  salesPercentages: number[]
}

export class CreateProduct {
  public name: string
  public presentation: string
  public categoryId: number
  public salesPercentages: number[]

  constructor(name: string, presentation: string, categoryId: number, salesPercentages: number[]) {
    this.name = name
    this.presentation = presentation
    this.categoryId = categoryId
    this.salesPercentages = salesPercentages
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
    if (!this.salesPercentages || this.salesPercentages.length === 0) {
      errors['salesPercentages'] = 'Los procentages de ventas son requeridos'
    }
    return errors
  }
}

export class UpdateProduct {
  public name: string
  public presentation: string
  public categoryId: number
  public salesPercentages: number[]

  constructor(name: string, presentation: string, categoryId: number, salesPercentages: number[]) {
    this.name = name
    this.presentation = presentation
    this.categoryId = categoryId
    this.salesPercentages = salesPercentages
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
    if (!this.salesPercentages || this.salesPercentages.length === 0) {
      errors['salesPercentages'] = 'Procentage de venta es requerido'
    }
    return errors
  }
}
