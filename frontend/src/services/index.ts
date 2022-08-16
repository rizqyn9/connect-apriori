import axios from 'axios'
import { useOrderStore } from '../hooks/useOrder'
import { useProductStore } from '../hooks/useProducts'
import { useAuthStore } from '../hooks/useAuth'

const SERVER_ENDPOINT = String(import.meta.env.VITE_SERVER) ?? 'http://localhost:5000'

console.log(SERVER_ENDPOINT)

const api = axios.create({
    baseURL: SERVER_ENDPOINT,
})

const axiosPrivate = axios.create({
    baseURL: SERVER_ENDPOINT,
    //  Snippet for adding the token
    headers: { 'Content-Type': 'application/json' },
})

export default api
export { axiosPrivate }
export * from './auth.service'
