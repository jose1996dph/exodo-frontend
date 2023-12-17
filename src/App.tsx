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
import EditSupplier from './componets/pages/EditSupplier'
import CreateSupplier from './componets/pages/CreateSupplier'
import SuppliersPage from './componets/pages/Suppliers'
import CreateProduct from './componets/pages/CreateProduct'
import EditProduct from './componets/pages/EditProduct'
import ProductsPage from './componets/pages/Products'
import CategoriesPage from './componets/pages/Categories'
import CreateCategory from './componets/pages/CreateCategory'
import EditCategory from './componets/pages/EditCategory'
import SupplierPage from './componets/pages/Supplier'
import CreateOrder from './componets/pages/CreateOrder'
import Order from './componets/pages/Order'
import OrdersPage from './componets/pages/Orders'
import CreateInvoice from './componets/pages/CreateInvoice'
import Invoice from './componets/pages/Invoice'
import InvoicesPage from './componets/pages/Invoices'
import Profile from './componets/pages/Profile'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

function App() {
  const location = useLocation()
  const [isLoged, setIsloged] = useState(getToken() !== null)

  const theme = useTheme()
  const isNotXS = useMediaQuery(theme.breakpoints.up('sm'))

  const [open, setOpen] = useState(isNotXS)
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              path={UrlRoutes.Profile}
              element={
                <ProtectedRoute isLoged={isLoged}>
                  <Profile open={open} toggleDrawer={toggleDrawer} />
                </ProtectedRoute>
              }
            />

            <Route
              path={UrlRoutes.Orders}
              element={
                <ProtectedRoute isLoged={isLoged}>
                  <OrdersPage open={open} toggleDrawer={toggleDrawer} />
                </ProtectedRoute>
              }
            />

            <Route
              path={`${UrlRoutes.Order}:id`}
              element={
                <ProtectedRoute isLoged={isLoged}>
                  <Order open={open} toggleDrawer={toggleDrawer} />
                </ProtectedRoute>
              }
            />

            <Route
              path={UrlRoutes.CreateOrder}
              element={
                <ProtectedRoute isLoged={isLoged}>
                  <CreateOrder open={open} toggleDrawer={toggleDrawer} />
                </ProtectedRoute>
              }
            />

            <Route
              path={UrlRoutes.Invoices}
              element={
                <ProtectedRoute isLoged={isLoged}>
                  <InvoicesPage open={open} toggleDrawer={toggleDrawer} />
                </ProtectedRoute>
              }
            />

            <Route
              path={`${UrlRoutes.Invoice}:id`}
              element={
                <ProtectedRoute isLoged={isLoged}>
                  <Invoice open={open} toggleDrawer={toggleDrawer} />
                </ProtectedRoute>
              }
            />

            <Route
              path={UrlRoutes.CreateInvoice}
              element={
                <ProtectedRoute isLoged={isLoged}>
                  <CreateInvoice open={open} toggleDrawer={toggleDrawer} />
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
              path={UrlRoutes.Suppliers}
              element={
                <ProtectedRoute isLoged={isLoged}>
                  <SuppliersPage open={open} toggleDrawer={toggleDrawer} />
                </ProtectedRoute>
              }
            />

            <Route
              path={`${UrlRoutes.Supplier}:id`}
              element={
                <ProtectedRoute isLoged={isLoged}>
                  <SupplierPage open={open} toggleDrawer={toggleDrawer} />
                </ProtectedRoute>
              }
            />

            <Route
              path={UrlRoutes.CreateSupplier}
              element={
                <ProtectedRoute isLoged={isLoged}>
                  <CreateSupplier open={open} toggleDrawer={toggleDrawer} />
                </ProtectedRoute>
              }
            />

            <Route
              path={`${UrlRoutes.EditSupplier}:id`}
              element={
                <ProtectedRoute isLoged={isLoged}>
                  <EditSupplier open={open} toggleDrawer={toggleDrawer} />
                </ProtectedRoute>
              }
            />

            <Route
              path={UrlRoutes.Products}
              element={
                <ProtectedRoute isLoged={isLoged}>
                  <ProductsPage open={open} toggleDrawer={toggleDrawer} />
                </ProtectedRoute>
              }
            />

            <Route
              path={UrlRoutes.CreateProduct}
              element={
                <ProtectedRoute isLoged={isLoged}>
                  <CreateProduct open={open} toggleDrawer={toggleDrawer} />
                </ProtectedRoute>
              }
            />

            <Route
              path={`${UrlRoutes.EditProduct}:id`}
              element={
                <ProtectedRoute isLoged={isLoged}>
                  <EditProduct open={open} toggleDrawer={toggleDrawer} />
                </ProtectedRoute>
              }
            />

            <Route
              path={UrlRoutes.Categories}
              element={
                <ProtectedRoute isLoged={isLoged}>
                  <CategoriesPage open={open} toggleDrawer={toggleDrawer} />
                </ProtectedRoute>
              }
            />

            <Route
              path={UrlRoutes.CreateCategory}
              element={
                <ProtectedRoute isLoged={isLoged}>
                  <CreateCategory open={open} toggleDrawer={toggleDrawer} />
                </ProtectedRoute>
              }
            />

            <Route
              path={`${UrlRoutes.EditCategory}:id`}
              element={
                <ProtectedRoute isLoged={isLoged}>
                  <EditCategory open={open} toggleDrawer={toggleDrawer} />
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
      </LocalizationProvider>
    </div>
  )
}

export default App
