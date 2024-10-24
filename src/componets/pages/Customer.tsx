import { Grid, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { CustomerDetail } from '../../domains/customer.domain'
import { makeCustomerService } from '../../services/customer.service'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import Content from '../organisms/Content'
import CustomerDetails from '../organisms/CustomerDetails'
import { useNavigate, useParams } from 'react-router-dom'
import InvoiceTable from '../organisms/InvoiceTable'
import { InvoiceItem } from '../../domains/invoice.domain'
import { makeInvoiceService } from '../../services/invoice.service'
import { UrlRoutes } from '../../framework/routes/routes'

type CustomerPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function Customer({ open, toggleDrawer }: CustomerPageProps) {
  const [customer, setCustomer] = useState<CustomerDetail | undefined>(undefined)
  const [orderBy, setOrderBy] = useState<string>('createAt')
  const [invoices, setInvoices] = useState<InvoiceItem[]>([])
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)

  const customerService = makeCustomerService()
  const invoiceService = makeInvoiceService()

  const navigate = useNavigate()

  const { id } = useParams()

  const loadCustomer = async () => {
    try {
      if (!id) {
        return
      }
      const customerId = parseInt(id)
      const _customer = await customerService.getById(customerId)
      setCustomer(_customer)
    } catch {
      console.error('error')
    }
  }

  const loadInvoices = async () => {
    try {
      if (!id) {
        return
      }
      const customerId = parseInt(id)

      const [_invoices, _pages] = await invoiceService.getAll(
        page,
        '',
        customerId,
        orderBy,
        orderDirection,
      )
      setInvoices(_invoices)
      setPages(_pages)
    } catch {
      console.error('error')
    }
  }

  const onShowHandler = (id: number) => {
    try {
      navigate(`${UrlRoutes.Invoice}${id}`)
    } catch {
      console.error('error')
    }
  }

  useEffect(() => {
    loadCustomer()
  }, [])

  useEffect(() => {
    loadInvoices()
  }, [page, orderDirection, orderBy])

  return (
    <>
      <Content title='Cliente' open={open} toggleDrawer={toggleDrawer}>
        <CustomerDetails title='Información del cliente' obj={customer}></CustomerDetails>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <InvoiceTable
              pages={pages}
              page={page}
              setPage={setPage}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              orderDirection={orderDirection}
              setOrderDirection={setOrderDirection}
              data={invoices}
              onShow={onShowHandler}
            />
          </Paper>
        </Grid>
      </Content>
    </>
  )
}
