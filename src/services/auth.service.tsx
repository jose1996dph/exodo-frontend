import { setToken } from '../framework/helpers/auth.helper'
import { IAuthRepository, makeAuthRepository } from '../repositories/auth.repository'

class AuthService {
  private authRepo: IAuthRepository = makeAuthRepository()

  async setPassword(token: string, password: string, confirmPassword: string) {
    try {
      return await this.authRepo.setPassword(token, password, confirmPassword)
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async login(email: string, password: string) {
    try {
      const token = await this.authRepo.login(email, password)
      setToken(token.accessToken)
      return token
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async logout() {
    try {
      setToken(null)
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async forgotPassword(email: string) {
    try {
      return await this.authRepo.forgotPassword(email)
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }
}

export const makeAuthService = (): AuthService => new AuthService()
