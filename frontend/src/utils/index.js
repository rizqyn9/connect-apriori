import axios from 'axios'

axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'

const instance = axios.create({
    baseURL: 'http://localhost:5000',
})

export default instance
