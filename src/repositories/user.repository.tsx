import { UserItem, CreateUser, UpdateUser, UserDetail } from '../domains/user.domain'
import api from '../framework/api'
import { BackendURL } from '../config'

export interface IUserRepository {
  getAll(): Promise<UserItem[]>

  getById(id: number): Promise<UserDetail>

  createUser(createUser: CreateUser): Promise<UserItem>

  updateUser(id: number, updateUser: UpdateUser): Promise<UserItem>

  deleteUser(id: number): void
}

class UserRepository implements IUserRepository {
  async getAll(): Promise<UserItem[]> {
    const { data } = await api.get(`${BackendURL}users/`)

    return data as UserItem[]
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

  async deleteUser(id: number) {
    await api.delete(`${BackendURL}users/${id}`)
  }
}

export const makeUserRepository = (): IUserRepository => {
  return new UserRepository()
}
