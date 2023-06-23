import axios from 'axios'

export function getCookie(name) {
  const value = `; ${document.cookie}`.split(`; ${name}=`)
  if (value.length === 2) return value.pop()!.split(';').shift()
  else return null
}

function deleteAllCookies() {
  document.cookie.split(';').forEach((cookie) => {
    document.cookie = `${cookie}=;expires=${new Date(0).toUTCString()}`
  })
}

const SERVER_ENDPOINT = String(import.meta.env.VITE_SERVER) ?? 'http://localhost:5000'

const api = axios.create({
  baseURL: SERVER_ENDPOINT,
  validateStatus: (status) => status < 500,
})

const axiosPrivate = axios.create({
  baseURL: SERVER_ENDPOINT,
  headers: { 'Content-Type': 'application/json' },
  validateStatus: (status) => status < 500,
})

axiosPrivate.interceptors.request.use((config) => {
  const token = getCookie('c_connect')
  if (token) config.headers!.authorization = token
  return config
})

export default api
export { axiosPrivate }
export * from './auth.service'
export * from './product.service'
export * from './transaction.service'
export * from './analytic.service'
