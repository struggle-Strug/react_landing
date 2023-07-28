import { Navigate, Outlet } from 'react-router-dom'

export const SuperuserRoutes = () => {
  const userFromStorage = localStorage.getItem("user")
  const isSuperuser = userFromStorage.is_superuser ? true : false
  return (
    isSuperuser ? <Outlet />: <Navigate to='/login' />
  )
}

export default SuperuserRoutes
