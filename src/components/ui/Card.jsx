import './Card.css'

function Card({ 
  children, 
  title,
  subtitle,
  padding = 'md',
  className = '',
  glass = false,
  elevated = false,
  interactive = false,
  glow = false,
  gradientBorder = false,
  shimmer = false,
  jump = false,
  stats = false,
  header,
  footer,
  ...props 
}) {
  const classes = [
    'card',
    `card-padding-${padding}`,
    glass ? 'card-glass' : '',
    elevated ? 'card-elevated' : '',
    interactive ? 'card-interactive' : '',
    glow ? 'card-glow' : '',
    gradientBorder ? 'card-gradient-border' : '',
    shimmer ? 'card-shimmer' : '',
    jump ? 'card-jump' : '',
    stats ? 'card-stats' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      {(title || subtitle || header) && (
        <div className="card-header">
          {header || (
            <>
              {title && <h3 className="card-title">{title}</h3>}
              {subtitle && <p className="card-subtitle">{subtitle}</p>}
            </>
          )}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card