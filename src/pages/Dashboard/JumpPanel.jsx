import { useState, useEffect } from 'react'
import Card from '../../components/ui/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import { addJump, getJumpCount } from '../../services/jumpService.js'
import { FiZap, FiTrendingUp } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi'
import './JumpPanel.css'

function JumpPanel() {
  const [jumpCount, setJumpCount] = useState(0)
  const [isJumping, setIsJumping] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const [combo, setCombo] = useState(0)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Load initial jump count
    const count = getJumpCount()
    setJumpCount(count)
  }, [])

  const createParticles = () => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      angle: (i * 30) * (Math.PI / 180),
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 800)
  }

  const handleJump = () => {
    if (isJumping) return

    setIsJumping(true)
    
    // Add jump and update count
    const newCount = addJump()
    setJumpCount(newCount)
    
    // Increment combo
    setCombo(prev => prev + 1)
    
    // Show reward animation and particles
    setShowReward(true)
    createParticles()
    setTimeout(() => setShowReward(false), 800)
    
    // Reset jumping state
    setTimeout(() => setIsJumping(false), 400)
    
    // Reset combo after 3 seconds of inactivity
    setTimeout(() => setCombo(0), 3000)
  }

  return (
    <Card glass padding="lg" className="jump-panel" glow>
      <div className="jump-panel-header">
        <div className="jump-panel-title-wrapper">
          <HiSparkles className="jump-panel-title-icon" />
          <h2 className="jump-panel-title">Jump Arena</h2>
        </div>
        <p className="jump-panel-subtitle">Earn tokens with every jump</p>
      </div>

      <div className="jump-panel-content">
        {/* Stats Display */}
        <div className="jump-stats-display glass">
          <div className="jump-stat-item">
            <span className="jump-stat-label">Total Jumps</span>
            <span className="jump-stat-value text-gradient">{jumpCount.toLocaleString()}</span>
          </div>
          
          {combo > 1 && (
            <div className="jump-combo-badge">
              <FiZap className="combo-icon" />
              <span className="combo-text">{combo}x Combo!</span>
            </div>
          )}
        </div>

        {/* Jump Button Area */}
        <div className="jump-button-area">
          <div className="jump-button-container">
            {/* Glow rings */}
            <div className="jump-glow-ring jump-glow-ring-1"></div>
            <div className="jump-glow-ring jump-glow-ring-2"></div>
            <div className="jump-glow-ring jump-glow-ring-3"></div>

            {/* Main Jump Button */}
            <button
              className={`jump-button ${isJumping ? 'jumping' : ''}`}
              onClick={handleJump}
              disabled={isJumping}
            >
              <div className="jump-button-inner">
                <FiTrendingUp className="jump-button-icon" />
                <span className="jump-button-text">JUMP</span>
              </div>
            </button>

            {/* Reward popup */}
            {showReward && (
              <div className="jump-reward-popup">
                <span className="reward-amount">+1</span>
                <HiSparkles className="reward-icon" />
              </div>
            )}

            {/* Particle effects */}
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="jump-particle"
                style={{
                  '--particle-angle': `${particle.angle}rad`,
                }}
              />
            ))}

            {/* Ripple effect */}
            {isJumping && (
              <>
                <div className="jump-ripple"></div>
                <div className="jump-ripple jump-ripple-delay"></div>
              </>
            )}
          </div>
        </div>

        {/* Info Text */}
        <div className="jump-info-text">
          <p>Each jump earns you <strong className="text-gradient">1 JumpCoin</strong></p>
          <p className="jump-hint">Keep jumping to build your combo multiplier!</p>
        </div>

        {/* Stats Bar */}
        <div className="jump-performance-stats">
          <div className="performance-stat">
            <div className="performance-stat-icon-wrapper">
              <FiZap className="performance-stat-icon" />
            </div>
            <div className="performance-stat-content">
              <span className="performance-stat-label">Energy</span>
              <div className="performance-stat-bar">
                <div className="performance-stat-fill" style={{ width: '95%' }}></div>
              </div>
              <span className="performance-stat-value">95%</span>
            </div>
          </div>

          <div className="performance-stat">
            <div className="performance-stat-icon-wrapper">
              <FiTrendingUp className="performance-stat-icon" />
            </div>
            <div className="performance-stat-content">
              <span className="performance-stat-label">Streak</span>
              <div className="performance-stat-bar">
                <div className="performance-stat-fill performance-stat-fill-success" style={{ width: `${Math.min(combo * 10, 100)}%` }}></div>
              </div>
              <span className="performance-stat-value">{combo}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default JumpPanel