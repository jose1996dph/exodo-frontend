import { RoleItem } from '../domains/role.domain'
import api from '../framework/api'
import { BackendURL } from '../config'

export interface IRoleRepository {
  getAll(): Promise<RoleItem[]>
}

class RoleRepository implements IRoleRepository {
  async getAll(): Promise<RoleItem[]> {
    const { data } = await api.get(`${BackendURL}roles/`)

    return data as RoleItem[]
  }
}

export const makeRoleRepository = (): IRoleRepository => {
  return new RoleRepository()
}
