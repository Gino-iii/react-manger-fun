import styles from './index.module.less'
import {
  useNavigate, useRouteLoaderData
} from 'react-router-dom'

import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import { Menu, MenuProps } from 'antd'
import { useState, useEffect } from 'react'
import { Menu as IMenu } from '@/types/api'
import * as Icons from '@ant-design/icons'
const SideMenu = () => {
  type MenuItem = Required<MenuProps>['items'][number]

  const [menuList, setMenuList] = useState<MenuProps['items']>([])

  const navigate = useNavigate()
  const handleClickLogo = () => {
    navigate('/welcome')
  }
  // 从vuex中获取collapsed
  const collapsed = useAppSelector((state: RootState) => state.ui.collapsed)
  const data: any = useRouteLoaderData('layout')
  /**
   * 生成菜单项配置
   * @param label 菜单标签
   * @param key 菜单键值
   * @param icon 菜单图标
   * @param children 子菜单
   * @returns 菜单项配置对象
   */
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children
    } as MenuItem
  }
  function createIcon(name: string) {
    if (!name) return <></>

  }

  const getTreeMenu = (menuList: IMenu.MenuItem[], treeList: MenuItem[] = []) => {
    menuList.forEach((item, index) => {
      // 只处理菜单类型为1且状态为1的菜单项
      if (item.menuType === 1 && item.menuState === 1) {
        // 如果没有子菜单或有按钮权限，则作为叶子节点
        if (!item?.children?.length || item.buttons) return treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon)))
        // 有子菜单时，递归处理子菜单
        treeList.push(
          getItem(item.menuName, item.path || index, createIcon(item.icon), getTreeMenu(item.children || []))
        )
      }
    })
    return treeList
  }
  const
    useEffect(() => {
      const treeMenuList = getTreeMenu(data.menuList)
      setMenuList(treeMenuList)
      // setSelectedKeys([pathname])
    }, [menuList])

  return (
    <div className={styles.navSide}>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src="/images/logo.png" className={styles.img} />
        {collapsed ? '' : <span> 慕慕货运</span>}
      </div>
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={['1']}
        items={menuList}
      />
    </div>
  )
}

export default SideMenu
