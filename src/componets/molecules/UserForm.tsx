import { Box, Grid } from '@mui/material'
import CustomTextField from '../atoms/CustomTextField'
import CustomButton from '../atoms/CustomButton'
import CustomSelect from '../atoms/CustomSelect'
import { RoleItem } from '../../domains/role.domain'
import Title from '../atoms/Title'

type SubmitHandler = () => void

type UserFormProps = {
  isLoading: boolean
  firstName: string
  setFirstName: (value: string) => void
  lastName: string
  setLastName: (value: string) => void
  phone: string
  setPhone: (value: string) => void
  roleId: string
  setRoleId: (value: string) => void
  email: string
  setEmail: (value: string) => void
  dni: string
  setDni: (value: string) => void
  roles: RoleItem[]
  errors: Record<string, string>
  onSubmit: SubmitHandler
}

export default function UserForm({
  isLoading,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
  roleId,
  setRoleId,
  email,
  setEmail,
  dni,
  setDni,
  roles,
  errors,
  onSubmit,
}: UserFormProps) {
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
            label='Número de cedula'
            value={dni}
            disabled={isLoading}
            error={errors['dni'] ? true : false}
            helperText={errors['dni']}
            onChange={(event) => setDni(event.target.value)}
            inputProps={{ inputMode: 'numeric' }}
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomSelect
            label='Rol o cargo'
            id='roleId'
            value={roleId}
            disabled={isLoading}
            onChange={(event) => setRoleId(event.target.value)}
            error={errors['roleId'] ? true : false}
            helperText={errors['roleId']}
            items={roles.map((item) => {
              return { value: item.id, description: item.description }
            })}
          ></CustomSelect>
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
