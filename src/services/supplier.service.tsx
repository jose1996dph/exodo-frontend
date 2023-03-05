import { CreateSupplier, UpdateSupplier } from '../domains/supplier.domain'
import { ISupplierRepository, makeSupplierRepository } from '../repositories/supplier.repository'

class SupplierService {
  [x: string]: any
  private supplierRepo: ISupplierRepository = makeSupplierRepository()

  async getAll(pageNum: number, search: string) {
    try {
      const pageSize = 10
      const suppliers = await this.supplierRepo.getAll(pageSize, pageNum - 1, search)
      return suppliers
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async getById(id: number) {
    try {
      const supplier = await this.supplierRepo.getById(id)
      return supplier
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async create(createUser: CreateSupplier) {
    try {
      const supplier = await this.supplierRepo.createSupplier(createUser)
      return supplier
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async update(id: number, updateUser: UpdateSupplier) {
    try {
      const supplier = await this.supplierRepo.updateSupplier(id, updateUser)
      return supplier
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async toggleStatus(id: number) {
    try {
      const supplier = await this.supplierRepo.toggleStatus(id)
      return supplier
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async delete(id: number) {
    try {
      await this.supplierRepo.deleteSupplier(id)
      return true
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }
}

export const makeSupplierService = (): SupplierService => new SupplierService()
