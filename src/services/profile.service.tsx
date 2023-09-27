import { ChangePassword, UpdateProfile } from '../domains/profile.domain'
import { IProfileRepository, makeProfileRepository } from '../repositories/profile.repository'

class ProfileService {
  private profileRepo: IProfileRepository = makeProfileRepository()

  async get() {
    try {
      const user = await this.profileRepo.get()
      return user
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async update(updateProfile: UpdateProfile) {
    try {
      const user = await this.profileRepo.update(updateProfile)
      return user
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async updatePassword(changePassword: ChangePassword) {
    try {
      const user = await this.profileRepo.updatePassword(changePassword)
      return user
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }
}

export const makeProfileService = (): ProfileService => new ProfileService()
