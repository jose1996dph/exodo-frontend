import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Dashboard from './componets/pages/Dashboard'
import Login from './componets/pages/Login'
import UsersPage from './componets/pages/UsersPage'
import { getToken } from './framework/helpers/auth.helper'
import ProtectedRoute from './framework/routes/ProtectRoute'
import { UrlRoutes } from './framework/routes/routes'

function App() {
  const location = useLocation()
  const [isLoged, setIsloged] = useState(true)

  const [open, setOpen] = useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  useEffect(() => {
    if (getToken()) {
      setIsloged(true)
    } else {
      setIsloged(false)
    }
  }, [location])

  return (
    <div className='App'>
      <Routes>
        <Route
          path={UrlRoutes.Login}
          element={<>{isLoged ? <Navigate to={UrlRoutes.Dashboard} replace /> : <Login />}</>}
        />
        <Route path={UrlRoutes.Home}>
          <Route
            path={UrlRoutes.Home}
            element={
              <ProtectedRoute isLoged={isLoged}>
                <Dashboard open={open} toggleDrawer={toggleDrawer} />
              </ProtectedRoute>
            }
          />

          <Route
            path={UrlRoutes.Dashboard}
            element={
              <ProtectedRoute isLoged={isLoged}>
                <Dashboard open={open} toggleDrawer={toggleDrawer} />
              </ProtectedRoute>
            }
          />

          <Route
            path={UrlRoutes.Users}
            element={
              <ProtectedRoute isLoged={isLoged}>
                <UsersPage open={open} toggleDrawer={toggleDrawer} />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path='*' element={<Navigate to={UrlRoutes.Home} />} />
      </Routes>
    </div>
  )
}

export default App
