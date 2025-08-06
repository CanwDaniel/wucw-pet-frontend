import axios from 'axios'
import type { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: '/api',
})

instance.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    const headers = config.headers || {}
    headers['Authorization'] = ''
    config.headers = headers
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

export default instance
