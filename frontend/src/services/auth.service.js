import api from './index'

export async function signInService(data) {
    return await api
        .post('/auth/signin', data)
        .then((val) => val.data)
        .catch((err) => {
            return { error: 'Server error' }
        })
}

export async function signUpService(data) {
    console.log(data)
    return await api
        .post('/auth/signup', data)
        .then((val) => val.data)
        .catch((err) => {
            console.log(err)
            return { error: 'Server error' }
        })
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
