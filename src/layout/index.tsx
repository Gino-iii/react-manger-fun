// import { Layout } from 'antd'
// const { Content, Sider } = Layout
import styles from './index.module.less'
import { Outlet, useLocation, useRouteLoaderData, Navigate } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'
import { useAppDispatch } from '@/store/hooks'
// import { updateCollapsed } from '@/store/slices/uiSlice'
import React from 'react';
import { searchRoute } from '@/utils'
import { IAuthLoader } from '@/router/AuthLoader'
import { router } from '@/router'
import {

  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import NavHeader from '@/components/NavHeader'

const { Sider } = Layout;

const App: React.FC = () => {

  // 从全局状态中获取侧边栏折叠状态、用户信息和更新方法


  // 从全局状态中获取用户信息
  const userInfo = useAppSelector(state => state.auth.userInfo)
  const collapsed = useAppSelector(state => state.ui.collapsed)

  // const dispatch = useAppDispatch()
  if (!userInfo._id) {
    console.log('userInfo._id', userInfo._id)
    return null
  }
  // 获取当前路由路径
  const { pathname } = useLocation()
  // 根据当前路径查找对应的路由配置
  const route = searchRoute(pathname, router)

  const data = useRouteLoaderData('layout') as IAuthLoader
  if (route && route.meta?.auth === false) {

  } else {
    const staticPath = ['/welcome', '/403', '/404']
    if (!data.menuPathList.includes(pathname) && !staticPath.includes(pathname)) {
      return <Navigate to='/403' />
    }
  }



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


        <NavHeader />
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

export default App
