import {
  CustomerItem,
  CreateCustomer,
  UpdateCustomer,
  CustomerDetail,
} from '../domains/customer.domain'
import api from '../framework/api'
import { BackendURL } from '../config'

export interface ICustomerRepository {
  getAll(pageSize: number, pageNum: number, search: string): Promise<[CustomerItem[], number]>

  getById(id: number): Promise<CustomerDetail>

  createCustomer(createUser: CreateCustomer): Promise<CustomerItem>

  updateCustomer(id: number, updateUser: UpdateCustomer): Promise<CustomerItem>

  toggleStatus(id: number): Promise<CustomerItem>

  deleteCustomer(id: number): void
}

class CustomerRepository implements ICustomerRepository {
  async getAll(
    pageSize: number,
    pageNum: number,
    search: string,
  ): Promise<[CustomerItem[], number]> {
    const { data } = await api.get(
      `${BackendURL}customers/?pageSize=${pageSize}&pageNum=${pageNum}&search=${search}`,
    )

    const [user, count] = data

    const _count: number = (count / pageSize) >> 0

    return [user as CustomerItem[], _count]
  }

  async getById(id: number): Promise<CustomerDetail> {
    const { data } = await api.get(`${BackendURL}customers/${id}`)

    return data as CustomerDetail
  }

  async createCustomer(createUser: CreateCustomer): Promise<CustomerItem> {
    const { data } = await api.post(`${BackendURL}customers/`, createUser)

    return data as CustomerItem
  }

  async updateCustomer(id: number, updateUser: UpdateCustomer): Promise<CustomerItem> {
    const { data } = await api.put(`${BackendURL}customers/${id}`, updateUser)

    return data as CustomerItem
  }

  async toggleStatus(id: number): Promise<CustomerItem> {
    const { data } = await api.patch(`${BackendURL}customers/${id}/status`)

    return data as CustomerItem
  }

  async deleteCustomer(id: number) {
    await api.delete(`${BackendURL}customers/${id}`)
  }
}

export const makeCustomerRepository = (): ICustomerRepository => {
  return new CustomerRepository()
}
