import { OrderItem, CreateOrder, UpdateOrder, OrderDetail } from '../domains/order.domain'
import api from '../framework/api'
import { BackendURL } from '../config'
import { formatUrlText } from '../framework/helpers/formatter.helper'

export interface IOrderRepository {
  getAll(
    pageSize: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[OrderItem[], number]>

  getById(id: number): Promise<OrderDetail>

  createOrder(createOrder: CreateOrder): Promise<OrderItem>

  updateOrder(id: number, updateOrder: UpdateOrder): Promise<OrderItem>

  toggleStatus(id: number): Promise<OrderItem>

  deleteOrder(id: number): void
}

class OrderRepository implements IOrderRepository {
  async getAll(
    pageSize: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[OrderItem[], number]> {
    let params = `pageSize=${pageSize}&pageNum=${pageNum}&search=${formatUrlText(search)}`

    if (orderBy) {
      params += `&orderBy=${orderBy}`
    }

    if (orderDirection) {
      params += `&orderDirection=${orderDirection}`
    }

    const { data } = await api.get(`${BackendURL}orders/?${params}`)

    const [user, count] = data

    let _count: number = (count / pageSize) >> 0

    if (count % pageSize > 0) {
      _count += 1
    }

    return [user as OrderItem[], _count]
  }

  async getById(id: number): Promise<OrderDetail> {
    const { data } = await api.get(`${BackendURL}orders/${id}`)

    return data as OrderDetail
  }

  async createOrder(createOrder: CreateOrder): Promise<OrderItem> {
    const { data } = await api.post(`${BackendURL}orders/`, createOrder)

    return data as OrderItem
  }

  async updateOrder(id: number, updateOrder: UpdateOrder): Promise<OrderItem> {
    const { data } = await api.put(`${BackendURL}orders/${id}`, updateOrder)

    return data as OrderItem
  }

  async toggleStatus(id: number): Promise<OrderItem> {
    const { data } = await api.patch(`${BackendURL}orders/${id}/status`)

    return data as OrderItem
  }

  async deleteOrder(id: number) {
    await api.delete(`${BackendURL}orders/${id}`)
  }
}

export const makeOrderRepository = (): IOrderRepository => {
  return new OrderRepository()
}
