import { useLocation, useRouteLoaderData } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { IAuthLoader } from '@/router/AuthLoader'
import { Breadcrumb } from 'antd'
import { findTreeNode } from '@/utils'

export default function BreadCrumb() {
  const { pathname } = useLocation()
  const [breadList, setBreadList] = useState<(string | React.ReactNode)[]>([])
  // 权限判断
  const data = useRouteLoaderData('layout') as IAuthLoader
  useEffect(() => {
    const list = findTreeNode(data.menuList, pathname, [])
    setBreadList([<a href='/'>首页</a>, ...list])
  }, [pathname])


  return <Breadcrumb items={breadList.map(item => ({ title: item }))} style={{ marginLeft: 10 }} />
}
