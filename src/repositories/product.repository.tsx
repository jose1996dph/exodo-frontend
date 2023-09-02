import { ProductItem, CreateProduct, UpdateProduct, ProductDetail } from '../domains/product.domain'
import api from '../framework/api'
import { BackendURL } from '../config'
import { formatUrlText } from '../framework/helpers/formatter.helper'

export interface IProductRepository {
  getAll(
    pageSize: number,
    pageNum: number,
    search: string,
    supplierId: number,
    notSupplierId: number,
    notOrderId: number,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[ProductItem[], number]>

  getById(id: number): Promise<ProductDetail>

  createProduct(createUser: CreateProduct): Promise<ProductItem>

  updateProduct(id: number, updateUser: UpdateProduct): Promise<ProductItem>

  toggleStatus(id: number): Promise<ProductItem>

  deleteProduct(id: number): void
}

class ProductRepository implements IProductRepository {
  async getAll(
    pageSize: number,
    pageNum: number,
    search: string,
    supplierId = 0,
    notSupplierId = 0,
    notOrderId: number,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[ProductItem[], number]> {
    let params = `pageSize=${pageSize}&pageNum=${pageNum}&search=${formatUrlText(search)}`

    if (supplierId > 0) {
      params = params + `&supplierId=${supplierId}`
    }

    if (notSupplierId > 0) {
      params = params + `&notSupplierId=${notSupplierId}`
    }

    if (notOrderId > 0) {
      params = params + `&notOrderId=${notOrderId}`
    }

    if (orderBy) {
      params += `&orderBy=${orderBy}`
    }

    if (orderDirection) {
      params += `&orderDirection=${orderDirection}`
    }

    const { data } = await api.get(`${BackendURL}products/?${params}`)

    const [user, count] = data

    let _count: number = (count / pageSize) >> 0

    if (count % pageSize > 0) {
      _count += 1
    }

    return [user as ProductItem[], _count]
  }

  async getById(id: number): Promise<ProductDetail> {
    const { data } = await api.get(`${BackendURL}products/${id}`)

    return data as ProductDetail
  }

  async createProduct(createUser: CreateProduct): Promise<ProductItem> {
    const { data } = await api.post(`${BackendURL}products/`, createUser)

    return data as ProductItem
  }

  async updateProduct(id: number, updateUser: UpdateProduct): Promise<ProductItem> {
    const { data } = await api.put(`${BackendURL}products/${id}`, updateUser)

    return data as ProductItem
  }

  async toggleStatus(id: number): Promise<ProductItem> {
    const { data } = await api.patch(`${BackendURL}products/${id}/status`)

    return data as ProductItem
  }

  async deleteProduct(id: number) {
    await api.delete(`${BackendURL}products/${id}`)
  }
}

export const makeProductRepository = (): IProductRepository => {
  return new ProductRepository()
}
