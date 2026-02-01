// Authentication service using localStorage for MVP

const AUTH_TOKEN_KEY = 'authToken'
const USER_EMAIL_KEY = 'userEmail'
const USER_NAME_KEY = 'userName'

/**
 * Register a new user (mock implementation)
 * @param {Object} userData - User registration data
 * @param {string} userData.name - User's name
 * @param {string} userData.email - User's email
 * @param {string} userData.password - User's password
 * @returns {Promise<Object>} User data and token
 */
export const register = async (userData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Mock validation
  if (!userData.email || !userData.password || !userData.name) {
    throw new Error('All fields are required')
  }

  // Create mock token
  const token = `mock-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  // Store in localStorage
  localStorage.setItem(AUTH_TOKEN_KEY, token)
  localStorage.setItem(USER_EMAIL_KEY, userData.email)
  localStorage.setItem(USER_NAME_KEY, userData.name)

  return {
    token,
    user: {
      email: userData.email,
      name: userData.name
    }
  }
}

/**
 * Login user (mock implementation)
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User's email
 * @param {string} credentials.password - User's password
 * @returns {Promise<Object>} User data and token
 */
export const login = async (credentials) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Mock validation
  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password are required')
  }

  // Create mock token
  const token = `mock-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  // Store in localStorage
  localStorage.setItem(AUTH_TOKEN_KEY, token)
  localStorage.setItem(USER_EMAIL_KEY, credentials.email)

  // If name exists in storage, retrieve it
  const existingName = localStorage.getItem(USER_NAME_KEY) || 'Jumper'

  return {
    token,
    user: {
      email: credentials.email,
      name: existingName
    }
  }
}

/**
 * Logout user
 * @returns {void}
 */
export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(USER_EMAIL_KEY)
  localStorage.removeItem(USER_NAME_KEY)
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  return !!token
}

/**
 * Get current auth token
 * @returns {string|null} Auth token or null
 */
export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

/**
 * Get current user data
 * @returns {Object|null} User data or null
 */
export const getCurrentUser = () => {
  const token = getAuthToken()
  if (!token) return null

  return {
    email: localStorage.getItem(USER_EMAIL_KEY),
    name: localStorage.getItem(USER_NAME_KEY) || 'Jumper'
  }
}