import { Home } from '../views/Home.tsx'
import { SignUp } from '../views/SignUp.tsx'
import { SignIn } from '../views/SignIn.tsx'
import { Route, Routes, Navigate } from 'react-router-dom'
import { PrivateRoute } from './privateRoute.tsx'
import { ErrorPage } from '../views/ErrorPage.tsx'
import { checkAuth } from '../helpers/checkAuth.ts'

export function AppRouter() {
  const auth = checkAuth()
  return (
    <Routes>
      <Route path='/' element={ <Navigate to={'/signup'} />} />
      <Route path='/*' element={ <ErrorPage />} />
      <Route
        path='/signup'
        element={
          auth ? <Navigate to="/dashboard" /> : <SignUp />}
        />
      <Route
        path='/signin'
        element={
          auth ? <Navigate to="/dashboard" /> : <SignIn />
        }
      />
      <Route path='/404' element={<ErrorPage />} />
      <Route
        path='/dashboard'
        element={
          <PrivateRoute redirectTo='/signin' checkAuth={auth} >
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}