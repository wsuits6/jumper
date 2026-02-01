import { useState, useEffect } from 'react'
import Card from '../../components/ui/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import { addJump, getJumpCount } from '../../services/jumpService.js'
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
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      angle: (i * 45) * (Math.PI / 180),
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 600)
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
    setTimeout(() => setShowReward(false), 600)
    
    // Reset jumping state
    setTimeout(() => setIsJumping(false), 300)
    
    // Reset combo after 3 seconds of inactivity
    setTimeout(() => setCombo(0), 3000)
  }

  return (
    <Card padding="lg" className="jump-panel">
      <div className="jump-panel-header">
        <h2 className="jump-panel-title">Jump to Earn</h2>
        <p className="jump-panel-subtitle">Click the button and earn tokens!</p>
      </div>

      <div className="jump-panel-content">
        <div className="jump-stats">
          <div className="jump-stat">
            <span className="jump-stat-label">Total Jumps</span>
            <span className="jump-stat-value">{jumpCount.toLocaleString()}</span>
          </div>
          {combo > 1 && (
            <div className="jump-combo">
              <span className="jump-combo-text">🔥 {combo}x Combo!</span>
            </div>
          )}
        </div>

        <div className="jump-button-wrapper">
          <div className="jump-button-container">
            <Button
              variant="primary"
              size="lg"
              className={`jump-button ${isJumping ? 'jumping' : ''}`}
              onClick={handleJump}
              disabled={isJumping}
            >
              <span className="jump-button-icon">🚀</span>
              <span className="jump-button-text">JUMP!</span>
            </Button>

            {/* Reward popup */}
            {showReward && (
              <div className="jump-reward">
                +1 💰
              </div>
            )}

            {/* Particle effects */}
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="jump-particle"
                style={{
                  '--angle': `${particle.angle}rad`,
                }}
              />
            ))}

            {/* Ripple effect */}
            {isJumping && (
              <div className="jump-ripple"></div>
            )}
          </div>
        </div>

        <div className="jump-info">
          <p className="jump-info-text">
            Each jump earns you <strong>1 JumpCoin</strong>
          </p>
        </div>

        {/* Stats bar */}
        <div className="jump-stats-bar">
          <div className="jump-stats-item">
            <span className="jump-stats-icon">⚡</span>
            <div className="jump-stats-details">
              <span className="jump-stats-label">Energy</span>
              <span className="jump-stats-value">100%</span>
            </div>
          </div>
          <div className="jump-stats-item">
            <span className="jump-stats-icon">🎯</span>
            <div className="jump-stats-details">
              <span className="jump-stats-label">Accuracy</span>
              <span className="jump-stats-value">Perfect</span>
            </div>
          </div>
          <div className="jump-stats-item">
            <span className="jump-stats-icon">⭐</span>
            <div className="jump-stats-details">
              <span className="jump-stats-label">Streak</span>
              <span className="jump-stats-value">{combo}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default JumpPanel