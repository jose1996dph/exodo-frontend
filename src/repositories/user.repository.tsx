import { UserItem, CreateUser, UpdateUser, UserDetail } from '../domains/user.domain'
import api from '../framework/api'
import { BackendURL } from '../config'
import { formatUrlText } from '../framework/helpers/formatter.helper'

export interface IUserRepository {
  getAll(
    pageSize: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[UserItem[], number]>

  getById(id: number): Promise<UserDetail>

  createUser(createUser: CreateUser): Promise<UserItem>

  updateUser(id: number, updateUser: UpdateUser): Promise<UserItem>

  toggleStatus(id: number): Promise<UserItem>

  deleteUser(id: number): void
}

class UserRepository implements IUserRepository {
  async getAll(
    pageSize: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[UserItem[], number]> {
    let params = `pageSize=${pageSize}&pageNum=${pageNum}&search=${formatUrlText(search)}`

    if (orderBy) {
      params += `&orderBy=${orderBy}`
    }

    if (orderDirection) {
      params += `&orderDirection=${orderDirection}`
    }

    const { data } = await api.get(`${BackendURL}users/?${params}`)

    const [user, count] = data

    let _count: number = (count / pageSize) >> 0

    if (count % pageSize > 0) {
      _count += 1
    }

    return [user as UserItem[], _count]
  }

  async getById(id: number): Promise<UserDetail> {
    const { data } = await api.get(`${BackendURL}users/${id}`)

    return data as UserDetail
  }

  async createUser(createUser: CreateUser): Promise<UserItem> {
    const { data } = await api.post(`${BackendURL}users/`, createUser)

    return data as UserItem
  }

  async updateUser(id: number, updateUser: UpdateUser): Promise<UserItem> {
    const { data } = await api.put(`${BackendURL}users/${id}`, updateUser)

    return data as UserItem
  }

  async toggleStatus(id: number): Promise<UserItem> {
    const { data } = await api.patch(`${BackendURL}users/${id}/status`)

    return data as UserItem
  }

  async deleteUser(id: number) {
    await api.delete(`${BackendURL}users/${id}`)
  }
}

export const makeUserRepository = (): IUserRepository => {
  return new UserRepository()
}
