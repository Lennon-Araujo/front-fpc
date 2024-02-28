import { Home } from '../views/Home.tsx'
import { SignUp } from '../views/SignUp.tsx'
import { SignIn } from '../views/SignIn.tsx'
import { Route, Routes, Navigate } from 'react-router-dom'
import { PrivateRoute } from './privateRoute.tsx'
import { ErrorPage } from '../views/ErrorPage.tsx'
import { ShareControl } from '../views/ShareControl.tsx'

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={ <Navigate to={'/dashboard'} />} />
      <Route path='/*' element={ <ErrorPage />} />
      <Route
        path='/signup'
        element={
          <SignUp />}
        />
      <Route
        path='/signin'
        element={
          <SignIn />
        }
      />
      <Route path='/404' element={<ErrorPage />} />
      <Route
        path='/dashboard'
        element={
          <PrivateRoute redirectTo='/signin' >
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path='/share-control'
        element={
          <PrivateRoute redirectTo='/signin' >
            <ShareControl />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}