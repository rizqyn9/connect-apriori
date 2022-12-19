import axios, { AxiosError } from 'axios'
import { useEffect } from 'react'
import { useAuthHeader, useSignOut } from 'react-auth-kit'

const SERVER_ENDPOINT = String(import.meta.env.VITE_SERVER) ?? 'http://localhost:5000'

export const useAxios = () => {
  const axiosPrivate = axios.create({
    baseURL: SERVER_ENDPOINT,
    headers: { 'Content-Type': 'application/json' },
  })
  const auth = useAuthHeader()
  const signOut = useSignOut()
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use((config) => {
      config.headers!['Authorization'] = auth()
      return config
    })

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        console.log({ errorAxios: error })

        if (error?.response?.status === 403) {
          signOut()
          return error
        }
        if (error.isAxiosError) return error.response

        return error
      },
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor)
      axiosPrivate.interceptors.response.eject(responseInterceptor)
    }
  }, [])

  return axiosPrivate
}
