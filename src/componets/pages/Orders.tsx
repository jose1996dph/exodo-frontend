import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import InputAdornment from '@mui/material/InputAdornment'

import OrderTable from '../organisms/OrderTable'
import CustomButton from '../atoms/CustomButton'
import CustomTextField from '../atoms/CustomTextField'
import Content from '../organisms/Content'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import { makeOrderService } from '../../services/order.service'
import { OrderItem } from '../../domains/order.domain'
import ConfirmDialog from '../atoms/ConfirmDialog'
import { useNavigate } from 'react-router-dom'
import { UrlRoutes } from '../../framework/routes/routes'

type OrdersPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function Orders({ open, toggleDrawer }: OrdersPageProps) {
  const [searchText, setSearchText] = useState('')
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [orderBy, setOrderBy] = useState<string>('supplier')
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc')
  const [openModal, setOpenModal] = useState(false)
  const [seletedId, setSelectedId] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)

  const orderService = makeOrderService()

  const navigate = useNavigate()

  const loadOrders = async () => {
    try {
      const [_orders, _pages] = await orderService.getAll(page, searchText, orderBy, orderDirection)
      setOrders(_orders)
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
      await orderService.toggleStatus(seletedId)
      loadOrders()
    } catch {
      console.error('error')
    } finally {
      handleClose()
    }
  }

  const goToCreateOrder = () => {
    navigate(UrlRoutes.CreateOrder, { replace: true })
  }

  const onUpdateHandler = (id: number) => {
    try {
      navigate(`${UrlRoutes.EditOrder}${id}`, { replace: true })
    } catch {
      console.error('error')
    }
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => loadOrders(), 1000)
    return () => clearTimeout(timeOutId)
  }, [searchText])

  useEffect(() => {
    loadOrders()
  }, [page, orderDirection, orderBy])

  return (
    <>
      <ConfirmDialog
        open={openModal}
        setOpen={setOpenModal}
        content='¿Está seguro de cambiar el estatus del ordero?'
        onAcept={handlerToggleStatus}
      />
      <Content title='Orderos' open={open} toggleDrawer={toggleDrawer}>
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
              text='Crear Ordero'
              id='create_order'
              startIcon={<PersonAddIcon />}
              onClick={goToCreateOrder}
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
              label='Buscar ordero'
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
            <OrderTable
              pages={pages}
              page={page}
              setPage={setPage}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              orderDirection={orderDirection}
              setOrderDirection={setOrderDirection}
              data={orders}
              onToggle={openAlert}
              onUpdate={onUpdateHandler}
            />
          </Paper>
        </Grid>
      </Content>
    </>
  )
}
