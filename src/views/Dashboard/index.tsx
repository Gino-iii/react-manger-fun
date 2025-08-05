import React from 'react'
import { Row, Col, Card, Statistic, Table, Tag } from 'antd'
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  EyeOutlined,
} from '@ant-design/icons'

const Dashboard: React.FC = () => {
  const recentOrders = [
    {
      key: '1',
      orderNo: 'ORD001',
      customer: '张三',
      amount: 299.00,
      status: '已完成',
      date: '2024-01-15',
    },
    {
      key: '2',
      orderNo: 'ORD002',
      customer: '李四',
      amount: 599.00,
      status: '处理中',
      date: '2024-01-14',
    },
    {
      key: '3',
      orderNo: 'ORD003',
      customer: '王五',
      amount: 199.00,
      status: '待付款',
      date: '2024-01-13',
    },
  ]

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '客户',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `¥${amount.toFixed(2)}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === '已完成' ? 'green' : status === '处理中' ? 'blue' : 'orange'
        return <Tag color={color}>{status}</Tag>
      },
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
  ]

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>仪表盘</h2>
      
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总订单数"
              value={93}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总收入"
              value={11280}
              prefix={<DollarOutlined />}
              suffix="元"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日访问"
              value={1128}
              prefix={<EyeOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="最近订单" extra={<a href="#">查看全部</a>}>
        <Table
          columns={columns}
          dataSource={recentOrders}
          pagination={false}
          size="small"
        />
      </Card>
    </div>
  )
}

export default Dashboard 