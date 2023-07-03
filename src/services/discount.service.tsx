import { CreateDiscount, UpdateDiscount } from '../domains/discount.domain'
import { IDiscountRepository, makeDiscountRepository } from '../repositories/discount.repository'

class DiscountService {
  private discountRepo: IDiscountRepository = makeDiscountRepository()

  async getAll(
    id: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
  ) {
    try {
      const pageSize = 10
      const suppliers = await this.discountRepo.getAllDiscount(
        id,
        pageSize,
        pageNum - 1,
        search,
        orderBy,
        orderDirection,
      )
      return suppliers
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async create(id: number, createDiscount: CreateDiscount) {
    try {
      const supplier = await this.discountRepo.createDiscount(id, createDiscount)
      return supplier
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async update(id: number, discountId: number, updateDiscount: UpdateDiscount) {
    try {
      const supplier = await this.discountRepo.updateDiscount(id, discountId, updateDiscount)
      return supplier
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async delete(id: number, productId: number) {
    try {
      await this.discountRepo.deleteDiscount(id, productId)
      return true
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }
}

export const makeDiscountService = (): DiscountService => new DiscountService()
