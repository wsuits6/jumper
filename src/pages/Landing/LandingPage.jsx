import { useNavigate } from 'react-router-dom'
import HeroSection from '../../components/HeroSection/HeroSection.jsx'
import ThemeToggle from '../../components/ui/ThemeToggle.jsx'
import Button from '../../components/ui/Button.jsx'
import { FiArrowRight, FiLogIn } from 'react-icons/fi'
import './LandingPage.css'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="landing-page">
      <div className="landing-theme-toggle">
        <ThemeToggle />
      </div>

      {/* Floating action buttons */}
      <div className="landing-actions">
        <Button 
          variant="glass" 
          size="md"
          onClick={() => navigate('/login')}
          icon={<FiLogIn />}
        >
          Sign In
        </Button>
        <Button 
          variant="primary" 
          size="md"
          onClick={() => navigate('/register')}
          icon={<FiArrowRight />}
          iconPosition="right"
          jump
        >
          Get Started
        </Button>
      </div>

      {/* Hero Section with dynamic images */}
      <HeroSection />
    </div>
  )
}

export default LandingPage