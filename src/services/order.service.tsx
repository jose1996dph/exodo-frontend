import { CreateOrder, UpdateOrder } from '../domains/order.domain'
import { IOrderRepository, makeOrderRepository } from '../repositories/order.repository'

class OrderService {
  private orderRepo: IOrderRepository = makeOrderRepository()

  async getAll(pageNum: number, search: string, orderBy?: string, orderDirection?: string) {
    try {
      const pageSize = 10
      const orders = await this.orderRepo.getAll(
        pageSize,
        pageNum - 1,
        search,
        orderBy,
        orderDirection,
      )
      return orders
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async getById(id: number) {
    try {
      const order = await this.orderRepo.getById(id)
      return order
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async create(createUser: CreateOrder) {
    try {
      const order = await this.orderRepo.createOrder(createUser)
      return order
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async update(id: number, updateUser: UpdateOrder) {
    try {
      const order = await this.orderRepo.updateOrder(id, updateUser)
      return order
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async toggleStatus(id: number) {
    try {
      const order = await this.orderRepo.toggleStatus(id)
      return order
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async delete(id: number) {
    try {
      await this.orderRepo.deleteOrder(id)
      return true
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }
}

export const makeOrderService = (): OrderService => new OrderService()
