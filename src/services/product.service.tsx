import { CreateProduct, UpdateProduct } from '../domains/product.domain'
import { IProductRepository, makeProductRepository } from '../repositories/product.repository'

class ProductService {
  private productRepo: IProductRepository = makeProductRepository()

  async getAll(pageNum: number, search: string, notSupplierId = 0) {
    try {
      const pageSize = 10
      const products = await this.productRepo.getAll(pageSize, pageNum - 1, search, notSupplierId)
      return products
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async getById(id: number) {
    try {
      const product = await this.productRepo.getById(id)
      return product
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async create(createProduct: CreateProduct) {
    try {
      const product = await this.productRepo.createProduct(createProduct)
      return product
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async update(id: number, updateProduct: UpdateProduct) {
    try {
      const product = await this.productRepo.updateProduct(id, updateProduct)
      return product
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async toggleStatus(id: number) {
    try {
      const product = await this.productRepo.toggleStatus(id)
      return product
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }

  async delete(id: number) {
    try {
      await this.productRepo.deleteProduct(id)
      return true
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }
}

export const makeProductService = (): ProductService => new ProductService()
