import api from './index'

export async function signInService(data) {
    try {
        return await api.post('/auth/signin', data).then((val) => {
            if (val.data.status === 'success') {
                localStorage.setItem(
                    'token',
                    JSON.stringify(val.data.data.token)
                )
                localStorage.setItem('user', JSON.stringify(val.data.data.user))
                return val.data
            } else throw new Error('Fail')
        })
    } catch (e) {
        console.log(e)
    }
}

export async function signUpService(data) {
    try {
        return await api.post('/auth/signup', data).then((val) => val.data)
    } catch (e) {
        console.log(e)
    }
}

export const logout = () => {
    localStorage.removeItem('user')
}

export const getToken = () => {
    return localStorage.getItem('token')
}

export const getCurrentUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user'))
    } catch (e) {
        console.log(e)
        console.log('logout')
        logout()
    }
}

export const validateToken = async () => {
    try {
        return await api
            .post('/auth/validate', { token: getToken() })
            .then((val) => val.data)
    } catch (e) {
        console.log(e)
    }
}
