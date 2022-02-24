import { axiosPrivate } from '../services'
import { useEffect } from 'react'
// import useRefreshToken from './useRefreshToken'
import { useAuth } from '../context/user-context'
import { useCookies } from 'react-cookie'

const useAxiosPrivate = () => {
    // const refresh = useRefreshToken()
    const [cookies] = useCookies('token')
    const { auth } = useAuth()

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                console.log(cookies.token)
                if (!config.headers['x-access-token']) {
                    config.headers['x-access-token'] = cookies.token
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    alert('Somenthing error in axios private')
                    // prevRequest.sent = true
                    // const newAccessToken = await refresh()
                    // prevRequest.headers[
                    //     'Authorization'
                    // ] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }
    }, [
        auth,
        // refresh
    ])

    return axiosPrivate
}

export { useAxiosPrivate }
