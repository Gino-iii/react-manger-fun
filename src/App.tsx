
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import UserManagement from './views/UserManagement'
import NotFound from './views/NotFound'
import { useAppSelector } from './stores/hooks'

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App 
