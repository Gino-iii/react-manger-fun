import { Layout } from 'antd'
const { Content, Sider } = Layout
import styles from './index.module.less'


const App: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider}>Sider</Sider>
      <Content className={styles.content}>Content</Content>
    </Layout>
  )
}

export default App
