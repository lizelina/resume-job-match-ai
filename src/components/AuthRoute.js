//Higher level component to check if user is authenticated or not

//If authenticated, render the children components
//If not authenticated, redirect to the login page
import { getToken } from '../utils'
import { Navigate } from 'react-router-dom'

export function AuthRoute ({ children }) {
  const token =  getToken()
  console.log('Have Token:', token)
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to={'/login'} replace />
  }
}