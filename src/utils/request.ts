import axios from 'axios'
import { message } from 'antd'
import { store } from '@/stores'
import { showLoading, hideLoading } from '@/views/loading'
const instance = axios.create({
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true,
  // 请求头配置
  headers: {
    // 接口调用码，用于API认证
    icode: '08AE8AC35F5A00E8'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (config.showLoading) showLoading()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch({ type: 'auth/logout' })
      message.error('登录已过期，请重新登录')
    } else {
      message.error(error.response?.data?.message || '请求失败')
    }
    return Promise.reject(error)
  }
)


