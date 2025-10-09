// import { Layout } from 'antd'
// const { Content, Sider } = Layout
import styles from './index.module.less'
import { Outlet } from 'react-router-dom'

// import { useAppSelector } from '@/store/hooks'

// const App: React.FC = () => {
//   // 从全局状态中获取用户信息
//   const userInfo = useAppSelector(state => state.auth.userInfo)

//   if (!userInfo._id) {
//     console.log('userInfo._id', userInfo._id)
//     return null
//   }

//   return (
//     <Layout >
//       <Sider className={styles.sider}>Sider</Sider>
//       <Content className={styles.content}>Content</Content>
//     </Layout>
//   )
// }

// export default App
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

const { Header, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        {/* 内容区域容器 */}
        <div className={styles.content}>
          <div className={styles.wrapper}>
            {/* 路由出口，渲染子路由组件 */}
            <Outlet></Outlet>
          </div>

        </div>
      </Layout>
    </Layout>
  );
};

export default App;
