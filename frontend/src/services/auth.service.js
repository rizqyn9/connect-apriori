import api from './index'

export async function signInService(data) {
    try {
        return await api.post('/auth/signin', data).then((val) => val.data)
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
