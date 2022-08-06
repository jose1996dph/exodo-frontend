import { api } from '../framework/api'

import { BackendURL } from '../config'
import { Token } from '../domains/token.domain'

export interface IAuthRepository {
  login(email: string, password: string): Promise<Token>

  logout(): void
}

class AuthRepository implements IAuthRepository {
  async login(email: string, password: string) {
    const { data } = await api.post(`${BackendURL}auth/login`, { email, password })

    api.defaults.headers.common = { Authorization: `bearer ${data.access_token}` }

    return data as Token
  }

  logout() {
    /** TODO: create logout */
  }
}

export const makeAuthRepository = (): IAuthRepository => {
  return new AuthRepository()
}
