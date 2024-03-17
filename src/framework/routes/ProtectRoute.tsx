import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { UrlRoutes } from './routes'

type ProtectedRouteProps = {
  isLoged: boolean
  children: ReactElement
  isAuthorized?: boolean
}

export default function ProtectedRoute({
  isLoged,
  children,
  isAuthorized = true,
}: ProtectedRouteProps): ReactElement | null {
  if (isLoged === false || !isAuthorized) {
    return <Navigate to={UrlRoutes.Login} replace></Navigate>
  }
  return children
}
