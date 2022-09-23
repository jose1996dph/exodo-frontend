import { CreateUser, UpdateUser } from '../domains/user.domain'
import { IUserRepository, makeUserRepository } from '../repositories/user.repository'

class UserService {
  [x: string]: any
  private userRepo: IUserRepository = makeUserRepository()

  async getAll(pageNum: number, search: string) {
    try {
      const pageSize = 10
      const users = await this.userRepo.getAll(pageSize, pageNum - 1, search)
      return users
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async getById(id: number) {
    try {
      const user = await this.userRepo.getById(id)
      return user
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async create(createUser: CreateUser) {
    try {
      const user = await this.userRepo.createUser(createUser)
      return user
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async update(id: number, updateUser: UpdateUser) {
    try {
      const user = await this.userRepo.updateUser(id, updateUser)
      return user
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async delete(id: number) {
    try {
      await this.userRepo.deleteUser(id)
      return true
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }
}

export const makeUserService = (): UserService => new UserService()
