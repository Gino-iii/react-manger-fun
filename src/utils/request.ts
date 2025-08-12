/**
 * HTTP请求工具封装
 * 基于axios封装，提供统一的请求拦截、响应拦截和错误处理
 * 支持loading状态、token认证、错误提示等功能
 */
import axios, { AxiosError } from 'axios'
import { showLoading, hideLoading } from './loading'
import storage from './storage'
import env from '@/config'
import { Result } from '@/types/api'
import { message } from '@/utils/AntdGlobal'

console.log('config', env)

// 创建axios实例，配置基础参数
const instance = axios.create({
  // 请求超时时间：8秒
  timeout: 8000,
  // 超时错误提示信息
  timeoutErrorMessage: '请求超时，请稍后再试',
  // 允许携带cookie凭证
  withCredentials: true,
  // 请求头配置
  headers: {
    // 接口调用码，用于API认证
    icode: '08AE8AC35F5A00E8'
  }
})

// 请求拦截器：在请求发送前执行
instance.interceptors.request.use(
  config => {
    // 如果配置了显示loading，则显示全局loading
    if (config.showLoading) showLoading()

    // 从本地存储获取token，并添加到请求头
    const token = storage.get('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }

    // 根据环境配置选择API基础URL
    if (env.mock) {
      // 使用mock数据接口
      config.baseURL = env.mockApi
    } else {
      // 使用真实API接口
      config.baseURL = env.baseApi
    }

    return {
      ...config
    }
  },
  // 请求错误处理
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器：在响应返回后执行
instance.interceptors.response.use(
  response => {
    const data: Result = response.data
    // 隐藏全局loading
    hideLoading()

    // 如果是文件下载请求，直接返回响应
    if (response.config.responseType === 'blob') return response

    // 处理token过期的情况
    if (data.code === 500001) {
      message.error(data.msg)
      // 清除本地存储的token
      storage.remove('token')
      // 跳转到登录页面，并记录当前页面URL
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    } else if (data.code != 0) {
      // 处理其他业务错误
      if (response.config.showError === false) {
        // 如果配置了不显示错误，则直接返回数据
        return Promise.resolve(data)
      } else {
        // 显示错误信息
        message.error(data.msg)
        return Promise.reject(data)
      }
    }

    // 成功响应，返回数据部分
    return data.data
  },
  // 响应错误处理
  error => {
    hideLoading()
    message.error(error.message)
    return Promise.reject(error.message)
  }
)

// 请求配置接口
interface IConfig {
  showLoading?: boolean  // 是否显示loading
  showError?: boolean    // 是否显示错误信息
}

// 导出请求工具对象
export default {
  /**
   * GET请求方法
   * @param url 请求地址
   * @param params 请求参数
   * @param options 请求配置选项
   * @returns Promise<T>
   */
  get<T>(url: string, params?: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
    return instance.get(url, { params, ...options })
  },

  /**
   * POST请求方法
   * @param url 请求地址
   * @param params 请求参数
   * @param options 请求配置选项
   * @returns Promise<T>
   */
  post<T>(url: string, params?: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
    return instance.post(url, params, options)
  },

  /**
   * 文件下载方法
   * @param url 下载地址
   * @param data 请求数据
   * @param fileName 默认文件名
   */
  downloadFile(url: string, data: any, fileName = 'fileName.xlsx') {
    instance({
      url,
      data,
      method: 'post',
      responseType: 'blob'  // 设置响应类型为blob
    }).then(response => {
      // 创建Blob对象
      const blob = new Blob([response.data], {
        type: response.data.type
      })
      // 获取文件名，优先使用响应头中的文件名
      const name = (response.headers['file-name'] as string) || fileName
      // 创建下载链接
      const link = document.createElement('a')
      link.download = decodeURIComponent(name)
      link.href = URL.createObjectURL(blob)
      // 触发下载
      document.body.append(link)
      link.click()
      document.body.removeChild(link)
      // 释放URL对象
      window.URL.revokeObjectURL(link.href)
    })
  }
}
