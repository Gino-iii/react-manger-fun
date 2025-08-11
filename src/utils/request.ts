import axios from 'axios'
import { message } from 'antd'
import { store } from '@/stores'
import { showLoading, hideLoading } from '@/views/loading'
import { Result } from '@/types/api'
import storage from './storage'

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
// instance.interceptors.request.use(
//   (config) => {
//     if (config.showLoading) showLoading()
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// 响应拦截器D
instance.interceptors.response.use(
  response => {
    const data: Result = response.data
    // 隐藏loading
    hideLoading()
    if (response.config.responseType === 'blob') return response

    //处理token 过期
    if (data.code === 500001) {
      message.error(data.msg)
      storage.remove('token')
      location.href = '/login?callback=' + encodeURIComponent(location.href)

    } else if (data.code != 0) {
      // 如果配置了不显示错误信息，则直接返回数据
      if (response.config.showError === false) {
        return Promise.resolve(data)
      } else {
        message.error(data.msg)
        return Promise.reject(data)
      }
    }
    return data

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
interface IConfig {
  showLoading?: boolean
  showError?: boolean
}

export default {

  get<T>(url: string, params?: object, options: IConfig = {
    showLoading: true, showError: true
  }): Promise<T> {
    return instance.get<T>(url, { params, ...options })
  },

  post<T>(url: string, data?: object, options: IConfig = {
    showLoading: true, showError: true
  }): Promise<T> {
    return instance.post<T>(url, data, { ...options })
  },
  downloadFile(url: string, data: any, fileName = 'fileName.xlsx') {
    instance({
      url,
      data,
      method: 'post',
      responseType: 'blob'  // 设置响应类型为blo
    }).then(response => {

      const blob = new Blob([response.data], {
        type: response.data.type
      })
      // 获取文件名，优先使用响应头中的文件名
      const name = (response.headers['file-name'] as string) || fileName

      const link = document.createElement('a')

      link.download =
    })
  }
}
