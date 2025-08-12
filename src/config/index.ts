/**
 * 环境配置封装
 * 管理不同环境（开发、测试、生产）的API地址和其他配置
 */

// 环境类型定义
type ENV = 'dev' | 'stg' | 'prd'

// 根据域名自动判断环境的逻辑（已注释）
// let env: ENV = 'dev'
// if (location.host.indexOf('localhost') > -1) {
//   env = 'dev'
// } else if (location.host === 'driver-stg.marsview.cc') {
//   env = 'stg'
// } else {
//   env = 'prd'
// }

// 从HTML元素的data-env属性获取环境配置，默认为stg
const env = (document.documentElement.dataset.env as ENV) || 'stg'

// 不同环境的配置对象
const config = {
  // 开发环境配置
  dev: {
    baseApi: '/api',  // 基础API地址
    uploadApi: 'http://api-driver-dev.marsview.cc',  // 文件上传API地址
    cdn: 'http://xxx.aliyun.com',  // CDN地址
    mock: false,  // 是否使用mock数据
    mockApi: 'https://www.fastmock.site/mock/5841b82d5672783b6fd62bb2a06aeb1f/api'  // Mock API地址
  },
  // 测试环境配置
  stg: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-stg.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https://www.fastmock.site/mock/5841b82d5672783b6fd62bb2a06aeb1f/api'
  },
  // 生产环境配置
  prd: {
    baseApi: '/api',
    uploadApi: 'http://api-driver.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https://www.fastmock.site/mock/5841b82d5672783b6fd62bb2a06aeb1f/api'
  }
}

// 导出当前环境的配置
export default {
  env,  // 当前环境标识
  ...config['prd']  // 使用生产环境配置（可根据需要修改为动态选择）
}
