import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import InputAdornment from '@mui/material/InputAdornment'

import UserTable from '../organisms/UserTable'
import CustomButton from '../atoms/CustomButton'
import CustomTextField from '../atoms/CustomTextField'
import Content from '../organisms/Content'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import { makeUserService } from '../../services/user.service'
import { UserItem } from '../../domains/user.domain'
import ConfirmDialog from '../atoms/ConfirmDialog'
import { useNavigate } from 'react-router-dom'
import { UrlRoutes } from '../../framework/routes/routes'

type UsersPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function Users({ open, toggleDrawer }: UsersPageProps) {
  const [searchText, setSearchText] = useState('')
  const [users, setUsers] = useState<UserItem[]>([])
  const [orderBy, setOrderBy] = useState<string>('dni')
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc')
  const [openModal, setOpenModal] = useState(false)
  const [seletedId, setSelectedId] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)

  const userService = makeUserService()

  const navigate = useNavigate()

  const loadUsers = async () => {
    try {
      const [_users, _pages] = await userService.getAll(page, searchText, orderBy, orderDirection)
      setUsers(_users)
      setPages(_pages)
    } catch {
      console.error('error')
    }
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const openAlert = (id: number) => {
    setOpenModal(true)
    setSelectedId(id)
  }

  const handlerToggleStatus = async () => {
    try {
      await userService.toggleStatus(seletedId)
      loadUsers()
    } catch {
      console.error('error')
    } finally {
      handleClose()
    }
  }

  const goToCreateUser = () => {
    navigate(UrlRoutes.CreateUser, { replace: true })
  }

  const onUpdateHandler = (id: number) => {
    try {
      navigate(`${UrlRoutes.EditUser}${id}`, { replace: true })
    } catch {
      console.error('error')
    }
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => loadUsers(), 1000)
    return () => clearTimeout(timeOutId)
  }, [searchText])

  useEffect(() => {
    loadUsers()
  }, [page, orderDirection, orderBy])

  return (
    <>
      <ConfirmDialog
        open={openModal}
        setOpen={setOpenModal}
        content='¿Está seguro de cambiar el estatus del usuario?'
        onAcept={handlerToggleStatus}
      />
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
              onClick={goToCreateUser}
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
            <UserTable
              pages={pages}
              page={page}
              setPage={setPage}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              orderDirection={orderDirection}
              setOrderDirection={setOrderDirection}
              data={users}
              onToggle={openAlert}
              onUpdate={onUpdateHandler}
            />
          </Paper>
        </Grid>
      </Content>
    </>
  )
}
