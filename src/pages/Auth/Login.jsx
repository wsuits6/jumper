import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Card from '../../components/ui/Card.jsx'
import Input from '../../components/ui/Input.jsx'
import Button from '../../components/ui/Button.jsx'
import ThemeToggle from '../../components/ui/ThemeToggle.jsx'
import './Auth.css'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

      {/* Login Form */}
      <div className="auth-content">
        <div className="auth-header">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-description">Sign in to continue jumping and earning</p>
        </div>

        <Card padding="lg" className="auth-card">
          <form onSubmit={handleSubmit} className="auth-form">
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

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Login