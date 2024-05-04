import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import InputAdornment from '@mui/material/InputAdornment'

import InvoiceTable from '../organisms/InvoiceTable'
import CustomButton from '../atoms/CustomButton'
import CustomTextField from '../atoms/CustomTextField'
import Content from '../organisms/Content'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import { makeInvoiceService } from '../../services/invoice.service'
import { InvoiceItem } from '../../domains/invoice.domain'
import ConfirmDialog from '../atoms/ConfirmDialog'
import { useNavigate } from 'react-router-dom'
import { UrlRoutes } from '../../framework/routes/routes'

type InvoicesPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function Invoices({ open, toggleDrawer }: InvoicesPageProps) {
  const [searchText, setSearchText] = useState('')
  const [invoices, setInvoices] = useState<InvoiceItem[]>([])
  const [orderBy, setOrderBy] = useState<string>('total')
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc')
  const [openModal, setOpenModal] = useState(false)
  const [seletedId, setSelectedId] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)

  const invoiceService = makeInvoiceService()

  const navigate = useNavigate()

  const loadInvoices = async () => {
    try {
      const [_invoices, _pages] = await invoiceService.getAll(
        page,
        searchText,
        orderBy,
        orderDirection,
      )
      setInvoices(_invoices)
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
      await invoiceService.toggleStatus(seletedId)
      loadInvoices()
    } catch {
      console.error('error')
    } finally {
      handleClose()
    }
  }

  const goToCreateInvoice = () => {
    navigate(UrlRoutes.CreateInvoice, { replace: true })
  }

  const onShowHandler = (id: number) => {
    try {
      navigate(`${UrlRoutes.Invoice}${id}`, { replace: true })
    } catch {
      console.error('error')
    }
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => loadInvoices(), 1000)
    return () => clearTimeout(timeOutId)
  }, [searchText])

  useEffect(() => {
    loadInvoices()
  }, [page, orderDirection, orderBy])

  return (
    <>
      <ConfirmDialog
        open={openModal}
        setOpen={setOpenModal}
        content='¿Está seguro de cambiar el estatus de la factura?'
        onAcept={handlerToggleStatus}
      />
      <Content title='Facturas' open={open} toggleDrawer={toggleDrawer}>
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
              text='Crear Factura'
              id='create_invoice'
              startIcon={<PersonAddIcon />}
              onClick={goToCreateInvoice}
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
              label='Buscar factura'
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
        {/* Recent Invoices */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <InvoiceTable
              pages={pages}
              page={page}
              setPage={setPage}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              orderDirection={orderDirection}
              setOrderDirection={setOrderDirection}
              data={invoices}
              onToggle={openAlert}
              onShow={onShowHandler}
            />
          </Paper>
        </Grid>
      </Content>
    </>
  )
}
