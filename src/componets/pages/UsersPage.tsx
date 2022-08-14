import Users from '../organisms/Users'
import { useState, FC } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import InputAdornment from '@mui/material/InputAdornment'

import CustomButton from '../atoms/CustomButton'
import CustomTextField from '../atoms/CustomTextField'
import Content from '../organisms/Content'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'

type UsersPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

const UsersPage: FC<UsersPageProps> = ({ open, toggleDrawer }) => {
  const [searchText, setSearchText] = useState('')

  return (
    <Content title='Usuarios' open={open} toggleDrawer={toggleDrawer}>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 120,
          }}
        >
          <CustomButton
            aria-label='delete'
            color='primary'
            text='Crear usuario'
            id='create_user'
            startIcon={<PersonAddIcon />}
          ></CustomButton>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 120,
          }}
        >
          <CustomTextField
            label='Buscar usuario'
            aria-label='delete'
            color='primary'
            variant='outlined'
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          ></CustomTextField>
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Users />
        </Paper>
      </Grid>
    </Content>
  )
}

export default UsersPage
