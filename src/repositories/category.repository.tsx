import {
  CategoryItem,
  CreateCategory,
  UpdateCategory,
  CategoryDetail,
} from '../domains/category.domain'
import api from '../framework/api'
import { BackendURL } from '../config'

export interface ICategoryRepository {
  getAll(pageNum: number, search: string, pageSize?: number): Promise<[CategoryItem[], number]>

  getById(id: number): Promise<CategoryDetail>

  createCategory(createUser: CreateCategory): Promise<CategoryItem>

  updateCategory(id: number, updateUser: UpdateCategory): Promise<CategoryItem>

  deleteCategory(id: number): void
}

class CategoryRepository implements ICategoryRepository {
  async getAll(
    pageNum: number,
    search: string,
    pageSize?: number,
  ): Promise<[CategoryItem[], number]> {
    let url = `${BackendURL}categories/?pageNum=${pageNum}&search=${search}`
    if (pageSize) {
      url += `&pageSize=${pageSize}`
    }

    const { data } = await api.get(url)

    const [categories, count] = data

    const _count: number = pageSize ? (count / pageSize) >> 0 : 0

    return [categories as CategoryItem[], _count]
  }

  async getById(id: number): Promise<CategoryDetail> {
    const { data } = await api.get(`${BackendURL}categories/${id}`)

    return data as CategoryDetail
  }

  async createCategory(createUser: CreateCategory): Promise<CategoryItem> {
    const { data } = await api.post(`${BackendURL}categories/`, createUser)

    return data as CategoryItem
  }

  async updateCategory(id: number, updateUser: UpdateCategory): Promise<CategoryItem> {
    const { data } = await api.put(`${BackendURL}categories/${id}`, updateUser)

    return data as CategoryItem
  }

  async deleteCategory(id: number) {
    await api.delete(`${BackendURL}categories/${id}`)
  }
}

export const makeCategoryRepository = (): ICategoryRepository => {
  return new CategoryRepository()
}
