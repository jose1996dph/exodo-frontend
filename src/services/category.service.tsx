import { CreateCategory, UpdateCategory } from '../domains/category.domain'
import { ICategoryRepository, makeCategoryRepository } from '../repositories/category.repository'

class CategoryService {
  private categoryRepo: ICategoryRepository = makeCategoryRepository()

  async getAll(
    pageNum: number,
    search: string,
    pageSize?: number,
    orderBy?: string,
    orderDirection?: string,
  ) {
    try {
      const categories = await this.categoryRepo.getAll(
        pageNum - 1,
        search,
        pageSize,
        orderBy,
        orderDirection,
      )
      return categories
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async getById(id: number) {
    try {
      const category = await this.categoryRepo.getById(id)
      return category
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async create(createCategory: CreateCategory) {
    try {
      const category = await this.categoryRepo.createCategory(createCategory)
      return category
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async update(id: number, updateCategory: UpdateCategory) {
    try {
      const category = await this.categoryRepo.updateCategory(id, updateCategory)
      return category
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async delete(id: number) {
    try {
      await this.categoryRepo.deleteCategory(id)
      return true
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }
}

export const makeCategoryService = (): CategoryService => new CategoryService()
