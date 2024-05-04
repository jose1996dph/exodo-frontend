import { Box, Grid } from '@mui/material'
import CustomTextField from '../atoms/CustomTextField'
import CustomButton from '../atoms/CustomButton'
import Title from '../atoms/Title'

type SubmitHandler = () => void

type ProfileFormProps = {
  isLoading: boolean
  firstName: string
  setFirstName: (value: string) => void
  lastName: string
  setLastName: (value: string) => void
  phone: string
  setPhone: (value: string) => void
  email: string
  setEmail: (value: string) => void
  dni: string
  setDni: (value: string) => void
  errors: Record<string, string>
  onSubmit: SubmitHandler
}

export default function ProfileForm({
  isLoading,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
  email,
  setEmail,
  dni,
  setDni,
  errors,
  onSubmit,
}: ProfileFormProps) {
  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item xs={12}>
          <Title>Información de usuario</Title>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            id='firstName'
            label='Nombre'
            value={firstName}
            disabled={isLoading}
            error={errors['firstName'] ? true : false}
            helperText={errors['firstName']}
            onChange={(event) => setFirstName(event.target.value)}
          ></CustomTextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            id='lastName'
            label='Apellido'
            value={lastName}
            disabled={isLoading}
            error={errors['lastName'] ? true : false}
            helperText={errors['lastName']}
            onChange={(event) => setLastName(event.target.value)}
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
            id='dni'
            label='Número de cédula'
            value={dni}
            disabled={isLoading}
            error={errors['dni'] ? true : false}
            helperText={errors['dni']}
            onChange={(event) => setDni(event.target.value)}
            inputProps={{ inputMode: 'numeric' }}
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id='email'
            label='Correo electrónico'
            value={email}
            type='email'
            disabled={isLoading}
            error={errors['email'] ? true : false}
            helperText={errors['email']}
            onChange={(event) => setEmail(event.target.value)}
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
          onClick={onSubmit}
          disabled={isLoading}
        ></CustomButton>
      </Box>
    </>
  )
}
