import { CreateCustomer, UpdateCustomer } from '../domains/customer.domain'
import { ICustomerRepository, makeCustomerRepository } from '../repositories/customer.repository'

class CustomerService {
  private customerRepo: ICustomerRepository = makeCustomerRepository()

  async getAll(pageNum: number, search: string) {
    try {
      const pageSize = 10
      const customers = await this.customerRepo.getAll(pageSize, pageNum - 1, search)
      return customers
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async getById(id: number) {
    try {
      const customer = await this.customerRepo.getById(id)
      return customer
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async create(createUser: CreateCustomer) {
    try {
      const customer = await this.customerRepo.createCustomer(createUser)
      return customer
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async update(id: number, updateUser: UpdateCustomer) {
    try {
      const customer = await this.customerRepo.updateCustomer(id, updateUser)
      return customer
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async toggleStatus(id: number) {
    try {
      const customer = await this.customerRepo.toggleStatus(id)
      return customer
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async delete(id: number) {
    try {
      await this.customerRepo.deleteCustomer(id)
      return true
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }
}

export const makeCustomerService = (): CustomerService => new CustomerService()
