import React, { useState } from 'react'
import { Table, Button, Space, Modal, Form, Input, Select, message, Popconfirm } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

interface User {
  id: string
  username: string
  email: string
  role: string
  status: string
  createTime: string
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      role: '管理员',
      status: '启用',
      createTime: '2024-01-01',
    },
    {
      id: '2',
      username: 'user1',
      email: 'user1@example.com',
      role: '普通用户',
      status: '启用',
      createTime: '2024-01-02',
    },
  ])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [form] = Form.useForm()

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个用户吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const handleAdd = () => {
    setEditingUser(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    form.setFieldsValue(user)
    setIsModalVisible(true)
  }

  const handleDelete = (id: string) => {
    setUsers(users.filter(user => user.id !== id))
    message.success('删除成功')
  }

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingUser) {
        // 编辑用户
        setUsers(users.map(user =>
          user.id === editingUser.id ? { ...user, ...values } : user
        ))
        message.success('更新成功')
      } else {
        // 新增用户
        const newUser: User = {
          id: Date.now().toString(),
          ...values,
          createTime: new Date().toISOString().split('T')[0],
        }
        setUsers([...users, newUser])
        message.success('添加成功')
      }
      setIsModalVisible(false)
    })
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加用户
        </Button>
      </div>

      <Table columns={columns} dataSource={users} rowKey="id" />

      <Modal
        title={editingUser ? '编辑用户' : '添加用户'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select>
              <Select.Option value="管理员">管理员</Select.Option>
              <Select.Option value="普通用户">普通用户</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Select.Option value="启用">启用</Select.Option>
              <Select.Option value="禁用">禁用</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UserManagement 