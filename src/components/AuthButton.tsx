import { useRouteLoaderData } from 'react-router-dom'
import { IAuthLoader } from '@/router/AuthLoader'
import { useAppSelector } from '@/store/hooks'
import { Button } from 'antd'
export default function AuthButton(props: any) {
  const userInfo = useAppSelector(state => state.auth.userInfo)
  const data = useRouteLoaderData('layout') as IAuthLoader
  const role = userInfo.role

  if (!props.auth) return <Button {...props}>{props.children}</Button>

  if (data.buttonList.includes(props.auth) || role == 1) {
    return <Button {...props}>{props.children}</Button>
  }
  return <></>
}
