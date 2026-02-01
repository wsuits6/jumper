import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Auth/Login.jsx'
import Register from '../pages/Auth/Register.jsx'
import Dashboard from '../pages/Dashboard/Dashboard.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
])