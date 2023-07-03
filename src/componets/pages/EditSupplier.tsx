import { Alert, Grid, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SupplierDetail, UpdateSupplier } from '../../domains/supplier.domain'
import { UrlRoutes } from '../../framework/routes/routes'
import { makeSupplierService } from '../../services/supplier.service'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import ServerException, { isServerException } from '../../domains/error.domain'
import SupplierForm from '../molecules/SupplierForm'
import Content from '../organisms/Content'

type EditSupplierPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function EditSupplier({ open, toggleDrawer }: EditSupplierPageProps) {
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [supplier, setSupplier] = useState<SupplierDetail | undefined>(undefined)

  const supplierService = makeSupplierService()

  const navigate = useNavigate()

  const { id } = useParams()

  const handleSubmit = async (dni: string, name: string, address: string, phone: string) => {
    setIsLoading(true)
    try {
      if (!id) {
        return
      }
      const supplierId = parseInt(id)

      const supplier = new UpdateSupplier(dni, name, address, phone)

      const _errors = supplier.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      await supplierService.update(supplierId, supplier)

      clearForm()

      navigate(`${UrlRoutes.Supplier}${supplierId}`, { replace: true })
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

  const loadSupplier = async () => {
    try {
      if (!id) {
        return
      }
      const supplierId = parseInt(id)
      const _supplier = await supplierService.getById(supplierId)
      setSupplier(_supplier)
    } catch {
      console.error('error')
    }
  }

  useEffect(() => {
    loadSupplier()
  }, [])

  return (
    <>
      <Content title='Actualizar proveedor' open={open} toggleDrawer={toggleDrawer}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <SupplierForm
              isLoading={isLoading}
              supplier={supplier}
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
