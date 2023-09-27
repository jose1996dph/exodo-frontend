import api from '../framework/api'
import { BackendURL } from '../config'
import { ChangePassword, ProfileDetail, UpdateProfile } from '../domains/profile.domain'

export interface IProfileRepository {
  get(): Promise<ProfileDetail>

  update(updateProfile: UpdateProfile): Promise<ProfileDetail>

  updatePassword(changePassword: ChangePassword): Promise<void>
}

class ProfileRepository implements IProfileRepository {
  async get(): Promise<ProfileDetail> {
    const { data } = await api.get(`${BackendURL}auth/profile`)

    return data as ProfileDetail
  }

  async update(updateUser: UpdateProfile): Promise<ProfileDetail> {
    const { data } = await api.put(`${BackendURL}auth/profile`, updateUser)

    return data as ProfileDetail
  }

  async updatePassword(changePassword: ChangePassword): Promise<void> {
    const { data } = await api.put(`${BackendURL}auth/profile/password`, changePassword)
  }
}

export const makeProfileRepository = (): IProfileRepository => {
  return new ProfileRepository()
}
