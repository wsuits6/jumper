import { create } from 'zustand'

const useJumpStore = create((set, get) => ({
  // State
  jumpCount: 0,
  lastJumpTime: null,
  combo: 0,
  dailyJumps: 0,
  totalEarnings: 0,

  // Actions
  incrementJump: () => set((state) => ({
    jumpCount: state.jumpCount + 1,
    totalEarnings: state.totalEarnings + 1,
    dailyJumps: state.dailyJumps + 1,
    lastJumpTime: Date.now(),
    combo: state.combo + 1
  })),

  resetCombo: () => set({ combo: 0 }),

  resetDailyJumps: () => set({ dailyJumps: 0 }),

  setJumpCount: (count) => set({ jumpCount: count }),

  // Getters
  getJumpCount: () => get().jumpCount,
  getCombo: () => get().combo,
  getDailyJumps: () => get().dailyJumps,
}))

export default useJumpStore