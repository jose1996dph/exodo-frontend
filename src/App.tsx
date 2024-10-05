import { ReactElement, createContext, useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './componets/pages/Dashboard'
import CreateUser from './componets/pages/CreateUser'
import EditUser from './componets/pages/EditUser'
import Login from './componets/pages/Login'
import SetPassword from './componets/pages/SetPassword'
import ForgotPassword from './componets/pages/ForgotPassword'
import CustomersPage from './componets/pages/Customers'
import CreateCustomer from './componets/pages/CreateCustomer'
import UsersPage from './componets/pages/Users'
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
import SupplierReports from './componets/pages/SupplierReports'
import SellerReports from './componets/pages/SellerReports'
import useAuth from './hooks/auth.hook'
import { Role } from './domains/role.domain'

import { Currencies, getCurrency as getStoredCurrency } from './framework/helpers/currency.helper'
import { makeDollarService } from './services/dollar.service'

type PriceContextObj = {
  currency?: Currencies | undefined
  setCurrency?: ((value: Currencies) => void) | undefined
  dollarValue?: number
}

export const PriceContext = createContext<PriceContextObj>({})

function App() {
  const [isLoged, isAuthorized] = useAuth()

  const theme = useTheme()
  const isNotXS = useMediaQuery(theme.breakpoints.up('sm'))

  const [open, setOpen] = useState(true)
  const [currency, setCurrency] = useState(getStoredCurrency())
  const [dollarValue, setDollarValue] = useState(0)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const isLogedRedirectTo = (page: ReactElement) => {
    if (isLoged) {
      return <Navigate to={UrlRoutes.Dashboard} replace />
    }

    return page
  }

  const dollarService = makeDollarService()

  const getDollarValue = async () => {
    try {
      const value = await dollarService.getValueInBolivars()
      setDollarValue(value)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getDollarValue()
    setOpen(isNotXS)
  }, [])

  return (
    <div className='App'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <PriceContext.Provider value={{ currency, setCurrency, dollarValue }}>
          <Routes>
            <Route
              path={UrlRoutes.ForgotPassword}
              element={<>{isLogedRedirectTo(<ForgotPassword />)}</>}
            />
            <Route
              path={UrlRoutes.SetPassword}
              element={<>{isLogedRedirectTo(<SetPassword />)}</>}
            />
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
                  <ProtectedRoute isLoged={isLoged} isAuthorized={isAuthorized(Role.ADMIN)}>
                    <SuppliersPage open={open} toggleDrawer={toggleDrawer} />
                  </ProtectedRoute>
                }
              />

              <Route
                path={`${UrlRoutes.Supplier}:id`}
                element={
                  <ProtectedRoute isLoged={isLoged} isAuthorized={isAuthorized(Role.ADMIN)}>
                    <SupplierPage open={open} toggleDrawer={toggleDrawer} />
                  </ProtectedRoute>
                }
              />

              <Route
                path={UrlRoutes.CreateSupplier}
                element={
                  <ProtectedRoute isLoged={isLoged} isAuthorized={isAuthorized(Role.ADMIN)}>
                    <CreateSupplier open={open} toggleDrawer={toggleDrawer} />
                  </ProtectedRoute>
                }
              />

              <Route
                path={`${UrlRoutes.EditSupplier}:id`}
                element={
                  <ProtectedRoute isLoged={isLoged} isAuthorized={isAuthorized(Role.ADMIN)}>
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
                  <ProtectedRoute isLoged={isLoged} isAuthorized={isAuthorized(Role.ADMIN)}>
                    <UsersPage open={open} toggleDrawer={toggleDrawer} />
                  </ProtectedRoute>
                }
              />

              <Route
                path={UrlRoutes.CreateUser}
                element={
                  <ProtectedRoute isLoged={isLoged} isAuthorized={isAuthorized(Role.ADMIN)}>
                    <CreateUser open={open} toggleDrawer={toggleDrawer} />
                  </ProtectedRoute>
                }
              />

              <Route
                path={`${UrlRoutes.EditUser}:id`}
                element={
                  <ProtectedRoute isLoged={isLoged} isAuthorized={isAuthorized(Role.ADMIN)}>
                    <EditUser open={open} toggleDrawer={toggleDrawer} />
                  </ProtectedRoute>
                }
              />

              <Route
                path={UrlRoutes.SellerReports}
                element={
                  <ProtectedRoute isLoged={isLoged} isAuthorized={isAuthorized(Role.ADMIN)}>
                    <SellerReports open={open} toggleDrawer={toggleDrawer} />
                  </ProtectedRoute>
                }
              />

              <Route
                path={UrlRoutes.SupplierReports}
                element={
                  <ProtectedRoute isLoged={isLoged} isAuthorized={isAuthorized(Role.ADMIN)}>
                    <SupplierReports open={open} toggleDrawer={toggleDrawer} />
                  </ProtectedRoute>
                }
              />
            </Route>
            {/* <Route path='*' element={<Navigate to={UrlRoutes.Home} />} />*/}
          </Routes>
        </PriceContext.Provider>
      </LocalizationProvider>
    </div>
  )
}

export default App
