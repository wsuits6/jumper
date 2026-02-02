import './HeroSection.css'
import { FiTrendingUp, FiZap, FiAward } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi'

function HeroSection() {
  return (
    <div className="hero-section">
      {/* Animated Grid Background */}
      <div className="hero-grid"></div>
      
      {/* Floating Orbs */}
      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>
      <div className="hero-orb hero-orb-3"></div>

      <div className="hero-content">
        {/* Logo with Animation */}
        <div className="hero-logo-container">
          <div className="hero-logo-wrapper jump-hover">
            <div className="hero-logo-glow"></div>
            <img src="/logo.png" alt="JumpCoin" className="hero-logo-image float" />
            <div className="hero-logo-ring"></div>
            <div className="hero-logo-ring hero-logo-ring-2"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="hero-title bounce-enter">
          <span className="text-gradient">JumpCoin</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle slide-up">
          The Next Generation of Move-to-Earn
        </p>

        {/* Stats Pills */}
        <div className="hero-stats">
          <div className="hero-stat-pill glass jump-hover">
            <HiSparkles className="hero-stat-icon" />
            <span className="hero-stat-text">Live on Mainnet</span>
          </div>
          <div className="hero-stat-pill glass jump-hover">
            <FiTrendingUp className="hero-stat-icon" />
            <span className="hero-stat-text">$2.4M TVL</span>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="hero-features">
          <div className="hero-feature-card glass jump-hover">
            <div className="hero-feature-icon-wrapper">
              <FiZap className="hero-feature-icon" />
            </div>
            <h3 className="hero-feature-title">Instant Rewards</h3>
            <p className="hero-feature-text">
              Earn tokens instantly with every jump. No delays, no waiting.
            </p>
          </div>

          <div className="hero-feature-card glass jump-hover">
            <div className="hero-feature-icon-wrapper">
              <FiTrendingUp className="hero-feature-icon" />
            </div>
            <h3 className="hero-feature-title">Real Value</h3>
            <p className="hero-feature-text">
              Backed by real-world assets with transparent tokenomics.
            </p>
          </div>

          <div className="hero-feature-card glass jump-hover">
            <div className="hero-feature-icon-wrapper">
              <FiAward className="hero-feature-icon" />
            </div>
            <h3 className="hero-feature-title">Compete & Win</h3>
            <p className="hero-feature-text">
              Join global leaderboards and win exclusive rewards.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll-indicator">
          <div className="hero-scroll-arrow"></div>
          <span className="hero-scroll-text">Scroll to start earning</span>
        </div>
      </div>
    </div>
  )
}

export default HeroSection