import { App } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'
import type { NotificationInstance } from 'antd/es/notification/interface'
import type { ModalStaticFunctions } from 'antd/es/modal/confirm'


let message: MessageInstance
let notification: NotificationInstance
let modal: Omit<ModalStaticFunctions, 'warn'>

export default () => {

  const staticFunction = App.useApp()
  // 将静态函数赋值给全局变量，供其他模块使用
  message = staticFunction.message
  modal = staticFunction.modal
  notification = staticFunction.notification


  return staticFunction
}
export { message, notification, modal }
