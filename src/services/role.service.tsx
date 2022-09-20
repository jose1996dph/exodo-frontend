import { IRoleRepository, makeRoleRepository } from '../repositories/role.repository'

class RoleService {
  private roleRepo: IRoleRepository = makeRoleRepository()

  async getAll() {
    try {
      const roles = await this.roleRepo.getAll()
      return roles
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }
}

export const makeRoleService = (): RoleService => new RoleService()
