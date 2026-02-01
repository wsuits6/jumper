import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import useThemeStore from '../store/useThemeStore.js'

function App() {
  const { theme } = useThemeStore()

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return <RouterProvider router={router} />
}

export default App