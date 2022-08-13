import { FC } from 'react'
import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
  isLoged: boolean
  children: React.ReactElement
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isLoged,
  children,
}: ProtectedRouteProps): React.ReactElement | null => {
  if (!isLoged) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default ProtectedRoute
