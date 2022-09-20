import { Grid, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RoleItem } from '../../domains/role.domain'
import { UpdateUser } from '../../domains/user.domain'
import { UrlRoutes } from '../../framework/routes/routes'
import { makeRoleService } from '../../services/role.service'
import { makeUserService } from '../../services/user.service'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import ServerException, { isServerException } from '../../domains/error.domain'
import UserForm from '../molecules/UserForm'
import Content from '../organisms/Content'

type EditUserPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function EditUser({ open, toggleDrawer }: EditUserPageProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [roleId, setRoleId] = useState('')
  const [email, setEmail] = useState('')
  const [dni, setDni] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [roles, setRoles] = useState<RoleItem[]>([])

  const roleService = makeRoleService()
  const userService = makeUserService()

  const navigate = useNavigate()

  const { id } = useParams()

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      if (!id) {
        return
      }
      const userId = parseInt(id)
      const _roleId = parseInt(roleId ?? 0)

      const user = new UpdateUser(
        dni,
        firstName,
        lastName,
        phone,
        _roleId,
        email,
        password,
        confirmPassword,
      )

      const _errors = user.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      await userService.update(userId, user)

      clearForm()

      navigate(UrlRoutes.Users, { replace: true })
    } catch (error) {
      // eslint-disable-next-line no-debugger
      debugger
      if (isServerException(error)) {
        const { message } = error as ServerException
        console.log(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const clearForm = () => {
    setFirstName('')
    setLastName('')
    setPhone('')
    setRoleId('')
    setEmail('')
    setDni('')
    setPassword('')
    setConfirmPassword('')
    setErrors({})
  }

  const loadRoles = async () => {
    try {
      const _roles = await roleService.getAll()
      setRoles(_roles)
    } catch {
      console.error('error')
    }
  }

  const loadUser = async () => {
    try {
      if (!id) {
        return
      }
      const userId = parseInt(id)
      const _user = await userService.getById(userId)
      setFirstName(_user.firstName)
      setLastName(_user.lastName)
      setPhone(_user.phone)
      setRoleId(_user.role.id.toString())
      setEmail(_user.email)
      setDni(_user.dni)
    } catch {
      console.error('error')
    }
  }

  useEffect(() => {
    loadRoles()
    loadUser()
  }, [])

  return (
    <>
      <Content title='Actualizar usuario' open={open} toggleDrawer={toggleDrawer}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <UserForm
              isLoading={isLoading}
              firstName={firstName}
              lastName={lastName}
              phone={phone}
              roleId={roleId}
              email={email}
              dni={dni}
              password={password}
              confirmPassword={confirmPassword}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setPhone={setPhone}
              setRoleId={setRoleId}
              setEmail={setEmail}
              setDni={setDni}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              roles={roles}
              errors={errors}
              onSubmit={handleSubmit}
            />
          </Paper>
        </Grid>
      </Content>
    </>
  )
}
