import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Card from '../../components/ui/Card.jsx'
import Input from '../../components/ui/Input.jsx'
import Button from '../../components/ui/Button.jsx'
import ThemeToggle from '../../components/ui/ThemeToggle.jsx'
import { FiMail, FiLock, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
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
    <div className="auth-page-standalone">
      <div className="auth-theme-toggle">
        <ThemeToggle />
      </div>

      {/* Back button */}
      <div className="auth-back-button">
        <Button 
          variant="glass" 
          size="sm"
          onClick={() => navigate('/')}
          icon={<FiArrowLeft />}
        >
          Back to Home
        </Button>
      </div>

      {/* Login Form Section */}
      <div className="auth-form-section-centered">
        <div className="auth-form-container">
          <div className="auth-form-header slide-up">
            <h2 className="auth-form-title text-gradient">Welcome Back</h2>
            <p className="auth-form-subtitle">Connect your wallet and start earning</p>
          </div>

          <Card glass padding="lg" className="auth-card bounce-enter">
            <form onSubmit={handleSubmit} className="auth-form">
              <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="satoshi@jumpcoin.io"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                icon={<FiMail />}
                size="lg"
                glass
                required
                disabled={isLoading}
              />

              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                icon={<FiLock />}
                size="lg"
                glass
                required
                disabled={isLoading}
              />

              <div className="auth-form-options">
                <label className="auth-checkbox">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="auth-link-text">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isLoading}
                jump
                icon={<FiArrowRight />}
                iconPosition="right"
              >
                {isLoading ? 'Connecting...' : 'Sign In'}
              </Button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <div className="auth-social">
              <Button variant="glass" size="lg" fullWidth>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="auth-social-icon" />
                Continue with Google
              </Button>
            </div>

            <div className="auth-footer">
              <p className="auth-footer-text">
                Don't have an account?{' '}
                <Link to="/register" className="auth-link">
                  Sign up now
                </Link>
              </p>
            </div>
          </Card>

          {/* Trust badges */}
          <div className="auth-trust-badges slide-up">
            <div className="trust-badge">
              <div className="trust-badge-icon">🔒</div>
              <span>Bank-level security</span>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">⚡</div>
              <span>Lightning fast</span>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">🌍</div>
              <span>Global access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login