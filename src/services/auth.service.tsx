import { setToken } from '../framework/helpers/auth.helper'
import { IAuthRepository, makeAuthRepository } from '../repositories/auth.repository'

class AuthService {
  private authRepo: IAuthRepository = makeAuthRepository()

  async login(email: string, password: string) {
    try {
      const token = await this.authRepo.login(email, password)
      setToken(token.accessToken)
      return token
    } catch ({ response: { data } }) {
      console.error(data)
      throw data
    }
  }
}

export const makeAuthService = (): AuthService => new AuthService()
