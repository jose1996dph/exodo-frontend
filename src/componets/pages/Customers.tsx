import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import InputAdornment from '@mui/material/InputAdornment'

import CustomerTable from '../organisms/CustomerTable'
import CustomButton from '../atoms/CustomButton'
import CustomTextField from '../atoms/CustomTextField'
import Content from '../organisms/Content'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import { makeCustomerService } from '../../services/customer.service'
import { CustomerItem } from '../../domains/customer.domain'
import ConfirmDialog from '../atoms/ConfirmDialog'
import { useNavigate } from 'react-router-dom'
import { UrlRoutes } from '../../framework/routes/routes'

type CustomersPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function Customers({ open, toggleDrawer }: CustomersPageProps) {
  const [searchText, setSearchText] = useState('')
  const [customers, setCustomers] = useState<CustomerItem[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [seletedId, setSelectedId] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)

  const customerService = makeCustomerService()

  const navigate = useNavigate()

  const loadCustomers = async () => {
    try {
      const [_customers, _pages] = await customerService.getAll(page, searchText)
      setCustomers(_customers)
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
      await customerService.toggleStatus(seletedId)
      loadCustomers()
    } catch {
      console.error('error')
    } finally {
      handleClose()
    }
  }

  const goToCreateCustomer = () => {
    navigate(UrlRoutes.CreateCustomer, { replace: true })
  }

  const onUpdateHandler = (id: number) => {
    try {
      navigate(`${UrlRoutes.EditCustomer}${id}`, { replace: true })
    } catch {
      console.error('error')
    }
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => loadCustomers(), 1000)
    return () => clearTimeout(timeOutId)
  }, [searchText])

  useEffect(() => {
    loadCustomers()
  }, [page])

  return (
    <>
      <ConfirmDialog
        open={openModal}
        setOpen={setOpenModal}
        content='¿Está seguro de cambiar el estatus del cliente?'
        onAcept={handlerToggleStatus}
      />
      <Content title='Clientes' open={open} toggleDrawer={toggleDrawer}>
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
              text='Crear cliente'
              id='create_customer'
              startIcon={<PersonAddIcon />}
              onClick={goToCreateCustomer}
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
              label='Buscar cliente'
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
            <CustomerTable
              pages={pages}
              page={page}
              setPage={setPage}
              data={customers}
              onToggle={openAlert}
              onUpdate={onUpdateHandler}
            />
          </Paper>
        </Grid>
      </Content>
    </>
  )
}
