import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CustomTextField from '../atoms/CustomTextField'
import CustomButton from '../atoms/CustomButton'
import CssBaseline from '@mui/material/CssBaseline'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Copyright from '../atoms/Copyright'
import Logo from '../atoms/Logo'
import AlertDialog from '../atoms/AlertDialog'
import { UrlRoutes } from '../../framework/routes/routes'
import { makeAuthService } from '../../services/auth.service'

const theme = createTheme()

export default function SetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { token } = useParams()

  const navigate = useNavigate()

  const authService = makeAuthService()

  useEffect(() => {
    if (!token) {
      navigate(UrlRoutes.Login, { replace: true })
    }
  }, [])

  const isValidForm = (): Record<string, string> => {
    const _errors: Record<string, string> = {}

    if (!password) {
      _errors['password'] = 'Contraseña debe tener entre 8 y 16 caracteres'
    }
    if (password && (password.length < 8 || password.length > 16)) {
      _errors['password'] = 'Contraseña debe tener entre 8 y 16 caracteres'
    }
    if (confirmPassword != password) {
      _errors['confirmPassword'] = 'Confirmación de contraseña inválida'
    }

    return _errors
  }

  const handlerSetPassword = async (): Promise<void> => {
    const _errors = isValidForm()

    setErrors(_errors)
    if (Object.keys(_errors).length) {
      return
    }

    try {
      setIsLoading(true)
      setError('')

      await authService.setPassword(token as string, password, confirmPassword)

      setPassword('')
      setConfirmPassword('')
      setOpen(true)
    } catch ({ message }) {
      if (message) setError(message as string)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AlertDialog
        icon='success'
        content='Se estableció su contraseña con éxito.'
        open={open}
        setOpen={setOpen}
        onAcept={() => navigate(UrlRoutes.Login, { replace: true })}
      ></AlertDialog>
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Logo sx={{ m: 2 }} width='100%' />
            <Typography component='h1' variant='h5'>
              Establecer la contraseña
            </Typography>
            <Box component='form' noValidate sx={{ mt: 1 }}>
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
              <CustomTextField
                id='confirmPassword'
                label='Confirmar contraseña'
                value={confirmPassword}
                type='password'
                disabled={isLoading}
                onEnter={handlerSetPassword}
                error={errors['passwordConfirm'] ? true : false}
                helperText={errors['passwordConfirm']}
                onChange={(event) => setConfirmPassword(event.target.value)}
              ></CustomTextField>
              <CustomButton
                id='restart'
                text='Establecer'
                href='#'
                onClick={handlerSetPassword}
                disabled={isLoading}
              ></CustomButton>
              {error && <Alert severity='error'>{error}</Alert>}
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  )
}
