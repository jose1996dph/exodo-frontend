import { CreateSupplierProduct, UpdateSupplierProduct } from '../domains/supplierProduct.domain'
import {
  ISupplierProductRepository,
  makeSupplierProductRepository,
} from '../repositories/supplierProduct.repository'

class SupplierProductService {
  private supplierProductRepo: ISupplierProductRepository = makeSupplierProductRepository()

  async getAll(id: number, pageNum: number, search: string) {
    try {
      const pageSize = 10
      const suppliers = await this.supplierProductRepo.getAllSupplierProduct(
        id,
        pageSize,
        pageNum - 1,
        search,
      )
      return suppliers
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async create(id: number, createSupplierProduct: CreateSupplierProduct) {
    try {
      const supplier = await this.supplierProductRepo.createSupplierProduct(
        id,
        createSupplierProduct,
      )
      return supplier
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async update(id: number, productId: number, updateSupplierProduct: UpdateSupplierProduct) {
    try {
      const supplier = await this.supplierProductRepo.updateSupplieProduct(
        id,
        productId,
        updateSupplierProduct,
      )
      return supplier
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async delete(id: number, productId: number) {
    try {
      await this.supplierProductRepo.deleteSupplierProduct(id, productId)
      return true
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }
}

export const makeSupplierProductService = (): SupplierProductService => new SupplierProductService()
