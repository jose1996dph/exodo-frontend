import { Alert, Grid, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CustomerDetail, UpdateCustomer } from '../../domains/customer.domain'
import { UrlRoutes } from '../../framework/routes/routes'
import { makeCustomerService } from '../../services/customer.service'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import ServerException, { isServerException } from '../../domains/error.domain'
import CustomerForm from '../molecules/CustomerForm'
import Content from '../organisms/Content'

type EditCustomerPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function EditCustomer({ open, toggleDrawer }: EditCustomerPageProps) {
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [customer, setCustomer] = useState<CustomerDetail | undefined>(undefined)

  const customerService = makeCustomerService()

  const navigate = useNavigate()

  const { id } = useParams()

  const handleSubmit = async (
    dni: string,
    businessName: string,
    storeName: string,
    address: string,
    referencePoint: string,
    phone: string,
    contactName: string,
    contactPhone: string,
  ) => {
    setIsLoading(true)
    try {
      if (!id) {
        return
      }
      const customerId = parseInt(id)

      const customer = new UpdateCustomer(
        dni,
        businessName,
        storeName,
        address,
        referencePoint,
        phone,
        contactName,
        contactPhone,
      )

      const _errors = customer.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      await customerService.update(customerId, customer)

      clearForm()

      navigate(UrlRoutes.Customers, { replace: true })
    } catch (error) {
      if (isServerException(error)) {
        const { message } = error as ServerException
        console.error(message)
        setErrorMessage(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const clearForm = () => {
    setErrors({})
    setErrorMessage('')
  }

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

  useEffect(() => {
    loadCustomer()
  }, [])

  return (
    <>
      <Content title='Actualizar cliente' open={open} toggleDrawer={toggleDrawer}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <CustomerForm
              isLoading={isLoading}
              customer={customer}
              errors={errors}
              onSubmit={handleSubmit}
            />
            {errorMessage && (
              <Alert sx={{ mt: '10px' }} severity='error'>
                {errorMessage}
              </Alert>
            )}
          </Paper>
        </Grid>
      </Content>
    </>
  )
}
