import { FC, useState, useEffect } from 'react'
import CustomTextField from '../atoms/CustomTextField'
import CustomButton from '../atoms/CustomButton'
import {
  CssBaseline,
  Alert,
  Avatar,
  Box,
  Container,
  FormControlLabel,
  Checkbox,
  Typography,
  TypographyProps,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LockIcon from '@mui/icons-material/Lock'
import Link from '@mui/material/Link'
import { isEmail } from '../../framework/helpers/validation.helper'
import { makeAuthService } from '../../services/auth.service'
import {
  setRememberMe as setStoreRememberMe,
  getRememberMe as getStoreRememberMe,
} from '../../framework/helpers/auth.helper'

function Copyright(props: TypographyProps) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

const Login: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [emailHelperText, setEmailHelperText] = useState('')
  const [passwordHelperText, setPasswordHelperText] = useState('')
  const authService = makeAuthService()

  useEffect(() => {
    if (getStoreRememberMe()) {
      console.log(getStoreRememberMe())
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
    } catch (error: any) {
      setError(error.message)
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box component='form' noValidate sx={{ mt: 1 }}>
              <CustomTextField
                id='email'
                label='Correo electrónico'
                value={email}
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
              {/**
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='#' variant='body2'>
                    Don&#39;t have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
               */}
              {error && <Alert severity='error'>{error}</Alert>}
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Login
