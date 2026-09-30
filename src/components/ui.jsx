import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

export function Button({
  children,
  to,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
}) {
  const classes = `btn ${variant} ${className}`;

  if (to) {
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function SectionTitle({ eyebrow, title, children }) {
  return (
    <div className="section-title">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function Status({ status }) {
  const { t } = useI18n();
  const labels = {
    PENDING: t('pending'),
    CONFIRMED: t('confirmed'),
    COMPLETED: t('completed'),
    REJECTED: t('rejected'),
    SIMULATED: 'DEMO',
  };

  return (
    <span className={`status status-${status.toLowerCase()}`}>
      {labels[status] ?? status}
    </span>
  );
}
