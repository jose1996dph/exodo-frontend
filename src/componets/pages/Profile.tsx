import { Alert, Grid, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChangePassword, UpdateProfile } from '../../domains/profile.domain'
import { UrlRoutes } from '../../framework/routes/routes'
import { makeProfileService } from '../../services/profile.service'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import ServerException, { isServerException } from '../../domains/error.domain'
import Content from '../organisms/Content'
import ProfileForm from '../molecules/ProfileForm'
import PasswordForm from '../molecules/PasswordForm'

type ProfileProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function Profile({ open, toggleDrawer }: ProfileProps) {
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string | string[]>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [dni, setDni] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const profileService = makeProfileService()

  const navigate = useNavigate()

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const user = new UpdateProfile(dni, firstName, lastName, phone, email)

      const _errors = user.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      await profileService.update(user)

      clearPasswordForm()

      navigate(UrlRoutes.Users, { replace: true })
    } catch (error) {
      if (isServerException(error)) {
        const { message } = error as ServerException
        console.error(message)
        setErrorMessage(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async () => {
    setIsLoading(true)
    try {
      const changePassword = new ChangePassword(password, newPassword, confirmPassword)

      const _errors = changePassword.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      await profileService.updatePassword(changePassword)

      clearPasswordForm()
    } catch (error) {
      if (isServerException(error)) {
        const { message } = error as ServerException
        console.error(message)
        setErrorPasswordMessage(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const clearForm = () => {
    setFirstName('')
    setLastName('')
    setPhone('')
    setEmail('')
    setDni('')
    setErrors({})
    setErrorMessage('')
    setErrorPasswordMessage('')
  }

  const clearPasswordForm = () => {
    setPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setErrors({})
    setErrorMessage('')
    setErrorPasswordMessage('')
  }

  const loadProfile = async () => {
    try {
      const _user = await profileService.get()
      setFirstName(_user.firstName)
      setLastName(_user.lastName)
      setPhone(_user.phone)
      setEmail(_user.email)
      setDni(_user.dni)
    } catch {
      console.error('error')
    }
  }

  useEffect(() => {
    loadProfile()
  }, [])

  return (
    <>
      <Content title='Datos de usuario' open={open} toggleDrawer={toggleDrawer}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <ProfileForm
              isLoading={isLoading}
              firstName={firstName}
              lastName={lastName}
              phone={phone}
              email={email}
              dni={dni}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setPhone={setPhone}
              setEmail={setEmail}
              setDni={setDni}
              errors={errors}
              onSubmit={handleSubmit}
            />
            {errorMessage && (
              <Alert sx={{ mt: '10px' }} severity='error'>
                {errorMessage}
              </Alert>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <PasswordForm
              isLoading={isLoading}
              password={password}
              newPassword={newPassword}
              confirmPassword={confirmPassword}
              setPassword={setPassword}
              setNewPassword={setNewPassword}
              setConfirmPassword={setConfirmPassword}
              errors={errors}
              onSubmit={handleChangePassword}
            />
            {errorPasswordMessage && (
              <Alert sx={{ mt: '10px' }} severity='error'>
                {errorPasswordMessage}
              </Alert>
            )}
          </Paper>
        </Grid>
      </Content>
    </>
  )
}
