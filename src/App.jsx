import React, { Suspense, useEffect } from 'react'
import { UserPrivateRoute, privateRoute, publicRoutes } from './routes'
import RenderRoutes from './routes/RenderRoutes'
import { USER_TOKEN, USER_DATA, SET_AUTH } from '@/utils/variables';
import ScreenLoader from '@/components/Loader/ScreenLoader'
import { useDispatch, useSelector } from 'react-redux'
import { getLocalStorage } from '@/utils/localStorage';
import { setIsAuth } from '@/store/slices/features/auth.slice';
const token = getLocalStorage(USER_TOKEN)

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (token) {
      dispatch(setIsAuth(true))
    } else {
      dispatch(setIsAuth(false))
      localStorage.removeItem(USER_TOKEN)
      localStorage.removeItem(USER_DATA)
      localStorage.removeItem(SET_AUTH)
    }
  }, [])
  const setAuth = useSelector((state) => state.auth.isAuth)
  const role = useSelector((state) => state.auth.role)
  let routes
  if (role === "admin" && setAuth) {
    routes = privateRoute
  }
  else if (role === "user" && setAuth) {
    routes = UserPrivateRoute
  }
  else {
    routes = publicRoutes
  }
  return (
    <Suspense fallback={<ScreenLoader />}>
      <RenderRoutes routes={routes} />
    </Suspense>
  )
}

export default App