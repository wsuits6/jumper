import { create } from 'zustand'

const useAuthStore = create((set, get) => ({
  // State
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),

  setToken: (token) => set({ token }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      // Mock login - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const token = `mock-token-${Date.now()}`
      const user = { email, name: email.split('@')[0] }
      
      localStorage.setItem('authToken', token)
      localStorage.setItem('userEmail', email)
      localStorage.setItem('userName', user.name)
      
      set({ 
        user, 
        token, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      })
      
      return { success: true }
    } catch (error) {
      set({ 
        error: error.message, 
        isLoading: false 
      })
      return { success: false, error: error.message }
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null })
    try {
      // Mock registration - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const token = `mock-token-${Date.now()}`
      const user = { email, name }
      
      localStorage.setItem('authToken', token)
      localStorage.setItem('userEmail', email)
      localStorage.setItem('userName', name)
      
      set({ 
        user, 
        token, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      })
      
      return { success: true }
    } catch (error) {
      set({ 
        error: error.message, 
        isLoading: false 
      })
      return { success: false, error: error.message }
    }
  },

  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    
    set({ 
      user: null, 
      token: null, 
      isAuthenticated: false,
      error: null 
    })
  },

  checkAuth: () => {
    const token = localStorage.getItem('authToken')
    const email = localStorage.getItem('userEmail')
    const name = localStorage.getItem('userName')
    
    if (token && email) {
      set({ 
        user: { email, name: name || 'Jumper' }, 
        token, 
        isAuthenticated: true 
      })
      return true
    }
    
    return false
  },

  clearError: () => set({ error: null }),

  // Getters
  getUser: () => get().user,
  getToken: () => get().token,
  getIsAuthenticated: () => get().isAuthenticated,
}))

export default useAuthStore