import './Card.css'

function Card({ 
  children, 
  title,
  subtitle,
  padding = 'md',
  className = '',
  ...props 
}) {
  return (
    <div className={`card card-padding-${padding} ${className}`} {...props}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  )
}

export default Card