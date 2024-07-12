import {
  SupplierItem,
  CreateSupplier,
  UpdateSupplier,
  SupplierDetail,
} from '../domains/supplier.domain'
import api from '../framework/api'
import { BackendURL } from '../config'
import { formatUrlText } from '../framework/helpers/formatter.helper'

export interface ISupplierRepository {
  getAll(
    pageSize: number,
    pageNum: number,
    search: string,
    isActive?: boolean,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[SupplierItem[], number]>

  getById(id: number): Promise<SupplierDetail>

  createSupplier(createSupplier: CreateSupplier): Promise<SupplierItem>

  updateSupplier(id: number, updateSupplier: UpdateSupplier): Promise<SupplierItem>

  toggleStatus(id: number): Promise<SupplierItem>

  deleteSupplier(id: number): void
}

class SupplierRepository implements ISupplierRepository {
  async getAll(
    pageSize: number,
    pageNum: number,
    search: string,
    isActive?: boolean,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[SupplierItem[], number]> {
    let params = `pageSize=${pageSize}&pageNum=${pageNum}&search=${formatUrlText(search)}`

    if (orderBy) {
      params += `&orderBy=${orderBy}`
    }

    if (orderDirection) {
      params += `&orderDirection=${orderDirection}`
    }

    if (isActive !== undefined) {
      params += `&isActive=${isActive}`
    }

    const { data } = await api.get(`${BackendURL}suppliers/?${params}`)

    const [user, count] = data

    let _count: number = (count / pageSize) >> 0

    if (count % pageSize > 0) {
      _count += 1
    }

    return [user as SupplierItem[], _count]
  }

  async getById(id: number): Promise<SupplierDetail> {
    const { data } = await api.get(`${BackendURL}suppliers/${id}`)

    return data as SupplierDetail
  }

  async createSupplier(createSupplier: CreateSupplier): Promise<SupplierItem> {
    const { data } = await api.post(`${BackendURL}suppliers/`, createSupplier)

    return data as SupplierItem
  }

  async updateSupplier(id: number, updateSupplier: UpdateSupplier): Promise<SupplierItem> {
    const { data } = await api.put(`${BackendURL}suppliers/${id}`, updateSupplier)

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
