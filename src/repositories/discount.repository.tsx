import { CreateDiscount, DiscountItem, UpdateDiscount } from '../domains/discount.domain'
import api from '../framework/api'
import { BackendURL } from '../config'

export interface IDiscountRepository {
  getAllDiscount(
    supplierId: number,
    pageSize: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[DiscountItem[], number]>

  createDiscount(id: number, createDiscount: CreateDiscount): Promise<DiscountItem>

  updateDiscount(
    id: number,
    discountId: number,
    updateDiscount: UpdateDiscount,
  ): Promise<DiscountItem>

  deleteDiscount(id: number, discountId: number): void
}

class DiscountRepository implements IDiscountRepository {
  async getAllDiscount(
    id: number,
    pageSize: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[DiscountItem[], number]> {
    let params = `?pageSize=${pageSize}&pageNum=${pageNum}&search=${search}`

    if (orderBy) {
      params += `&orderBy=${orderBy}`
    }

    if (orderDirection) {
      params += `&orderDirection=${orderDirection}`
    }

    const { data } = await api.get(`${BackendURL}suppliers/${id}/discount/${params}`)

    const [discount, count] = data

    let _count: number = (count / pageSize) >> 0

    if (count % pageSize > 0) {
      _count += 1
    }

    return [discount as DiscountItem[], _count]
  }

  async createDiscount(id: number, createDiscount: CreateDiscount): Promise<DiscountItem> {
    const { data } = await api.post(`${BackendURL}suppliers/${id}/discount`, createDiscount)

    return data as DiscountItem
  }

  async updateDiscount(
    id: number,
    discountId: number,
    updateDiscount: UpdateDiscount,
  ): Promise<DiscountItem> {
    const { data } = await api.put(
      `${BackendURL}suppliers/${id}/discount/${discountId}`,
      updateDiscount,
    )

    return data as DiscountItem
  }

  async deleteDiscount(id: number, discountId: number) {
    await api.delete(`${BackendURL}suppliers/${id}/discount/${discountId}`)
  }
}

export const makeDiscountRepository = (): IDiscountRepository => {
  return new DiscountRepository()
}
