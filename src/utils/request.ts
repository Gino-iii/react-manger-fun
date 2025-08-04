import axios from 'axios'
import { message } from 'antd'
import { useAuthStore } from '@/stores/authStore'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      message.error('登录已过期，请重新登录')
    } else {
      message.error(error.response?.data?.message || '请求失败')
    }
    return Promise.reject(error)
  }
)

export default request 