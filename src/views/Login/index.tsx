import { useState } from 'react'
import styles from './index.module.less'
import { Form, Input, Button } from 'antd'
// import { UserOutlined, LockOutlined } from '@ant-design/icons'
// import { useAppDispatch } from '@/stores/hooks'
// import { login } from '@/stores/slices/authSlice'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const onFinish = (values: any) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    console.log('Success:', values)
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
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="userPwd"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input placeholder="请输入密码" />
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
