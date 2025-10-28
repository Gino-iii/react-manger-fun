import SearchForm from '@/components/SearchForm'
import { Form, Input, Select } from 'antd'
import { useEffect, useRef, useState } from 'react'

export default function UserList() {
  const [form] = Form.useForm()
  const [userIds, setUserIds] = useState<number[]>([])

  const search = {
    submit: () => {
      console.log('search')
    },
    reset: () => {
      console.log('reset')
    }
  }
  return (
    <div>
      <SearchForm form={form} initialValues={{ state: 1 }} submit={search.submit} reset={search.reset}>
        <Form.Item name='userId' label='用户ID'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Select style={{ width: 120 }}>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
      </SearchForm>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <AuthButton auth='user@create' type='primary' onClick={handleCreate}>
              新增
            </AuthButton>
            <Button type='primary' danger onClick={handlePatchConfirm}>
              批量删除
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
