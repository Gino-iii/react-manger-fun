/**
 * API接口类型定义
 * 定义所有后端接口的请求参数和响应数据的TypeScript类型
 */

// ==================== 通用类型定义 ====================

/**
 * 通用响应结果类型
 * @template T 响应数据类型
 */
export interface Result<T = any> {
	code: number    // 响应状态码
	data: T         // 响应数据
	msg: string     // 响应消息
}

/**
 * 分页响应数据类型
 * @template T 列表项数据类型
 */
export interface ResultData<T = any> {
	list: T[]       // 数据列表
	page: {
		pageNum: number   // 当前页码
		pageSize: number  // 每页大小
		total: number | 0 // 总记录数
	}
}

/**
 * 分页查询参数类型
 */
export interface PageParams {
	pageNum: number     // 页码
	pageSize?: number   // 每页大小（可选）
}

// ==================== 登录相关类型 ====================
export namespace Login {
	/**
	 * 登录请求参数
	 */
	export interface params {
		userName: string  // 用户名
		userPwd: string   // 密码
	}
}

// ==================== 用户管理相关类型 ====================
export namespace User {
	/**
	 * 用户查询参数
	 */
	export interface Params extends PageParams {
		userId?: number   // 用户ID
		userName?: string // 用户名
		state?: number    // 用户状态
	}

	/**
	 * 用户搜索参数
	 */
	export interface SearchParams {
		userId?: number
		userName?: string
		state?: number
	}

	/**
	 * 用户信息项
	 */
	export interface UserItem {
		_id: string       // 用户唯一标识
		userId: number    // 用户ID
		userName: string  // 用户名
		userEmail: string // 用户邮箱
		deptId: string    // 部门ID
		state: number     // 用户状态（1:在职 2:试用期 3:离职）
		mobile: string    // 手机号
		job: string       // 职位
		role: number      // 角色（1:超级管理员 其他:普通用户）
		roleList: string  // 角色列表
		createId: number  // 创建者ID
		deptName: string  // 部门名称
		userImg: string   // 用户头像
	}

	/**
	 * 创建用户参数
	 */
	export interface CreateParams {
		userName: string      // 用户名
		userEmail: string     // 邮箱
		mobile?: number       // 手机号
		deptId: string        // 部门ID
		job?: string          // 职位
		state?: number        // 状态
		roleList: string[]    // 角色列表
		userImg: string       // 头像
	}

	/**
	 * 编辑用户参数
	 */
	export interface EditParams extends CreateParams {
		userId: number        // 用户ID
	}
}

// ==================== 部门管理相关类型 ====================
export namespace Dept {
	/**
	 * 部门查询参数
	 */
	export interface Params {
		deptName?: string     // 部门名称
	}

	/**
	 * 创建部门参数
	 */
	export interface CreateParams {
		deptName: string      // 部门名称
		parentId?: string     // 父部门ID
		userName: string      // 负责人
	}

	/**
	 * 编辑部门参数
	 */
	export interface EditParams extends CreateParams {
		_id: string           // 部门ID
	}

	/**
	 * 删除部门参数
	 */
	export interface DelParams {
		_id: string           // 部门ID
	}

	/**
	 * 部门信息项
	 */
	export interface DeptItem {
		_id: string           // 部门ID
		createTime: string    // 创建时间
		updateTime: string    // 更新时间
		deptName: string      // 部门名称
		parentId: string      // 父部门ID
		userName: string      // 负责人
		children: DeptItem[]  // 子部门列表
	}
}

// ==================== 菜单管理相关类型 ====================
export namespace Menu {
	/**
	 * 菜单查询参数
	 */
	export interface Params {
		menuName: string      // 菜单名称
		menuState: number     // 菜单状态
	}

	/**
	 * 创建菜单参数
	 */
	export interface CreateParams {
		menuName: string      // 菜单名称
		icon?: string         // 菜单图标
		menuType: number      // 菜单类型：1-菜单 2-按钮 3-页面
		menuState: number     // 菜单状态：1-正常 2-停用
		menuCode?: string     // 按钮权限标识
		parentId?: string     // 父级菜单ID
		path?: string         // 菜单路径
		component?: string    // 组件名称
	}

	/**
	 * 菜单信息项
	 */
	export interface MenuItem extends CreateParams {
		_id: string           // 菜单ID
		createTime: string    // 创建时间
		buttons?: MenuItem[]  // 按钮列表
		children?: MenuItem[] // 子菜单列表
	}

	/**
	 * 编辑菜单参数
	 */
	export interface EditParams extends CreateParams {
		_id?: string          // 菜单ID
	}

	/**
	 * 删除菜单参数
	 */
	export interface DelParams {
		_id: string           // 菜单ID
	}
}

// ==================== 仪表板相关类型 ====================
export namespace Dashboard {
	/**
	 * 报表数据
	 */
	export interface ReportData {
		driverCount: number   // 司机数量
		totalMoney: number    // 总金额
		orderCount: number    // 订单数量
		cityNum: number       // 城市数量
	}

