import { useEffect, useState } from 'react'
import { getToken } from '../framework/helpers/auth.helper'
import { useLocation } from 'react-router-dom'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { Role } from '../domains/role.domain'

interface CustomJwtPayload extends JwtPayload {
  roleId: number
}

export default function useAuth(): [boolean, (role: Role) => boolean] {
  const location = useLocation()
  const [isLoged, setIsloged] = useState(getToken() !== null)
  const [user, setUser] = useState<any>()

  useEffect(() => {
    const token = getToken()
    if (!token) {
      setIsloged(false)
      return
    }
    setIsloged(true)

    const user = jwtDecode<CustomJwtPayload>(token)

    setUser(user)
  }, [location])

  const isAuthorized = (role: Role) => {
    if (!user) {
      return false
    }
    return role === user.roleId
  }

  return [isLoged, isAuthorized]
}
