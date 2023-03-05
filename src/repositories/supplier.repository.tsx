import {
  SupplierItem,
  CreateSupplier,
  UpdateSupplier,
  SupplierDetail,
} from '../domains/supplier.domain'
import api from '../framework/api'
import { BackendURL } from '../config'

export interface ISupplierRepository {
  getAll(pageSize: number, pageNum: number, search: string): Promise<[SupplierItem[], number]>

  getById(id: number): Promise<SupplierDetail>

  createSupplier(createUser: CreateSupplier): Promise<SupplierItem>

  updateSupplier(id: number, updateUser: UpdateSupplier): Promise<SupplierItem>

  toggleStatus(id: number): Promise<SupplierItem>

  deleteSupplier(id: number): void
}

class SupplierRepository implements ISupplierRepository {
  async getAll(
    pageSize: number,
    pageNum: number,
    search: string,
  ): Promise<[SupplierItem[], number]> {
    const { data } = await api.get(
      `${BackendURL}suppliers/?pageSize=${pageSize}&pageNum=${pageNum}&search=${search}`,
    )

    const [user, count] = data

    const _count: number = (count / pageSize) >> 0

    return [user as SupplierItem[], _count]
  }

  async getById(id: number): Promise<SupplierDetail> {
    const { data } = await api.get(`${BackendURL}suppliers/${id}`)

    return data as SupplierDetail
  }

  async createSupplier(createUser: CreateSupplier): Promise<SupplierItem> {
    const { data } = await api.post(`${BackendURL}suppliers/`, createUser)

    return data as SupplierItem
  }

  async updateSupplier(id: number, updateUser: UpdateSupplier): Promise<SupplierItem> {
    const { data } = await api.put(`${BackendURL}suppliers/${id}`, updateUser)

    return data as SupplierItem
  }

  async toggleStatus(id: number): Promise<SupplierItem> {
    const { data } = await api.patch(`${BackendURL}suppliers/${id}/status`)

    return data as SupplierItem
  }

  async deleteSupplier(id: number) {
    await api.delete(`${BackendURL}suppliers/${id}`)
  }
}

export const makeSupplierRepository = (): ISupplierRepository => {
  return new SupplierRepository()
}
