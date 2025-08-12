/**
 * 全局Loading状态管理工具
 * 使用计数器模式管理多个并发请求的loading状态
 * 确保所有请求完成后才隐藏loading
 */
import './loading.less'

// 请求计数器，用于管理多个并发请求
let count = 0

/**
 * 显示全局Loading
 * 使用计数器确保多个并发请求时loading不会提前消失
 */
export const showLoading = () => {
	if (count === 0) {
		// 当计数器为0时，显示loading元素
		const loading = document.getElementById('loading')
		loading?.style.setProperty('display', 'flex')
	}
	count++  // 计数器加1
}

/**
 * 隐藏全局Loading
 * 只有当所有请求都完成时才隐藏loading
 */
export const hideLoading = () => {
	count--  // 计数器减1
	if (count === 0) {
		// 当计数器归零时，隐藏loading元素
		const loading = document.getElementById('loading')
		loading?.style.setProperty('display', 'none')
	}
}
