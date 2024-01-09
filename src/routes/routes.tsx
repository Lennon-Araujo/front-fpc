import { Home } from '../views/Home.tsx'
import { SignUp } from '../views/SignUp.tsx'
import { SignIn } from '../views/SignIn.tsx'
import { Route, Routes, Navigate } from 'react-router-dom'
import { PrivateRoute } from './privateRoute.tsx'

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={ <Navigate to={'/signup'} />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route
        path='/dashboard'
        element={
          <PrivateRoute redirectTo='/signin'>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}