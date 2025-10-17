import styles from './index.module.less'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { useAppSelector } from '@/store/hooks'
import { useAppDispatch } from '@/store/hooks'
import { updateCollapsed, updateTheme } from '@/store/slices/uiSlice'
import storage from '@/utils/storage'
import { Switch, Dropdown } from 'antd'
import BreadCrumb from './BreadCrumb'

const NavHeader = () => {

  const collapsed = useAppSelector(state => state.ui.collapsed)
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector(state => state.auth.userInfo)
  // 切换主题
  const handleSwitch = (checked: boolean) => {

    if (checked) {
      document.documentElement.classList.add('dark')
      document.documentElement.dataset.theme = 'dark'

    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.dataset.theme = 'light'
    }

    storage.set('isDark', checked)
    dispatch(updateTheme(checked))

  }
  // 用户下拉菜单配置
  const items = [
    {
      key: 'email',
      label: '邮箱：' + userInfo.userEmail
    },
    {
      key: 'logout',
      label: '退出'
    }
  ]

  const handleMenuClick = (e: any) => {
    if (e.key === 'logout') {
      storage.remove('token')
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    }
  }
  return (
    <div className={styles.navHeader}>
      {/* 左侧区域：菜单按钮和面包屑 */}
      <div className={styles.left}>
        <div onClick={() => dispatch(updateCollapsed())}>
          {collapsed ? <MenuUnfoldOutlined rev={undefined} /> : <MenuFoldOutlined rev={undefined} />}
        </div>
        {/* 面包屑导航组件 */}
        <BreadCrumb />
        {/* 右侧区域 */}
        <div className='right'>
          <Switch checkedChildren='暗黑'
            unCheckedChildren='默认'
            style={{ marginRight: 10 }}
            onChange={handleSwitch}
          />
          <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
            <span className={styles.nickName}>{userInfo.userName}</span>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default NavHeader
