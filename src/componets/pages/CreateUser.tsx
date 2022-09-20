import { Grid, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoleItem } from '../../domains/role.domain'
import { CreateUser as CreateUserRequest } from '../../domains/user.domain'
import { UrlRoutes } from '../../framework/routes/routes'
import { makeRoleService } from '../../services/role.service'
import { makeUserService } from '../../services/user.service'
import ServerException, { isServerException } from '../../domains/error.domain'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import UserForm from '../molecules/UserForm'
import Content from '../organisms/Content'

type CreateUserPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function CreateUser({ open, toggleDrawer }: CreateUserPageProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [roleId, setRoleId] = useState('')
  const [email, setEmail] = useState('')
  const [dni, setDni] = useState('')

  const [roles, setRoles] = useState<RoleItem[]>([])

  const roleService = makeRoleService()
  const userService = makeUserService()

  const navigate = useNavigate()

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const _roleId = parseInt(roleId)

      const user = new CreateUserRequest(dni, firstName, lastName, phone, _roleId, email)

      const _errors = user.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      await userService.create(user)

      clearForm()

      navigate(UrlRoutes.Users, { replace: true })
    } catch (error) {
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

  useEffect(() => {
    loadRoles()
  }, [])

  return (
    <>
      <Content title='Nuevo usuario' open={open} toggleDrawer={toggleDrawer}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <UserForm
              isLoading={isLoading}
              firstName={firstName}
              lastName={lastName}
              phone={phone}
              roleId={roleId}
              email={email}
              dni={dni}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setPhone={setPhone}
              setRoleId={setRoleId}
              setEmail={setEmail}
              setDni={setDni}
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
