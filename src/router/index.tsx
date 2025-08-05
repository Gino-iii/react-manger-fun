// import { LazyLoad } from './LazyLoad'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Welcome from '@/views/welcome'

export const router = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    path: '/welcome',
    element: <Welcome />

  }
]
export default createBrowserRouter(router)
