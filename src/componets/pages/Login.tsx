import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomTextField from '../atoms/CustomTextField'
import CustomButton from '../atoms/CustomButton'
import CssBaseline from '@mui/material/CssBaseline'
import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { isEmail } from '../../framework/helpers/validation.helper'
import { makeAuthService } from '../../services/auth.service'
import {
  setRememberMe as setStoreRememberMe,
  getRememberMe as getStoreRememberMe,
} from '../../framework/helpers/auth.helper'
import Copyright from '../atoms/Copyright'
import Logo from '../atoms/Logo'
import { Grid } from '@mui/material'
import { UrlRoutes } from '../../framework/routes/routes'

const theme = createTheme()

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [emailHelperText, setEmailHelperText] = useState('')
  const [passwordHelperText, setPasswordHelperText] = useState('')

  const navigate = useNavigate()

  const authService = makeAuthService()

  useEffect(() => {
    if (getStoreRememberMe()) {
      setRememberMe(true)
      setEmail(getStoreRememberMe() ?? '')
    }
  }, [])

  const isValidForm = (): boolean => {
    let result = true
    setPasswordHelperText('')
    setEmailHelperText('')

    if (!email) {
      result = false
      setEmailHelperText('Correo es requerido')
    } else if (!isEmail(email)) {
      result = false
      setEmailHelperText('Correo no valido')
    }

    if (!password) {
      result = false
      setPasswordHelperText('Contraseña es requerida')
    }

    return result
  }

  const handlerLogin = async (): Promise<void> => {
    if (!isValidForm()) return

    try {
      setIsLoading(true)
      setError('')
      await authService.login(email, password)
      if (rememberMe) {
        setStoreRememberMe(email)
      } else {
        setStoreRememberMe('')
      }
      navigate(UrlRoutes.Dashboard, { replace: true })
    } catch ({ message }: any) {
      if (message) setError(message as string)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
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
              Iniciar sesión
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
              <CustomTextField
                id='password'
                label='Contraseña'
                value={password}
                type='password'
                disabled={isLoading}
                onEnter={handlerLogin}
                error={passwordHelperText ? true : false}
                helperText={passwordHelperText}
                onChange={(event) => setPassword(event.target.value)}
              ></CustomTextField>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    color='primary'
                  />
                }
                label='Recordarme'
              />
              <CustomButton
                id='login'
                text='Iniciar'
                href='#'
                onClick={handlerLogin}
                disabled={isLoading}
              ></CustomButton>
              <Grid container>
                <Grid item xs>
                  <Link href={UrlRoutes.ForgotPassword} variant='body2'>
                    ¿Has olvidado tu contraseña?
                  </Link>
                </Grid>
                {/**
                <Grid item>
                  <Link href='#' variant='body2'>
                    Don&#39;t have an account? Sign Up
                  </Link>
                </Grid>
                 */}
              </Grid>
              {error && <Alert severity='error'>{error}</Alert>}
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  )
}
