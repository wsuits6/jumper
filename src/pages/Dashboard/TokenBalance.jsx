import { useState, useEffect } from 'react'
import Card from '../../components/ui/Card.jsx'
import { getJumpCount } from '../../services/jumpService.js'
import './TokenBalance.css'

function TokenBalance() {
  const [balance, setBalance] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Initial load
    const count = getJumpCount()
    setBalance(count)

    // Poll for updates every 500ms
    const interval = setInterval(() => {
      const newCount = getJumpCount()
      if (newCount !== balance) {
        setBalance(newCount)
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 300)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [balance])

  return (
    <Card padding="lg" className="token-balance">
      <div className="token-balance-header">
        <h2 className="token-balance-title">Your Balance</h2>
      </div>

      <div className="token-balance-content">
        <div className="token-icon">💰</div>
        
        <div className={`token-amount ${isAnimating ? 'animating' : ''}`}>
          <span className="token-value">{balance.toLocaleString()}</span>
          <span className="token-currency">JumpCoins</span>
        </div>

        <div className="token-stats">
          <div className="token-stat-item">
            <span className="token-stat-label">Rank</span>
            <span className="token-stat-value">#1</span>
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
            <span>{Math.min(100, Math.floor((balance / 100) * 100))}%</span>
          </div>
          <div className="token-progress-bar">
            <div 
              className="token-progress-fill" 
              style={{ width: `${Math.min(100, (balance % 100))}%` }}
            ></div>
          </div>
          <div className="token-progress-target">
            {balance} / {Math.ceil(balance / 100) * 100} jumps
          </div>
        </div>
      </div>
    </Card>
  )
}

export default TokenBalance