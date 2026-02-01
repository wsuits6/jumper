import { useState, useEffect } from 'react'
import Card from '../../components/ui/Card.jsx'
import { getJumpCount } from '../../services/jumpService.js'
import './TokenBalance.css'

function TokenBalance() {
  const [balance, setBalance] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [previousBalance, setPreviousBalance] = useState(0)

  useEffect(() => {
    // Initial load
    const count = getJumpCount()
    setBalance(count)
    setPreviousBalance(count)

    // Poll for updates every 500ms
    const interval = setInterval(() => {
      const newCount = getJumpCount()
      if (newCount !== balance) {
        setPreviousBalance(balance)
        setBalance(newCount)
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 300)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [balance])

  const getNextMilestone = (current) => {
    if (current < 100) return 100
    if (current < 500) return 500
    if (current < 1000) return 1000
    if (current < 5000) return 5000
    return Math.ceil(current / 1000) * 1000
  }

  const milestone = getNextMilestone(balance)
  const progress = (balance / milestone) * 100

  const getDailyIncrease = () => {
    return balance - previousBalance
  }

  return (
    <Card padding="lg" className="token-balance">
      <div className="token-balance-header">
        <h2 className="token-balance-title">Your Balance</h2>
        <div className="token-balance-badge">
          <span className="badge-icon">🏆</span>
          <span className="badge-text">Premium</span>
        </div>
      </div>

      <div className="token-balance-content">
        <div className="token-icon-container">
          <div className="token-icon-wrapper">
            <span className="token-icon">💰</span>
            <div className="token-icon-glow"></div>
          </div>
        </div>
        
        <div className={`token-amount ${isAnimating ? 'animating' : ''}`}>
          <span className="token-value">{balance.toLocaleString()}</span>
          <span className="token-currency">JumpCoins</span>
        </div>

        {getDailyIncrease() > 0 && (
          <div className="token-increase">
            <span className="increase-icon">↗</span>
            <span className="increase-text">+{getDailyIncrease()} today</span>
          </div>
        )}

        <div className="token-stats">
          <div className="token-stat-item">
            <span className="token-stat-label">Rank</span>
            <span className="token-stat-value">#1</span>
          </div>
          <div className="token-stat-divider"></div>
          <div className="token-stat-item">
            <span className="token-stat-label">Level</span>
            <span className="token-stat-value">{Math.floor(balance / 100) + 1}</span>
          </div>
          <div className="token-stat-divider"></div>
          <div className="token-stat-item">
            <span className="token-stat-label">Today</span>
            <span className="token-stat-value">{balance}</span>
          </div>
        </div>
      </div>

      <div className="token-footer">
        <div className="token-progress">
          <div className="token-progress-label">
            <span>Next Milestone</span>
            <span>{Math.min(100, progress.toFixed(0))}%</span>
          </div>
          <div className="token-progress-bar">
            <div 
              className="token-progress-fill" 
              style={{ width: `${Math.min(100, progress)}%` }}
            >
              <div className="token-progress-shimmer"></div>
            </div>
          </div>
          <div className="token-progress-target">
            {balance.toLocaleString()} / {milestone.toLocaleString()} jumps
          </div>
        </div>

        <div className="token-rewards">
          <div className="reward-item">
            <span className="reward-icon">⚡</span>
            <span className="reward-text">Energy Boost Active</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default TokenBalance