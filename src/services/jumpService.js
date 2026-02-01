// Simple jump tracking service using localStorage

const STORAGE_KEY = 'jumpcoin_count'

/**
 * Get the current jump count from localStorage
 * @returns {number} Current jump count
 */
export const getJumpCount = () => {
  const count = localStorage.getItem(STORAGE_KEY)
  return count ? parseInt(count, 10) : 0
}

/**
 * Add a jump and return the new count
 * @returns {number} New jump count
 */
export const addJump = () => {
  const currentCount = getJumpCount()
  const newCount = currentCount + 1
  localStorage.setItem(STORAGE_KEY, newCount.toString())
  return newCount
}

/**
 * Reset jump count to zero
 * @returns {number} Returns 0
 */
export const resetJumpCount = () => {
  localStorage.setItem(STORAGE_KEY, '0')
  return 0
}

/**
 * Set jump count to a specific value
 * @param {number} count - The count to set
 * @returns {number} The count that was set
 */
export const setJumpCount = (count) => {
  const validCount = Math.max(0, parseInt(count, 10) || 0)
  localStorage.setItem(STORAGE_KEY, validCount.toString())
  return validCount
}