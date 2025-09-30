import { useState } from 'react'
import styles from './index.module.less'
import { Form, Input, Button, message } from 'antd'
import api from '@/api'
import storage from '@/utils/storage'
import { useAppDispatch } from '@/store/hooks'
import { updateToken, updateUserInfo } from '@/store/slices/authSlice'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const onFinish = async (values: any) => {
    try {
      setLoading(true)

      // 1. 登录获取token
      const token = await api.login(values)
      storage.set('token', token)
      dispatch(updateToken(token))

      // 2. 获取用户信息
      const userInfo = await api.getUserInfo()
      dispatch(updateUserInfo(userInfo))

      setLoading(false)
      message.success('登录成功')

      // 3. 跳转页面
      const params = new URLSearchParams(location.search)
      setTimeout(() => {
        location.href = params.get('callback') || '/welcome'
      }, 500)

    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        {/* 登录页面标题 */}
        <div className={styles.title}>系统登录</div>
        {/* 登录表单 */}
        <div className={styles.form}>
          <Form
            name="basic"
            autoComplete="off"
            onFinish={onFinish}
          >
            <Form.Item
              name="userName"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="userPwd"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input type="password" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>

        </div>
      </div>
    </div>
  )
} 
