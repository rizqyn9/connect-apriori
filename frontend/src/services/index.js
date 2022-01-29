import axios from 'axios'
import authHeader from './auth-header'

axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER || 'http://localhost:5000',
    headers: authHeader(),
})

export default api
export * from './auth.service'
