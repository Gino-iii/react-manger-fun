import { Layout } from 'antd'
const { Content, Sider } = Layout
import styles from './index.module.less'
import { useAppSelector } from '@/store/hooks'

const App: React.FC = () => {
  // 从全局状态中获取用户信息
  const userInfo = useAppSelector(state => state.auth.userInfo)

  if (!userInfo._id) {
    console.log('userInfo._id', userInfo._id)
    return null
  }

  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider}>Sider</Sider>
      <Content className={styles.content}>Content</Content>
    </Layout>
  )
}

export default App
