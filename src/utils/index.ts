/**
 * 通用工具函数封装
 * 提供格式化、数据处理、路径查找等常用功能
 */

import { Menu } from '@/types/api'

/**
 * 格式化金额显示
 * 将数字转换为人民币格式显示
 * @param num 要格式化的数字
 * @returns 格式化后的金额字符串，如 "¥1,234.56"
 */
export const formatMoney = (num?: number | string) => {
  if (!num) return '0.00'
  const a = parseFloat(num.toString())
  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}

/**
 * 格式化数字显示
 * 为数字添加千分位分隔符
 * @param num 要格式化的数字
 * @returns 格式化后的数字字符串，如 "1,234,567"
 */
export const formatNum = (num?: number | string) => {
  if (!num) return 0
  const a = num.toString()
  if (a.indexOf('.') > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return a.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

/**
 * 格式化日期为本地字符串
 * @param date 日期对象
 * @param rule 格式化规则
 * @returns 格式化后的日期字符串
 */
export const toLocalDate = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) curDate = date
  if (rule === 'yyyy-MM-dd') return curDate.toLocaleDateString().replaceAll('/', '-')
  if (rule === 'HH:mm:ss') return curDate.toLocaleTimeString().replaceAll('/', '-')
  return curDate.toLocaleString().replaceAll('/', '-')
}

/**
 * 自定义格式化日期
 * 支持灵活的日期格式化规则
 * @param date 日期对象或日期字符串
 * @param rule 格式化规则，如 'yyyy-MM-dd HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date?: Date | string, rule?: string) => {
  let curDate = new Date()
  if (date instanceof Date) curDate = date
  else if (date) curDate = new Date(date)

  let fmt = rule || 'yyyy-MM-dd HH:mm:ss'
  fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString())
  type OType = {
    [key: string]: number
  }
  const O: OType = {
    'M+': curDate.getMonth() + 1,
    'd+': curDate.getDate(),
    'H+': curDate.getHours(),
    'm+': curDate.getMinutes(),
    's+': curDate.getSeconds()
  }
  for (const k in O) {
    const val = O[k].toString()
    fmt = fmt.replace(new RegExp(`(${k})`), O[k] > 9 ? O[k].toString() : '0' + O[k].toString())
    // fmt = fmt.replace(new RegExp(`(${k})`), ('00' + val).substring(val.length))
  }
  return fmt
}

/**
 * 用户状态转换
 * 将数字状态码转换为中文描述
 * @param state 状态码
 * @returns 状态描述
 */
export const formatState = (state: number) => {
  if (state === 1) return '在职'
  if (state === 2) return '试用期'
  if (state === 3) return '离职'
}

/**
 * 递归获取菜单路径列表
 * 从菜单树中提取所有可访问的路径
 * @param list 菜单列表
 * @returns 路径字符串数组
 */
export const getMenuPath = (list: Menu.MenuItem[]): string[] => {
  return list.reduce((result: string[], item: Menu.MenuItem) => {
    return result.concat(Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path + '')
  }, [])
}

/**
 * 递归查找路由对象
 * 在路由配置中查找指定路径的路由对象
 * @param path 要查找的路径
 * @param routes 路由配置数组
 * @returns 找到的路由对象，未找到返回空字符串
 */
export const searchRoute: any = (path: string, routes: any = []) => {
  for (const item of routes) {
    if (item.path === path) return item
    if (item.children) {
      const result = searchRoute(path, item.children)
      if (result) return result
    }
  }
  return ''
}

/**
 * 手机号加密显示
 * 将手机号中间4位替换为星号
 * @param mobile 手机号
 * @returns 加密后的手机号，如 "176****0011"
 * @example
 * 17611000011 => 176****0011
 */
export const formateMobile = (mobile?: number) => {
  if (!mobile) return '-'
  const phone = mobile.toString()
  return phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
}

/**
 * 递归查找树节点的路径
 * 在菜单树中查找指定路径的完整路径数组
 * @param tree 菜单树
 * @param pathName 要查找的路径名
 * @param path 当前路径数组
 * @returns 完整的路径数组
 */
export const findTreeNode = (tree: Menu.MenuItem[], pathName: string, path: string[]): string[] => {
  if (!tree) return []
  for (const data of tree) {
    path.push(data.menuName)
    if (data.path === pathName) return path
    if (data.children?.length) {
      const list = findTreeNode(data.children, pathName, path)
      if (list?.length) return list
    }
    path.pop()
  }
  return []
}
