import { ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UrlRoutes } from './routes'

type ProtectedRouteProps = {
  isLoged: boolean
  children: ReactElement
}

export default function ProtectedRoute({
  isLoged,
  children,
}: ProtectedRouteProps): ReactElement | null {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoged) navigate(UrlRoutes.Login, { replace: true })
  }, [])

  return children
}
