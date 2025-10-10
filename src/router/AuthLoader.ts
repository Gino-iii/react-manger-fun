import { Menu } from '@/types/api'
import api from '@/api'
import { getMenuPath } from '@/utils'
export interface IAuthLoader {
  buttonList: string[] // 权限按钮列表  
  menuList: Menu.MenuItem[] // 菜单列表
  menuPathList: string[] // 菜单路径列表
}

export default async function AuthLoader(): Promise<IAuthLoader> {
  const data = await api.getPermissionList()
  const menuPathList = getMenuPath(data.menuList)
  return {
    buttonList: data.buttonList,
    menuList: data.menuList,
    menuPathList
  }
}
