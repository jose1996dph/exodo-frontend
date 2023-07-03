import {
  CreateSupplierProduct,
  SupplierProductItem,
  UpdateSupplierProduct,
} from '../domains/supplierProduct.domain'
import api from '../framework/api'
import { BackendURL } from '../config'
import { formatUrlText } from '../framework/helpers/formatter.helper'

export interface ISupplierProductRepository {
  getAllSupplierProduct(
    supplierId: number,
    pageSize: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[SupplierProductItem[], number]>

  createSupplierProduct(
    id: number,
    createSupplierProduct: CreateSupplierProduct,
  ): Promise<SupplierProductItem>

  updateSupplieProduct(
    id: number,
    productId: number,
    updateSupplierProduct: UpdateSupplierProduct,
  ): Promise<SupplierProductItem>

  deleteSupplierProduct(id: number, productId: number): void
}

class SupplierProductRepository implements ISupplierProductRepository {
  async getAllSupplierProduct(
    id: number,
    pageSize: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[SupplierProductItem[], number]> {
    let params = `?pageSize=${pageSize}&pageNum=${pageNum}&search=${formatUrlText(search)}`

    if (orderBy) {
      params += `&orderBy=${orderBy}`
    }

    if (orderDirection) {
      params += `&orderDirection=${orderDirection}`
    }

    const { data } = await api.get(`${BackendURL}suppliers/${id}/product/${params}`)

    const [product, count] = data

    let _count: number = (count / pageSize) >> 0

    if (count % pageSize > 0) {
      _count += 1
    }

    return [product as SupplierProductItem[], _count]
  }

  async createSupplierProduct(
    id: number,
    createSupplierProduct: CreateSupplierProduct,
  ): Promise<SupplierProductItem> {
    const { data } = await api.post(`${BackendURL}suppliers/${id}/product`, createSupplierProduct)

    return data as SupplierProductItem
  }

  async updateSupplieProduct(
    id: number,
    productId: number,
    updateSupplierProduct: UpdateSupplierProduct,
  ): Promise<SupplierProductItem> {
    const { data } = await api.put(
      `${BackendURL}suppliers/${id}/product/${productId}`,
      updateSupplierProduct,
    )

    return data as SupplierProductItem
  }

  async deleteSupplierProduct(id: number, productId: number) {
    await api.delete(`${BackendURL}suppliers/${id}/product/${productId}`)
  }
}

export const makeSupplierProductRepository = (): ISupplierProductRepository => {
  return new SupplierProductRepository()
}
