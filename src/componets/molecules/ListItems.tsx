import { Fragment } from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PeopleIcon from '@mui/icons-material/People'
import BarChartIcon from '@mui/icons-material/BarChart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import InventoryIcon from '@mui/icons-material/Inventory'
import CategoryIcon from '@mui/icons-material/Category'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import WorkIcon from '@mui/icons-material/Work'
import { useNavigate } from 'react-router-dom'

import { UrlRoutes } from '../../framework/routes/routes'
import { Box, useMediaQuery } from '@mui/material'
import useAuth from '../../hooks/auth.hook'
import { Role } from '../../domains/role.domain'

type MainListItemsProps = {
  toggleDrawer: () => void
}

export const MainListItems = ({ toggleDrawer }: MainListItemsProps) => {
  const [isLoged, isAuthorized] = useAuth()
  const isXs = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const _isAuthorized = isAuthorized(Role.ADMIN)

  const navegateTo = (page: string) => {
    if (isXs) {
      toggleDrawer()
    }
    navigate(page)
  }

  return (
    <Fragment>
      {/**
      <ListSubheader component='div' inset>
        <Box sx={{ fontWeight: 550, color: '#1976d2' }}>Gestiones</Box>
      </ListSubheader>
       */}
      <ListItemButton onClick={() => navegateTo(UrlRoutes.Dashboard)}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Indicadores' />
      </ListItemButton>
      <ListItemButton onClick={() => navegateTo(UrlRoutes.Invoices)}>
        <ListItemIcon>
          <ReceiptLongIcon />
        </ListItemIcon>
        <ListItemText primary='Facturas' />
      </ListItemButton>
      <ListItemButton onClick={() => navegateTo(UrlRoutes.Orders)}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary='Órdenes' />
      </ListItemButton>
      <ListItemButton onClick={() => navegateTo(UrlRoutes.Customers)}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary='Clientes' />
      </ListItemButton>
      {_isAuthorized && (
        <ListItemButton onClick={() => navegateTo(UrlRoutes.Suppliers)}>
          <ListItemIcon>
            <LocalShippingIcon />
          </ListItemIcon>
          <ListItemText primary='Proveedores' />
        </ListItemButton>
      )}
      <ListItemButton onClick={() => navegateTo(UrlRoutes.Products)}>
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText primary='Productos' />
      </ListItemButton>
      <ListItemButton onClick={() => navegateTo(UrlRoutes.Categories)}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary='Categorías' />
      </ListItemButton>
      {/*
      <ListItemButton onClick={() => navegateTo(UrlRoutes.SellerReport)}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary='Reportes' />
      </ListItemButton>
      */}
      {_isAuthorized && (
        <ListItemButton onClick={() => navegateTo(UrlRoutes.Users)}>
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary='Usuarios' />
        </ListItemButton>
      )}
    </Fragment>
  )
}

export const SecondaryListItems = ({ toggleDrawer }: MainListItemsProps) => {
  const isXs = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))
  const navigate = useNavigate()

  const navegateTo = (page: string) => {
    if (isXs) {
      toggleDrawer()
    }
    navigate(page)
  }
  return (
    <Fragment>
      <ListSubheader component='div' inset>
        <Box sx={{ fontWeight: 'bold' }}>Reportes</Box>
      </ListSubheader>
      <ListItemButton onClick={() => navegateTo(UrlRoutes.SellerReports)}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary='Vendedores' />
      </ListItemButton>
      <ListItemButton onClick={() => navegateTo(UrlRoutes.SupplierReports)}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary='Proveedores' />
      </ListItemButton>
    </Fragment>
  )
}
