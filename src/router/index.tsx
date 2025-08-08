// import { LazyLoad } from './LazyLoad'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Welcome from '@/views/welcome'
import Layout from '@/layout'
import Login from '@/views/Login'

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
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      }
    ]
  }
]
export default createBrowserRouter(router)
