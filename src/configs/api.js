import axios from 'axios'
import { getNewToken } from 'services/tokenl'
import { cookies } from 'src/utils/cookie'
import { getCookie } from 'utils/cookie'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (request) => {
    const token = getCookie('accessToken')
    if (token) {
      request.headers['Authorization'] = `bearer ${token}`
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const res = await getNewToken()
      if (!res?.response) return
      cookies(res.response.data)
      return api(originalRequest)
    }
  }
)
export default api
