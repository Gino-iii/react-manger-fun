import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import UserManagement from './pages/UserManagement'
import NotFound from './pages/NotFound'
import { useAuthStore } from './stores/authStore'

function App() {
  const { isAuthenticated } = useAuthStore()

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