	/**
	 * 折线图数据
	 */
	export interface LineData {
		label: string[]       // 标签数组
		order: number[]       // 订单数量数组
		money: number[]       // 金额数组
	}

	/**
	 * 饼图数据
	 */
	export interface PieData {
		value: number         // 数值
		name: string          // 名称
	}

	/**
	 * 雷达图数据
	 */
	export interface RadarData {
		indicator: Array<{ name: string; max: number }>  // 指标配置
		data: {
			name: string        // 数据名称
			value: number[]     // 数据值数组
		}
	}
}

// ==================== 角色管理相关类型 ====================
export namespace Role {
	/**
	 * 角色查询参数
	 */
	export interface Params extends PageParams {
		roleName?: string     // 角色名称
	}

	/**
	 * 创建角色参数
	 */
	export interface CreateParams {
		roleName: string      // 角色名称
		remark?: string       // 备注
	}

	/**
	 * 角色信息项
	 */
	export interface RoleItem extends CreateParams {
		_id: string           // 角色ID
		permissionList: {
			checkedKeys: string[]       // 选中的权限
			halfCheckedKeys: string[]   // 半选中的权限
		}
		updateTime: string    // 更新时间
		createTime: string    // 创建时间
	}

	/**
	 * 编辑角色参数
	 */
	export interface EditParams extends CreateParams {
		_id: string           // 角色ID
	}

	/**
	 * 权限配置
	 */
	export interface Permission {
		_id: string           // 角色ID
		permissionList: {
			checkedKeys: string[]       // 选中的权限
			halfCheckedKeys: string[]   // 半选中的权限
		}
	}
}

// ==================== 订单管理相关类型 ====================
export namespace Order {
	/**
	 * 订单状态枚举
	 */
	export enum IState {
		doing = 1,    // 进行中
		done = 2,     // 已完成
		timeout = 3,  // 超时
		cance = 4     // 取消
	}

	/**
	 * 创建订单参数
	 */
	export interface CreateParams {
		cityName: string      // 城市名称
		userName: string      // 用户名
		mobile: number        // 手机号
		startAddress: string  // 下单开始地址
		endAddress: string    // 下单结束地址
		orderAmount: number   // 订单金额
		userPayAmount: number // 支付金额
		driverAmount: number  // 司机金额
		payType: number       // 支付方式：1-微信 2-支付宝
		driverName: string    // 司机名称
		vehicleName: string   // 订单车型
		state: IState         // 订单状态
		useTime: string       // 用车时间
		endTime: string       // 订单结束时间
	}

	/**
	 * 订单信息项
	 */
	export interface OrderItem extends CreateParams {
		_id: string           // 订单ID
		orderId: string       // 订单编号
		route: Array<{ lng: string; lat: string }>  // 行驶轨迹
		createTime: string    // 创建时间
		remark: string        // 备注
	}

	/**
	 * 订单搜索参数
	 */
	export interface SearchParams {
		orderId?: string      // 订单ID
		userName?: string     // 用户名
		state?: IState        // 订单状态
	}

	/**
	 * 订单查询参数
	 */
	export interface Params extends PageParams {
		orderId?: string      // 订单ID
		userName?: string     // 用户名
		state?: IState        // 订单状态
	}

	/**
	 * 字典项
	 */
	export interface DictItem {
		id: string            // 字典ID
		name: string          // 字典名称
	}

	/**
	 * 订单路线
	 */
	export interface OrderRoute {
		orderId: string       // 订单ID
		route: Array<{ lng: string; lat: string }>  // 路线坐标
	}

	/**
	 * 司机查询参数
	 */
	export interface DriverParams {
		driverName?: string   // 司机姓名
		accountStatus?: number // 账户状态
	}

	/**
	 * 司机状态枚举
	 */
	export enum DriverStatus {
		auth = 0,     // 待认证
		normal = 1,   // 正常
		temp = 2,     // 暂时拉黑
		always = 3,   // 永久拉黑
		stop = 4      // 停止推送
	}

	/**
	 * 司机信息项
	 */
	export interface DriverItem {
		driverName: string        // 司机名称
		driverId: number          // 司机ID
		driverPhone: string       // 司机手机号
		cityName: string          // 城市名称
		grade: boolean            // 会员等级
		driverLevel: number       // 司机等级
		accountStatus: DriverStatus // 司机状态
		carNo: string             // 车牌号
		vehicleBrand: string      // 车辆品牌
		vehicleName: string       // 车辆名称
		onlineTime: number        // 昨日在线时长
		driverAmount: number      // 昨日司机流水
		rating: number            // 司机评分
		driverScore: number       // 司机行为分
		pushOrderCount: number    // 昨日推单数
		orderCompleteCount: number // 昨日完单数
		createTime: string        // 创建时间
	}
}
