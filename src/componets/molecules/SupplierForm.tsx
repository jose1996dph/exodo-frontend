import { Box, Grid } from '@mui/material'
import CustomTextField from '../atoms/CustomTextField'
import CustomButton from '../atoms/CustomButton'
import Title from '../atoms/Title'
import RifMaskCustom from '../atoms/RifMaskCustom'
import { useEffect, useState } from 'react'
import { SupplierDetail } from '../../domains/supplier.domain'

type SubmitHandler = (dni: string, name: string, address: string, phone: string) => void

type SupplierFormProps = {
  isLoading: boolean
  supplier?: SupplierDetail | undefined
  errors: Record<string, string>
  onSubmit: SubmitHandler
}

export default function SupplierForm({ isLoading, supplier, errors, onSubmit }: SupplierFormProps) {
  const [dni, setDni] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (supplier) {
      setDni(supplier.dni)
      setName(supplier.name)
      setAddress(supplier.address)
      setPhone(supplier.phone)
    }
  }, [supplier])

  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item xs={12}>
          <Title>Información del proveedor</Title>
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
            id='name'
            label='Nombre'
            value={name}
            disabled={isLoading}
            error={errors['name'] ? true : false}
            helperText={errors['name']}
            onChange={(event) => setName(event.target.value)}
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
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CustomButton
          fullWidth={false}
          sx={{ mt: 2, ml: 1 }}
          id='submit'
          text='Guardar'
          href=''
          onClick={() => onSubmit(dni, name, address, phone)}
          disabled={isLoading}
        ></CustomButton>
      </Box>
    </>
  )
}
