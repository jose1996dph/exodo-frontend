import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { UrlRoutes } from './routes'

type ProtectedRouteProps = {
  isLoged: boolean
  children: ReactElement
}

export default function ProtectedRoute({
  isLoged,
  children,
}: ProtectedRouteProps): ReactElement | null {
  if (isLoged === false) {
    return <Navigate to={UrlRoutes.Login} replace></Navigate>
  }
  return children
}
