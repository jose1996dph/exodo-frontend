import { Menu, MenuItem, styled } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'

import AccountCircle from '@mui/icons-material/AccountCircle'
import { useState } from 'react'
import { makeAuthService } from '../../services/auth.service'
import { UrlRoutes } from '../../framework/routes/routes'
import { useNavigate } from 'react-router-dom'

const drawerWidth = 240

export type ToggleDrawerHandler = () => void

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
  theme?: any
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }: AppBarProps) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

type CustomAppBarProps = {
  title: string
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function CustomAppBar({ title, open, toggleDrawer }: CustomAppBarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const navigate = useNavigate()
  const authService = makeAuthService()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleEditProfile = () => {
    navigate(UrlRoutes.Profile, { replace: true })
    handleClose()
  }

  const handleCloseSession = () => {
    try {
      authService.logout()
      navigate(UrlRoutes.Login, { replace: true })
    } finally {
      handleClose()
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position='absolute' open={open}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleMenu}
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id='menu-appbar'
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEditProfile}>Perfil</MenuItem>
          <MenuItem onClick={handleCloseSession}>Cerrar sesión</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
