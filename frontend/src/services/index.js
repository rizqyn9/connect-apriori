import axios from 'axios'

// axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
})

// Handle Error
api.interceptors.response.use((response) => {
    return response
})

const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
    headers: { 'Content-Type': 'application/json' },
})

export default api
export { axiosPrivate }
export * from './auth.service'
