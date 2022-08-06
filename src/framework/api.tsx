import axios from 'axios'
import { BackendURL } from '../config'
import { getToken } from './helpers/auth.helper'

const token = getToken()
let headers
if (token) {
  headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
} else {
  headers = { 'Content-Type': 'application/json' }
}

console.log(BackendURL)

export const api = axios.create({
  baseURL: BackendURL || '',
  headers: headers,
})
