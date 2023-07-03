import { CreateOrderProduct, UpdateOrderProduct } from '../domains/orderProduct.domain'
import {
  IOrderProductRepository,
  makeOrderProductRepository,
} from '../repositories/orderProduct.repository'

class OrderProductService {
  private orderProductRepo: IOrderProductRepository = makeOrderProductRepository()

  async getAll(
    id: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
  ) {
    try {
      const pageSize = 10
      const orders = await this.orderProductRepo.getAllOrderProduct(
        id,
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

  async create(id: number, createOrderProduct: CreateOrderProduct) {
    try {
      const order = await this.orderProductRepo.createOrderProduct(id, createOrderProduct)
      return order
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async update(id: number, productId: number, updateOrderProduct: UpdateOrderProduct) {
    try {
      const order = await this.orderProductRepo.updateSupplieProduct(
        id,
        productId,
        updateOrderProduct,
      )
      return order
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async delete(id: number, productId: number) {
    try {
      await this.orderProductRepo.deleteOrderProduct(id, productId)
      return true
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }
}

export const makeOrderProductService = (): OrderProductService => new OrderProductService()
