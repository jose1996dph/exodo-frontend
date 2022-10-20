import { ReactElement, useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Dashboard from './componets/pages/Dashboard'
import CreateUser from './componets/pages/CreateUser'
import EditUser from './componets/pages/EditUser'
import Login from './componets/pages/Login'
import SetPassword from './componets/pages/SetPassword'
import ForgotPassword from './componets/pages/ForgotPassword'
import CustomersPage from './componets/pages/Customers'
import CreateCustomer from './componets/pages/CreateCustomer'
import UsersPage from './componets/pages/Users'
import { getToken } from './framework/helpers/auth.helper'
import ProtectedRoute from './framework/routes/ProtectRoute'
import { UrlRoutes } from './framework/routes/routes'
import EditCustomer from './componets/pages/EditCustomer'

function App() {
  const location = useLocation()
  const [isLoged, setIsloged] = useState(getToken() !== null)

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

  const isLogedRedirectTo = (page: ReactElement) => {
    if (isLoged) {
      return <Navigate to={UrlRoutes.Dashboard} replace />
    }

    return page
  }

  return (
    <div className='App'>
      <Routes>
        <Route
          path={UrlRoutes.ForgotPassword}
          element={<>{isLogedRedirectTo(<ForgotPassword />)}</>}
        />
        <Route path={UrlRoutes.SetPassword} element={<>{isLogedRedirectTo(<SetPassword />)}</>} />
        <Route path={UrlRoutes.Login} element={<>{isLogedRedirectTo(<Login />)}</>} />
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
            path={UrlRoutes.Customers}
            element={
              <ProtectedRoute isLoged={isLoged}>
                <CustomersPage open={open} toggleDrawer={toggleDrawer} />
              </ProtectedRoute>
            }
          />

          <Route
            path={UrlRoutes.CreateCustomer}
            element={
              <ProtectedRoute isLoged={isLoged}>
                <CreateCustomer open={open} toggleDrawer={toggleDrawer} />
              </ProtectedRoute>
            }
          />

          <Route
            path={`${UrlRoutes.EditCustomer}:id`}
            element={
              <ProtectedRoute isLoged={isLoged}>
                <EditCustomer open={open} toggleDrawer={toggleDrawer} />
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

          <Route
            path={UrlRoutes.CreateUser}
            element={
              <ProtectedRoute isLoged={isLoged}>
                <CreateUser open={open} toggleDrawer={toggleDrawer} />
              </ProtectedRoute>
            }
          />

          <Route
            path={`${UrlRoutes.EditUser}:id`}
            element={
              <ProtectedRoute isLoged={isLoged}>
                <EditUser open={open} toggleDrawer={toggleDrawer} />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* <Route path='*' element={<Navigate to={UrlRoutes.Home} />} />*/}
      </Routes>
    </div>
  )
}

export default App
