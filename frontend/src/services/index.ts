import axios from 'axios'

const SERVER_ENDPOINT =
    String(import.meta.env.VITE_SERVER) ?? 'http://localhost:3000'

console.log(SERVER_ENDPOINT)

const api = axios.create({
    baseURL: SERVER_ENDPOINT,
})

const axiosPrivate = axios.create({
    baseURL: SERVER_ENDPOINT,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})

export default api
export { axiosPrivate }
export * from './auth.service'
