const TOKEN_KEY = 'ACCESS_TOKEN'
const REMEMBER_ME = 'REMEMBER_ME'

export function setToken(value: string) {
  localStorage.setItem(TOKEN_KEY, value)
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setRememberMe(value: string) {
  localStorage.setItem(REMEMBER_ME, value)
}

export function getRememberMe(): string | null {
  return localStorage.getItem(REMEMBER_ME)
}
