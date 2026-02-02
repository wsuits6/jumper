import './Button.css'

function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  icon,
  iconPosition = 'left',
  jump = false,
  ...props 
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full' : '',
    loading ? 'btn-loading' : '',
    jump ? 'btn-jump' : '',
    icon && !children ? 'btn-icon' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="btn-icon-left">{icon}</span>}
      {!loading && children}
      {icon && iconPosition === 'right' && <span className="btn-icon-right">{icon}</span>}
    </button>
  )
}

export default Button