import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  const userFromStorage = localStorage.getItem("user")
  const hasUser = userFromStorage ? true : false
  return (
    hasUser ? <Outlet />: <Navigate to='/login' />
  )
}

export default PrivateRoutes
