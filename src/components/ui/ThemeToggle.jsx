import useThemeStore from '../../store/useThemeStore.js'
import './ThemeToggle.css'

function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <div className="theme-toggle-track">
        <div className={`theme-toggle-thumb ${theme}`}>
          <img 
            src={theme === 'dark' ? '/logo.png' : '/logo.png'} 
            alt="JumpCoin Logo" 
            className="theme-toggle-logo"
          />
        </div>
      </div>
    </button>
  )
}

export default ThemeToggle