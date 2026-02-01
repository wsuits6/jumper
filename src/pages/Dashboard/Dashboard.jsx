import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import JumpPanel from './JumpPanel.jsx'
import TokenBalance from './TokenBalance.jsx'
import Button from '../../components/ui/Button.jsx'
import ThemeToggle from '../../components/ui/ThemeToggle.jsx'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('authToken')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    navigate('/login')
  }

  const userName = localStorage.getItem('userName') || 'Jumper'

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-logo-container">
            <img src="/logo.png" alt="JumpCoin" className="dashboard-logo-image" />
            <h1 className="dashboard-logo">JumpCoin</h1>
          </div>
          <div className="dashboard-header-right">
            <span className="dashboard-welcome">Welcome, {userName}!</span>
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-container">
          <div className="dashboard-grid">
            <div className="dashboard-balance-section">
              <TokenBalance />
            </div>

            <div className="dashboard-jump-section">
              <JumpPanel />
            </div>
          </div>

          <div className="dashboard-info">
            <div className="info-card">
              <h3 className="info-title">How it works</h3>
              <ul className="info-list">
                <li>🎯 Click the jump button to earn tokens</li>
                <li>💰 Each jump earns you 1 JumpCoin</li>
                <li>🚀 Build your balance and compete with others</li>
                <li>🏆 More features coming soon!</li>
              </ul>
            </div>

            <div className="info-card">
              <h3 className="info-title">Stats & Achievements</h3>
              <div className="achievements-grid">
                <div className="achievement-badge">
                  <span className="achievement-icon">🎖️</span>
                  <span className="achievement-text">Beginner</span>
                </div>
                <div className="achievement-badge locked">
                  <span className="achievement-icon">🥉</span>
                  <span className="achievement-text">100 Jumps</span>
                </div>
                <div className="achievement-badge locked">
                  <span className="achievement-icon">🥈</span>
                  <span className="achievement-text">500 Jumps</span>
                </div>
                <div className="achievement-badge locked">
                  <span className="achievement-icon">🥇</span>
                  <span className="achievement-text">1000 Jumps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard