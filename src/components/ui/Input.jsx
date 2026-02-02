import './Input.css'

function Input({ 
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  success,
  disabled = false,
  required = false,
  className = '',
  icon,
  helper,
  size = 'md',
  glass = false,
  ...props 
}) {
  const inputClasses = [
    'input',
    error ? 'input-error' : '',
    success ? 'input-success' : '',
    glass ? 'input-glass' : '',
    icon ? 'input-with-icon' : '',
    size === 'lg' ? 'input-lg' : '',
    size === 'sm' ? 'input-sm' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <div className="input-container">
        {icon && <span className="input-icon">{icon}</span>}
        {type === 'textarea' ? (
          <textarea
            className={inputClasses}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            {...props}
          />
        ) : (
          <input
            type={type}
            className={inputClasses}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            {...props}
          />
        )}
      </div>
      {error && <span className="input-error-message">{error}</span>}
      {helper && !error && <span className="input-helper">{helper}</span>}
    </div>
  )
}

export default Input