/**
 * 全局类型声明文件
 * 扩展Window对象的类型定义，添加第三方库的类型支持
 */

/**
 * 扩展Window接口，添加百度地图相关库的类型定义
 */
interface Window {
	// 百度地图GL版本主库
	BMapGL: {
		[propName: string]: any  // 允许任意属性
	}
	// 百度地图GL扩展库
	BMapGLLib: any
	// 百度地图传统版本库
	BMapLib: any
}
