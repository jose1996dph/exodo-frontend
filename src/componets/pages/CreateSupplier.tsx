import { Alert, Grid, Paper } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreateSupplier as CreateSupplierRequest } from '../../domains/supplier.domain'
import { UrlRoutes } from '../../framework/routes/routes'
import { makeSupplierService } from '../../services/supplier.service'
import ServerException, { isServerException } from '../../domains/error.domain'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import SupplierForm from '../molecules/SupplierForm'
import Content from '../organisms/Content'

type CreateSupplierPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function CreateSupplier({ open, toggleDrawer }: CreateSupplierPageProps) {
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const supplierService = makeSupplierService()

  const navigate = useNavigate()

  const handleSubmit = async (dni: string, name: string, address: string, phone: string) => {
    setIsLoading(true)
    try {
      const supplier = new CreateSupplierRequest(dni, name, address, phone)

      const _errors = supplier.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      await supplierService.create(supplier)

      clearForm()

      navigate(UrlRoutes.Suppliers, { replace: true })
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

  return (
    <>
      <Content title='Nuevo proveedor' open={open} toggleDrawer={toggleDrawer}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <SupplierForm
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
