import { useState, useEffect } from 'react'
import Card from '../../components/ui/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import { getJumpCount } from '../../services/jumpService.js'
import { FiTrendingUp, FiAward, FiArrowUpRight, FiDollarSign } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi'
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
        setTimeout(() => setIsAnimating(false), 400)
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

  const estimatedValue = (balance * 0.1).toFixed(2)

  return (
    <Card glass padding="lg" className="token-balance-card" glow>
      <div className="token-balance-header">
        <div className="token-balance-title-wrapper">
          <HiSparkles className="token-balance-title-icon" />
          <h2 className="token-balance-title">Token Balance</h2>
        </div>
        <div className="token-balance-badge">
          <FiAward className="badge-icon" />
          <span className="badge-text">Premium</span>
        </div>
      </div>

      <div className="token-balance-content">
        {/* Main Balance Display */}
        <div className="balance-main-display">
          <div className="balance-icon-container">
            <div className="balance-icon-wrapper">
              <div className="balance-icon-glow"></div>
              <FiDollarSign className="balance-icon float" />
              <div className="balance-icon-ring"></div>
              <div className="balance-icon-ring balance-icon-ring-2"></div>
            </div>
          </div>

          <div className={`balance-amount-wrapper ${isAnimating ? 'animating' : ''}`}>
            <div className="balance-amount">
              <span className="balance-value text-gradient">{balance.toLocaleString()}</span>
              <span className="balance-currency">JUMP</span>
            </div>
            <div className="balance-usd-value">
              ≈ ${estimatedValue} USD
            </div>
          </div>

          {getDailyIncrease() > 0 && (
            <div className="balance-increase-badge">
              <FiArrowUpRight className="increase-icon" />
              <span className="increase-text">+{getDailyIncrease()} today</span>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="balance-quick-stats">
          <div className="quick-stat glass">
            <span className="quick-stat-label">Your Rank</span>
            <span className="quick-stat-value">#1</span>
            <span className="quick-stat-change positive">↑ Top 1%</span>
          </div>
          <div className="quick-stat glass">
            <span className="quick-stat-label">Level</span>
            <span className="quick-stat-value">{Math.floor(balance / 100) + 1}</span>
            <span className="quick-stat-change">Active</span>
          </div>
          <div className="quick-stat glass">
            <span className="quick-stat-label">24h Earnings</span>
            <span className="quick-stat-value">{balance}</span>
            <span className="quick-stat-change positive">+100%</span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="balance-progress-section">
          <div className="progress-header">
            <div className="progress-title-wrapper">
              <FiTrendingUp className="progress-icon" />
              <span className="progress-title">Next Milestone</span>
            </div>
            <span className="progress-percentage">{Math.min(100, progress.toFixed(0))}%</span>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar-track">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${Math.min(100, progress)}%` }}
              >
                <div className="progress-bar-shimmer"></div>
                <div className="progress-bar-glow"></div>
              </div>
            </div>
          </div>

          <div className="progress-details">
            <span className="progress-current">{balance.toLocaleString()}</span>
            <span className="progress-separator">/</span>
            <span className="progress-target">{milestone.toLocaleString()} JUMP</span>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="balance-rewards-section glass">
          <div className="rewards-header">
            <HiSparkles className="rewards-icon" />
            <span className="rewards-title">Active Boosts</span>
          </div>
          <div className="rewards-list">
            <div className="reward-item">
              <div className="reward-item-icon">⚡</div>
              <div className="reward-item-content">
                <span className="reward-item-title">Energy Boost</span>
                <span className="reward-item-subtitle">+25% jump power</span>
              </div>
              <div className="reward-item-status active">Active</div>
            </div>
            <div className="reward-item">
              <div className="reward-item-icon">🔥</div>
              <div className="reward-item-content">
                <span className="reward-item-title">Streak Bonus</span>
                <span className="reward-item-subtitle">7-day streak</span>
              </div>
              <div className="reward-item-status active">2x</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="balance-actions">
          <Button variant="primary" size="md" fullWidth jump>
            <FiArrowUpRight />
            Withdraw Tokens
          </Button>
          <Button variant="glass" size="md" fullWidth>
            <FiTrendingUp />
            View Analytics
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default TokenBalance