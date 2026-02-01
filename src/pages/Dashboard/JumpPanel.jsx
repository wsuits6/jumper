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

  useEffect(() => {
    // Load initial jump count
    const count = getJumpCount()
    setJumpCount(count)
  }, [])

  const handleJump = () => {
    if (isJumping) return

    setIsJumping(true)
    
    // Add jump and update count
    const newCount = addJump()
    setJumpCount(newCount)
    
    // Increment combo
    setCombo(prev => prev + 1)
    
    // Show reward animation
    setShowReward(true)
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

          {showReward && (
            <div className="jump-reward">
              +1 💰
            </div>
          )}
        </div>

        <div className="jump-info">
          <p className="jump-info-text">
            Each jump earns you <strong>1 JumpCoin</strong>
          </p>
        </div>
      </div>
    </Card>
  )
}

export default JumpPanel