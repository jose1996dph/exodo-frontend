import {
  CategoryItem,
  CreateCategory,
  UpdateCategory,
  CategoryDetail,
} from '../domains/category.domain'
import api from '../framework/api'
import { BackendURL } from '../config'

export interface ICategoryRepository {
  getAll(
    pageNum: number,
    search: string,
    pageSize?: number,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[CategoryItem[], number]>

  getById(id: number): Promise<CategoryDetail>

  createCategory(createUser: CreateCategory): Promise<CategoryItem>

  updateCategory(id: number, updateUser: UpdateCategory): Promise<CategoryItem>

  toggleStatus(id: number): Promise<CategoryItem>

  deleteCategory(id: number): void
}

class CategoryRepository implements ICategoryRepository {
  async getAll(
    pageNum: number,
    search: string,
    pageSize?: number,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[CategoryItem[], number]> {
    let params = `pageNum=${pageNum}&search=${search}`
    if (pageSize) {
      params += `&pageSize=${pageSize}`
    }

    if (orderBy) {
      params += `&orderBy=${orderBy}`
    }

    if (orderDirection) {
      params += `&orderDirection=${orderDirection}`
    }

    const { data } = await api.get(`${BackendURL}categories/?${params}`)

    const [categories, count] = data

    let _count: number = pageSize ? (count / pageSize) >> 0 : 0

    if (pageSize && count % pageSize > 0) {
      _count += 1
    }

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

  async toggleStatus(id: number): Promise<CategoryItem> {
    const { data } = await api.patch(`${BackendURL}categories/${id}/status`)

    return data as CategoryItem
  }

  async deleteCategory(id: number) {
    await api.delete(`${BackendURL}categories/${id}`)
  }
}

export const makeCategoryRepository = (): ICategoryRepository => {
  return new CategoryRepository()
}
