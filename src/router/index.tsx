import React from 'react'

import { createBrowserRouter, Navigate } from 'react-router-dom'
import Welcome from '@/views/welcome'
import Layout from '@/layout'
import Login from '@/views/Login'
import AuthLoader from './AuthLoader'
import { lazyLoad } from './LazyLoad'
export const router = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    // 主布局路由，包含权限验证和懒加载
    id: 'layout',
    element: <Layout />,
    loader: AuthLoader,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/userList',
        element: lazyLoad(React.lazy(() => import('@/views/system/user')))
      }
    ]
  }
]
export default createBrowserRouter(router)
