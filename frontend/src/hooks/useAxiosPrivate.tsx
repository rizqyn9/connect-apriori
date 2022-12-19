import { axiosPrivate } from '../services'
import { useEffect } from 'react'

const useAxiosPrivate = () => {
  useEffect(
    () => {
      const requestIntercept = axiosPrivate.interceptors.request.use(
        (config) => {
          return { data: 'asdasd', ...config }
        },
        (error) => Promise.reject(error),
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
            // return axiosPrivate(prevRequest)
          }
          return Promise.reject(error)
        },
      )

      return () => {
        axiosPrivate.interceptors.request.eject(requestIntercept)
        axiosPrivate.interceptors.response.eject(responseIntercept)
      }
    },
    [
      // cookies,
      // refresh
    ],
  )

  return axiosPrivate
}

export { useAxiosPrivate }
