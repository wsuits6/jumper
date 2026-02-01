import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'dark', // 'dark' or 'light'
      
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'dark' ? 'light' : 'dark'
      })),
      
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'jumpcoin-theme',
    }
  )
)

export default useThemeStore