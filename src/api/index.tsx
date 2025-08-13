/**
 * API接口统一管理
 * 封装所有后端接口调用，按功能模块分类
 */
import request from '@/utils/request'
import { Dashboard, Dept, Login, Menu, ResultData, User } from '@/types/api'

export default {
  // ==================== 用户认证相关 ====================
  /**
   * 用户登录
   * @param params 登录参数（用户名、密码等）
   * @returns 登录token
   */
  login(params: Login.params) {
    return request.post<string>('/users/login', params, { showLoading: false })
  },

  /**
   * 获取当前用户信息
   * @returns 用户详细信息
   */
  getUserInfo() {
    return request.get<User.UserItem>('/users/getUserInfo')
  },

  /**
   * 获取用户权限列表
   * @returns 包含按钮权限和菜单权限的权限数据
   */
  getPermissionList() {
    return request.get<{ buttonList: string[]; menuList: Menu.MenuItem[] }>('/users/getPermissionList')
  },

  // ==================== 工作台/仪表板相关 ====================
  /**
   * 获取工作台汇总数据
   * @returns 统计数据（订单数、用户数等）
   */
  getReportData() {
    return request.get<Dashboard.ReportData>('/order/dashboard/getReportData')
  },

  /**
   * 获取折线图数据
   * @returns 时间序列数据
   */
  getLineData() {
    return request.get<Dashboard.LineData>('/order/dashboard/getLineData')
  },

  /**
   * 获取城市分布数据（饼图）
   * @returns 城市分布统计
   */
  getPieCityData() {
    return request.get<Dashboard.PieData[]>('/order/dashboard/getPieCityData')
  },

  /**
   * 获取年龄分布数据（饼图）
   * @returns 年龄分布统计
   */
  getPieAgeData() {
    return request.get<Dashboard.PieData[]>('/order/dashboard/getPieAgeData')
  },

  /**
   * 获取雷达图数据
   * @returns 多维度统计数据
   */
  getRadarData() {
    return request.get<Dashboard.RadarData>('/order/dashboard/getRadarData')
  },

  // ==================== 用户管理相关 ====================
  /**
   * 获取用户列表（支持分页和搜索）
   * @param params 查询参数
   * @returns 分页用户列表
   */
  getUserList(params: User.Params) {
    return request.get<ResultData<User.UserItem>>('/users/list', params)
  },

  /**
   * 创建新用户
   * @param params 用户创建参数
   * @returns 创建结果
   */
  createUser(params: User.CreateParams) {
    return request.post('/users/create', params)
  },

  /**
   * 编辑用户信息
   * @param params 用户编辑参数
   * @returns 编辑结果
   */
  editUser(params: User.EditParams) {
    return request.post('/users/edit', params)
  },

  /**
   * 删除和批量删除用户
   * @param params 要删除的用户ID数组
   * @returns 删除结果
   */
  delUser(params: { userIds: number[] }) {
    return request.post('/users/delete', params)
  },

  // ==================== 部门管理相关 ====================
  /**
   * 获取部门列表
   * @param params 查询参数
   * @returns 部门列表
   */
  getDeptList(params?: Dept.Params) {
    return request.get<Dept.DeptItem[]>('/dept/list', params)
  },

  /**
   * 获取当前账号下的所有用户（用于部门分配）
   * @returns 所有用户列表
   */
  getAllUserList() {
    return request.get<User.UserItem[]>('/users/all/list')
  },

  /**
   * 创建新部门
   * @param params 部门创建参数
   * @returns 创建结果
   */
  createDept(params: Dept.CreateParams) {
    return request.post('/dept/create', params)
  },

  /**
   * 修改部门信息
   * @param params 部门编辑参数
   * @returns 编辑结果
   */
  eidtDept(params: Dept.EditParams) {
    return request.post('/dept/edit', params)
  },

  /**
   * 删除部门
   * @param params 部门删除参数
   * @returns 删除结果
   */
  deleteDept(params: Dept.DelParams) {
    return request.post('/dept/delete', params)
  },

  // ==================== 菜单管理相关 ====================
  /**
   * 获取菜单列表
   * @param params 查询参数
   * @returns 菜单列表
   */
  getMenuList(params?: Menu.Params) {
    return request.get<Menu.MenuItem[]>('/menu/list', params)
  },

  /**
   * 创建新菜单
   * @param params 菜单创建参数
   * @returns 创建结果
   */
  createMenu(params: Menu.CreateParams) {
    return request.post('/menu/create', params)
  },

  /**
   * 编辑菜单信息
   * @param params 菜单编辑参数
   * @returns 编辑结果
   */
  editMenu(params: Menu.EditParams) {
    return request.post('/menu/edit', params)
  },

  /**
   * 删除菜单
   * @param params 菜单删除参数
   * @returns 删除结果
   */
  deleteMenu(params: Menu.DelParams) {
    return request.post('/menu/delete', params)
  }
}
