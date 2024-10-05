import { Box, Grid } from '@mui/material'
import CustomTextField from '../atoms/CustomTextField'
import CustomButton from '../atoms/CustomButton'
import Title from '../atoms/Title'
import RifMaskCustom from '../atoms/RifMaskCustom'
import { useEffect, useState } from 'react'
import { CustomerDetail } from '../../domains/customer.domain'

type SubmitHandler = (
  dni: string,
  businessName: string,
  storeName: string,
  address: string,
  referencePoint: string,
  phone: string,
  contactName: string,
  contactPhone: string,
) => void

type CustomerFormProps = {
  isLoading: boolean
  customer?: CustomerDetail | undefined
  errors: Record<string, string>
  onSubmit: SubmitHandler
}

export default function CustomerForm({ isLoading, customer, errors, onSubmit }: CustomerFormProps) {
  const [dni, setDni] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [storeName, setStoreName] = useState('')
  const [address, setAddress] = useState('')
  const [referencePoint, setReferencePoint] = useState('')
  const [phone, setPhone] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')

  useEffect(() => {
    if (customer) {
      setDni(customer.dni)
      setBusinessName(customer.businessName)
      setStoreName(customer.storeName)
      setAddress(customer.address)
      setReferencePoint(customer.referencePoint)
      setPhone(customer.phone)
      setContactName(customer.contactName)
      setContactPhone(customer.contactPhone)
    }
  }, [customer])

  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item xs={12}>
          <Title>Información del cliente</Title>
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            id='dni'
            label='Rif'
            placeholder='J-00000000-1'
            value={dni}
            disabled={isLoading}
            error={errors['dni'] ? true : false}
            helperText={errors['dni']}
            onChange={(event) => setDni(event.target.value)}
            InputProps={{
              inputComponent: RifMaskCustom as any,
            }}
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id='businessName'
            label='Razón social'
            value={businessName}
            disabled={isLoading}
            error={errors['businessName'] ? true : false}
            helperText={errors['businessName']}
            onChange={(event) => setBusinessName(event.target.value)}
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id='storeName'
            label='Nombre de la tienda'
            value={storeName}
            disabled={isLoading}
            error={errors['storeName'] ? true : false}
            helperText={errors['storeName']}
            onChange={(event) => setStoreName(event.target.value)}
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id='address'
            label='Dirección'
            value={address}
            disabled={isLoading}
            error={errors['address'] ? true : false}
            helperText={errors['address']}
            onChange={(event) => setAddress(event.target.value)}
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id='referencePoint'
            label='Punto de referencia'
            value={referencePoint}
            disabled={isLoading}
            error={errors['referencePoint'] ? true : false}
            helperText={errors['referencePoint']}
            onChange={(event) => setReferencePoint(event.target.value)}
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id='phone'
            label='Número de teléfono'
            value={phone}
            disabled={isLoading}
            error={errors['phone'] ? true : false}
            helperText={errors['phone']}
            onChange={(event) => setPhone(event.target.value)}
            inputProps={{ inputMode: 'tel' }}
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id='contactName'
            label='Persona de contacto'
            value={contactName}
            disabled={isLoading}
            error={errors['contactName'] ? true : false}
            helperText={errors['contactName']}
            onChange={(event) => setContactName(event.target.value)}
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id='contactPhone'
            label='teléfono de persona de contacto'
            value={contactPhone}
            disabled={isLoading}
            error={errors['contactPhone'] ? true : false}
            helperText={errors['contactPhone']}
            onChange={(event) => setContactPhone(event.target.value)}
            inputProps={{ inputMode: 'tel' }}
          ></CustomTextField>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CustomButton
          fullWidth={false}
          sx={{ mt: 2, ml: 1 }}
          id='submit'
          text='Guardar'
          href=''
          onClick={() =>
            onSubmit(
              dni,
              businessName,
              storeName,
              address,
              referencePoint,
              phone,
              contactName,
              contactPhone,
            )
          }
          disabled={isLoading}
        ></CustomButton>
      </Box>
    </>
  )
}
