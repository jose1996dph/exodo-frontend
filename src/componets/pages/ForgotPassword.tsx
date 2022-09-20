import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomTextField from '../atoms/CustomTextField'
import CustomButton from '../atoms/CustomButton'
import CssBaseline from '@mui/material/CssBaseline'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { isEmail } from '../../framework/helpers/validation.helper'
import { makeAuthService } from '../../services/auth.service'
import Copyright from '../atoms/Copyright'
import Logo from '../atoms/Logo'
import AlertDialog from '../atoms/AlertDialog'
import { UrlRoutes } from '../../framework/routes/routes'

const theme = createTheme()

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [emailHelperText, setEmailHelperText] = useState('')

  const navigate = useNavigate()

  const authService = makeAuthService()

  const isValidForm = (): boolean => {
    let result = true
    setEmailHelperText('')

    if (!email) {
      result = false
      setEmailHelperText('Correo es requerido')
    } else if (!isEmail(email)) {
      result = false
      setEmailHelperText('Correo no valido')
    }

    return result
  }

  const handlerForgot = async (): Promise<void> => {
    if (!isValidForm()) return

    try {
      setIsLoading(true)
      setError('')
      await authService.forgotPassword(email)

      setEmail('')
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
        content='Se le enviará un correo electrónico para restablecer su contraseña.'
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
              Recuperar contraseña
            </Typography>
            <Box component='form' noValidate sx={{ mt: 1 }}>
              <CustomTextField
                id='email'
                label='Correo electrónico'
                value={email}
                type='email'
                disabled={isLoading}
                error={emailHelperText ? true : false}
                helperText={emailHelperText}
                onChange={(event) => setEmail(event.target.value)}
              ></CustomTextField>
              <CustomButton
                id='restart'
                text='Recuperar'
                href='#'
                onClick={handlerForgot}
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
