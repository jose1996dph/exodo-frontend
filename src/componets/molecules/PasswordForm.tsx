import { Box, Grid } from '@mui/material'
import CustomTextField from '../atoms/CustomTextField'
import CustomButton from '../atoms/CustomButton'
import Title from '../atoms/Title'

type SubmitHandler = () => void

type PasswordFormProps = {
  isLoading: boolean
  password: string
  setPassword: (value: string) => void
  newPassword: string
  setNewPassword: (value: string) => void
  confirmPassword: string
  setConfirmPassword: (value: string) => void
  errors: Record<string, string>
  onSubmit: SubmitHandler
}

export default function PasswordForm({
  isLoading,
  password,
  setPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  errors,
  onSubmit,
}: PasswordFormProps) {
  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item xs={12}>
          <Title>Cambiar contraseña</Title>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id='password'
            label='Contraseña'
            value={password}
            type='password'
            disabled={isLoading}
            error={errors['password'] ? true : false}
            helperText={errors['password']}
            onChange={(event) => setPassword(event.target.value)}
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id='newPassword'
            label='Nueva contraseña'
            value={newPassword}
            type='password'
            disabled={isLoading}
            error={errors['newPassword'] ? true : false}
            helperText={errors['newPassword']}
            onChange={(event) => setNewPassword(event.target.value)}
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id='confirmPassword'
            label='Confirmar contraseña'
            value={confirmPassword}
            type='password'
            disabled={isLoading}
            error={errors['confirmPassword'] ? true : false}
            helperText={errors['confirmPassword']}
            onChange={(event) => setConfirmPassword(event.target.value)}
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
