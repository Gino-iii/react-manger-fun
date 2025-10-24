import { Form, Space, Button } from 'antd'


export default function SearchForm(props: any) {
  return (
    <Form className='search-form' form={props.form} layout='inline' initialValues={props.initialValues}>
      {props.children}
      <Form.Item >
        <Space>
          <Button type="primary" onClick={props.submit}>
            Search
          </Button>
          <Button onClick={props.reset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
