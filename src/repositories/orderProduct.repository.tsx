import {
  CreateOrderProduct,
  OrderProductItem,
  UpdateOrderProduct,
} from '../domains/orderProduct.domain'
import api from '../framework/api'
import { BackendURL } from '../config'
import { formatUrlText } from '../framework/helpers/formatter.helper'

export interface IOrderProductRepository {
  getAllOrderProduct(
    orderId: number,
    pageNum: number,
    search: string,
    pageSize?: number,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[OrderProductItem[], number]>

  createOrderProduct(id: number, createOrderProduct: CreateOrderProduct): Promise<OrderProductItem>

  updateSupplieProduct(
    id: number,
    productId: number,
    updateOrderProduct: UpdateOrderProduct,
  ): Promise<OrderProductItem>

  deleteOrderProduct(id: number, productId: number): void
}

class OrderProductRepository implements IOrderProductRepository {
  async getAllOrderProduct(
    id: number,
    pageNum: number,
    search: string,
    pageSize?: number,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[OrderProductItem[], number]> {
    let params = `?pageNum=${pageNum}&search=${formatUrlText(search)}`

    if (pageSize) {
      params += `&pageSize=${pageSize}`
    }

    if (orderBy) {
      params += `&orderBy=${orderBy}`
    }

    if (orderDirection) {
      params += `&orderDirection=${orderDirection}`
    }

    const { data } = await api.get(`${BackendURL}orders/${id}/product/${params}`)

    const [product, count] = data

    let _count: number = pageSize ? (count / pageSize) >> 0 : 0

    if (pageSize && count % pageSize > 0) {
      _count += 1
    }

    return [product.map((p: any) => new OrderProductItem(p.product, p.quantity)), _count]
  }

  async createOrderProduct(
    id: number,
    createOrderProduct: CreateOrderProduct,
  ): Promise<OrderProductItem> {
    const { data } = await api.post(`${BackendURL}orders/${id}/product`, {
      productId: createOrderProduct.productId,
      quantity: createOrderProduct.quantity,
    })

    return data as OrderProductItem
  }

  async updateSupplieProduct(
    id: number,
    productId: number,
    updateOrderProduct: UpdateOrderProduct,
  ): Promise<OrderProductItem> {
    const { data } = await api.put(`${BackendURL}orders/${id}/product/${productId}`, {
      productId: updateOrderProduct.productId,
      quantity: updateOrderProduct.quantity,
    })

    return data as OrderProductItem
  }

  async deleteOrderProduct(id: number, productId: number) {
    await api.delete(`${BackendURL}orders/${id}/product/${productId}`)
  }
}

export const makeOrderProductRepository = (): IOrderProductRepository => {
  return new OrderProductRepository()
}
