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
import AssignmentIcon from '@mui/icons-material/Assignment'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import WorkIcon from '@mui/icons-material/Work'
import { useNavigate } from 'react-router-dom'

import { UrlRoutes } from '../../framework/routes/routes'

export const MainListItems = () => {
  const navigate = useNavigate()
  return (
    <Fragment>
      <ListItemButton onClick={() => navigate(UrlRoutes.Dashboard, { replace: true })}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Indicadores' />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ReceiptLongIcon />
        </ListItemIcon>
        <ListItemText primary='Facturas' />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary='Órdenes' />
      </ListItemButton>
      <ListItemButton onClick={() => navigate(UrlRoutes.Customers, { replace: true })}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary='Clientes' />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LocalShippingIcon />
        </ListItemIcon>
        <ListItemText primary='Proveedores' />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary='Reportes' />
      </ListItemButton>
      <ListItemButton onClick={() => navigate(UrlRoutes.Users, { replace: true })}>
        <ListItemIcon>
          <WorkIcon />
        </ListItemIcon>
        <ListItemText primary='Usuarios' />
      </ListItemButton>
    </Fragment>
  )
}

export const secondaryListItems = (
  <Fragment>
    <ListSubheader component='div' inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Current month' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Last quarter' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Year-end sale' />
    </ListItemButton>
  </Fragment>
)
