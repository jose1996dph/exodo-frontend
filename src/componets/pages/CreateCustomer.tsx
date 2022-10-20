import { Alert, Grid, Paper } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreateCustomer as CreateCustomerRequest } from '../../domains/customer.domain'
import { UrlRoutes } from '../../framework/routes/routes'
import { makeCustomerService } from '../../services/customer.service'
import ServerException, { isServerException } from '../../domains/error.domain'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import CustomerForm from '../molecules/CustomerForm'
import Content from '../organisms/Content'

type CreateCustomerPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function CreateCustomer({ open, toggleDrawer }: CreateCustomerPageProps) {
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  /*
  const [dni, setDni] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [storeName, setStoreName] = useState('')
  const [address, setAddress] = useState('')
  const [referencePoint, setReferencePoint] = useState('')
  const [phone, setPhone] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  */

  const customerService = makeCustomerService()

  const navigate = useNavigate()

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
      const customer = new CreateCustomerRequest(
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

      await customerService.create(customer)

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
    /*
    setDni('')
    setBusinessName('')
    setStoreName('')
    setAddress('')
    setReferencePoint('')
    setPhone('')
    setContactName('')
    setContactPhone('')
    */
    setErrors({})
    setErrorMessage('')
  }

  return (
    <>
      <Content title='Nuevo cliente' open={open} toggleDrawer={toggleDrawer}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CustomerForm
              isLoading={isLoading}
              /*
              dni={dni}
              businessName={businessName}
              storeName={storeName}
              address={address}
              referencePoint={referencePoint}
              phone={phone}
              contactName={contactName}
              contactPhone={contactPhone}
              setDni={setDni}
              setBusinessName={setBusinessName}
              setStoreName={setStoreName}
              setAddress={setAddress}
              setReferencePoint={setReferencePoint}
              setPhone={setPhone}
              setContactName={setContactName}
              setContactPhone={setContactPhone}
              */
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
