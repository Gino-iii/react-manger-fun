import React from 'react'
import { Form, Input, Button, Card, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuthStore } from '@/stores/authStore'

interface LoginForm {
  username: string
  password: string
}

const Login: React.FC = () => {
  const { login } = useAuthStore()

  const onFinish = async (values: LoginForm) => {
    try {
      // 模拟登录请求
      const mockUser = {
        id: '1',
        username: values.username,
        email: 'admin@example.com',
        role: 'admin',
      }
      const mockToken = 'mock-jwt-token'
      
      login(mockUser, mockToken)
      message.success('登录成功')
    } catch (error) {
      message.error('登录失败')
    }
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Card
        title="系统登录"
        style={{ width: 400 }}
        headStyle={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}
      >
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              登录
            </Button>
          </Form.Item>
        </Form>
        
        <div style={{ textAlign: 'center', color: '#666' }}>
          <p>默认账号：admin / admin</p>
        </div>
      </Card>
    </div>
  )
}

export default Login 