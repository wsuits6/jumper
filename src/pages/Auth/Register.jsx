import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Card from '../../components/ui/Card.jsx'
import Input from '../../components/ui/Input.jsx'
import Button from '../../components/ui/Button.jsx'
import ThemeToggle from '../../components/ui/ThemeToggle.jsx'
import './Auth.css'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // Store auth token (mock)
      localStorage.setItem('authToken', 'mock-token-' + Date.now())
      localStorage.setItem('userEmail', formData.email)
      localStorage.setItem('userName', formData.name)
      setIsLoading(false)
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <div className="auth-container">
      <div className="auth-theme-toggle">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-logo">
            <img src="/logo.png" alt="JumpCoin" className="hero-logo-image" />
          </div>
          <h1 className="hero-title gradient-text">JumpCoin</h1>
          <p className="hero-subtitle">Jump to Earn. The Future of Move-to-Earn.</p>
          <div className="hero-features">
            <div className="hero-feature">
              <span className="hero-feature-icon">🚀</span>
              <span className="hero-feature-text">Instant Rewards</span>
            </div>
            <div className="hero-feature">
              <span className="hero-feature-icon">💰</span>
              <span className="hero-feature-text">Real Tokens</span>
            </div>
            <div className="hero-feature">
              <span className="hero-feature-icon">🏆</span>
              <span className="hero-feature-text">Compete & Win</span>
            </div>
          </div>
        </div>
      </div>

      {/* Register Form */}
      <div className="auth-content">
        <div className="auth-header">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-description">Start jumping and earning tokens today</p>
        </div>

        <Card padding="lg" className="auth-card">
          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              type="text"
              name="name"
              label="Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
              disabled={isLoading}
            />

            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              disabled={isLoading}
            />

            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
              disabled={isLoading}
            />

            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
              disabled={isLoading}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Register