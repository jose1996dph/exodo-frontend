import axios, { InternalAxiosRequestConfig } from 'axios'
import { BackendURL } from '../config'
import { getToken, setToken } from './helpers/auth.helper'
import { UrlRoutes } from './routes/routes'

const token = getToken()
let headers
if (token) {
  headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
} else {
  headers = { 'Content-Type': 'application/json' }
}

const api = axios.create({
  baseURL: BackendURL || '',
  headers: headers,
})

api.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const token = getToken()
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (401 === error.response.status) {
      setToken('')
      if (!window.location.href.includes(UrlRoutes.Login)) {
        window.location.href = UrlRoutes.Login
      }
    }
    return Promise.reject(error)
  },
)

export default api
