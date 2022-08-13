import { FC } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Copyright from '../atoms/Copyright'
import CustomAppBar, { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import SiderBar from '../molecules/SiderBar'

const mdTheme = createTheme()

type ContentProps = {
  title: string
  open: boolean
  toggleDrawer: ToggleDrawerHandler
  children?: React.ReactNode
}

const Content: FC<ContentProps> = ({ title, open, children, toggleDrawer }: ContentProps) => {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <CustomAppBar title={title} open={open} toggleDrawer={toggleDrawer} />

        <SiderBar open={open} toggleDrawer={toggleDrawer} />
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {children}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Content
