import axios from 'axios'
import authHeader from './auth-header'

axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
    headers: authHeader(),
})

// Handle Error
api.interceptors.response.use((response) => {
    return response
})

const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})

export default api
export { axiosPrivate }
export * from './auth.service'
