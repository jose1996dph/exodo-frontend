import api from '../framework/api'

import { BackendURL } from '../config'
import { Token } from '../domains/token.domain'

export interface IAuthRepository {
  setPassword(token: string, password: string, confirmPassword: string): void

  login(email: string, password: string): Promise<Token>

  forgotPassword(email: string): void

  logout(): void
}

class AuthRepository implements IAuthRepository {
  async login(email: string, password: string) {
    const { data } = await api.post(`${BackendURL}auth/login`, { email, password })

    api.defaults.headers.common = { Authorization: `bearer ${data.access_token}` }

    return data as Token
  }

  async forgotPassword(email: string) {
    const { data } = await api.post(`${BackendURL}forgot`, { email })

    return data
  }

  async setPassword(token: string, password: string, confirmPassword: string) {
    await api.post(`${BackendURL}reset/${token}`, { password, confirmPassword })
  }

  logout() {
    /** TODO: create logout */
  }
}

export const makeAuthRepository = (): IAuthRepository => {
  return new AuthRepository()
}
