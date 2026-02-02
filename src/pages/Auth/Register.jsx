import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Card from '../../components/ui/Card.jsx'
import Input from '../../components/ui/Input.jsx'
import Button from '../../components/ui/Button.jsx'
import ThemeToggle from '../../components/ui/ThemeToggle.jsx'
import { FiMail, FiLock, FiUser, FiArrowRight, FiCheckCircle, FiArrowLeft } from 'react-icons/fi'
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
  const [agreedToTerms, setAgreedToTerms] = useState(false)

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

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions'
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

      {/* Register Form Section */}
      <div className="auth-form-section-centered">
        <div className="auth-form-container">
          <div className="auth-form-header slide-up">
            <h2 className="auth-form-title text-gradient">Create Account</h2>
            <p className="auth-form-subtitle">Join the future of Move-to-Earn</p>
          </div>

          <Card glass padding="lg" className="auth-card bounce-enter">
            <form onSubmit={handleSubmit} className="auth-form">
              <Input
                type="text"
                name="name"
                label="Full Name"
                placeholder="Satoshi Nakamoto"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                icon={<FiUser />}
                size="lg"
                glass
                required
                disabled={isLoading}
              />

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
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                icon={<FiLock />}
                size="lg"
                glass
                required
                disabled={isLoading}
              />

              <Input
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                icon={<FiCheckCircle />}
                size="lg"
                glass
                required
                disabled={isLoading}
              />

              <div className="auth-terms">
                <label className="auth-checkbox">
                  <input 
                    type="checkbox" 
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  <span>
                    I agree to the{' '}
                    <Link to="/terms" className="auth-link-text">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="auth-link-text">Privacy Policy</Link>
                  </span>
                </label>
                {errors.terms && <span className="auth-terms-error">{errors.terms}</span>}
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
                {isLoading ? 'Creating Account...' : 'Create Account'}
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
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Sign in
                </Link>
              </p>
            </div>
          </Card>

          {/* Benefits */}
          <div className="auth-benefits slide-up">
            <div className="benefit-item">
              <FiCheckCircle className="benefit-icon" />
              <span>No credit card required</span>
            </div>
            <div className="benefit-item">
              <FiCheckCircle className="benefit-icon" />
              <span>Start earning instantly</span>
            </div>
            <div className="benefit-item">
              <FiCheckCircle className="benefit-icon" />
              <span>Free to get started</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register