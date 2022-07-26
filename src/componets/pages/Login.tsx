import { FunctionComponent, useState } from 'react'
import CustomTextField from '../atoms/CustomTextField'
import CustomButton from '../atoms/CustomButton'
import {
  CssBaseline,
  Avatar,
  Box,
  Grid,
  Container,
  FormControlLabel,
  Checkbox,
  Typography,
  TypographyProps,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LockIcon from '@mui/icons-material/Lock'
import Link from '@mui/material/Link'

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

const Login: FunctionComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      (
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
                onChange={(event) => setEmail(event.target.value)}
              ></CustomTextField>
              <CustomTextField
                id='password'
                label='Contraseña'
                value={password}
                type='password'
                onChange={(event) => setPassword(event.target.value)}
              ></CustomTextField>
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <CustomButton id='login' text='Iniciar'></CustomButton>
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
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Login
