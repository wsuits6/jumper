import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import JumpPanel from './JumpPanel.jsx'
import TokenBalance from './TokenBalance.jsx'
import Button from '../../components/ui/Button.jsx'
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
          <h1 className="dashboard-logo">🚀 JumpCoin</h1>
          <div className="dashboard-header-right">
            <span className="dashboard-welcome">Welcome, {userName}!</span>
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
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard