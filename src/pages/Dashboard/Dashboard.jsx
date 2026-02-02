import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import JumpPanel from './JumpPanel.jsx'
import TokenBalance from './TokenBalance.jsx'
import Button from '../../components/ui/Button.jsx'
import ThemeToggle from '../../components/ui/ThemeToggle.jsx'
import { FiLogOut, FiTrendingUp, FiZap, FiAward, FiUsers, FiActivity } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi'
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
      {/* Header */}
      <header className="dashboard-header glass">
        <div className="dashboard-header-content">
          <div className="dashboard-logo-section jump-hover">
            <img src="/logo.png" alt="JumpCoin" className="dashboard-logo-image float" />
            <div className="dashboard-logo-text">
              <h1 className="dashboard-logo-title text-gradient">JumpCoin</h1>
              <span className="dashboard-logo-subtitle">Dashboard</span>
            </div>
          </div>

          <div className="dashboard-header-right">
            <div className="dashboard-user-info">
              <div className="user-avatar jump-hover">
                <span>{userName.charAt(0).toUpperCase()}</span>
              </div>
              <div className="user-details">
                <span className="user-name">{userName}</span>
                <span className="user-status">
                  <span className="status-dot"></span>
                  Active
                </span>
              </div>
            </div>
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              icon={<FiLogOut />}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          {/* Stats Overview */}
          <div className="dashboard-stats-grid slide-up">
            <div className="stat-card glass jump-hover">
              <div className="stat-icon-wrapper stat-primary">
                <FiTrendingUp className="stat-icon" />
              </div>
              <div className="stat-content">
                <span className="stat-label">Total Value</span>
                <span className="stat-value">$2,450</span>
                <span className="stat-change positive">
                  +12.5% <span className="stat-period">this week</span>
                </span>
              </div>
            </div>

            <div className="stat-card glass jump-hover">
              <div className="stat-icon-wrapper stat-success">
                <FiZap className="stat-icon" />
              </div>
              <div className="stat-content">
                <span className="stat-label">Energy Level</span>
                <span className="stat-value">95%</span>
                <span className="stat-change">
                  <span className="stat-period">Excellent</span>
                </span>
              </div>
            </div>

            <div className="stat-card glass jump-hover">
              <div className="stat-icon-wrapper stat-secondary">
                <FiUsers className="stat-icon" />
              </div>
              <div className="stat-content">
                <span className="stat-label">Global Rank</span>
                <span className="stat-value">#142</span>
                <span className="stat-change positive">
                  ↑ 8 <span className="stat-period">positions</span>
                </span>
              </div>
            </div>

            <div className="stat-card glass jump-hover">
              <div className="stat-icon-wrapper stat-warning">
                <FiActivity className="stat-icon" />
              </div>
              <div className="stat-content">
                <span className="stat-label">Streak</span>
                <span className="stat-value">7 Days</span>
                <span className="stat-change">
                  <span className="stat-period">Keep going!</span>
                </span>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="dashboard-grid">
            <div className="dashboard-balance-section bounce-enter">
              <TokenBalance />
            </div>

            <div className="dashboard-jump-section bounce-enter">
              <JumpPanel />
            </div>
          </div>

          {/* Info Cards */}
          <div className="dashboard-info-grid">
            <div className="info-card glass jump-hover scale-in">
              <div className="info-card-header">
                <div className="info-card-icon">
                  <HiSparkles />
                </div>
                <h3 className="info-card-title">How to Earn More</h3>
              </div>
              <ul className="info-list">
                <li className="info-item">
                  <FiZap className="info-item-icon" />
                  <span>Complete daily challenges for bonus rewards</span>
                </li>
                <li className="info-item">
                  <FiTrendingUp className="info-item-icon" />
                  <span>Maintain your streak to unlock multipliers</span>
                </li>
                <li className="info-item">
                  <FiUsers className="info-item-icon" />
                  <span>Invite friends and earn referral bonuses</span>
                </li>
                <li className="info-item">
                  <FiAward className="info-item-icon" />
                  <span>Compete in tournaments for exclusive prizes</span>
                </li>
              </ul>
            </div>

            <div className="info-card glass jump-hover scale-in">
              <div className="info-card-header">
                <div className="info-card-icon">
                  <FiAward />
                </div>
                <h3 className="info-card-title">Achievements</h3>
              </div>
              <div className="achievements-grid">
                <div className="achievement-badge unlocked">
                  <div className="achievement-badge-icon">🎯</div>
                  <div className="achievement-badge-content">
                    <span className="achievement-badge-title">First Jump</span>
                    <span className="achievement-badge-subtitle">Completed</span>
                  </div>
                </div>
                <div className="achievement-badge locked">
                  <div className="achievement-badge-icon">🥉</div>
                  <div className="achievement-badge-content">
                    <span className="achievement-badge-title">100 Jumps</span>
                    <span className="achievement-badge-subtitle">Locked</span>
                  </div>
                </div>
                <div className="achievement-badge locked">
                  <div className="achievement-badge-icon">🥈</div>
                  <div className="achievement-badge-content">
                    <span className="achievement-badge-title">500 Jumps</span>
                    <span className="achievement-badge-subtitle">Locked</span>
                  </div>
                </div>
                <div className="achievement-badge locked">
                  <div className="achievement-badge-icon">🥇</div>
                  <div className="achievement-badge-content">
                    <span className="achievement-badge-title">1000 Jumps</span>
                    <span className="achievement-badge-subtitle">Locked</span>
                  </div>
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