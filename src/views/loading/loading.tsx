import { Spin } from 'antd'
import './loading.less'

export default function Loading({ tip = 'loading...' }: { tip?: string }) {
  return <Spin className="request-loading" size="large" tip={tip} />
}
