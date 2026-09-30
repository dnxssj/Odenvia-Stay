import { CalendarDays, ChevronRight, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ isHK }) {
  const { t } = useI18n();

  return (
    <header className="header">
      <div className="header-inner">
        <Link className="brand" to="/">
          <span className="brand-mark">O</span>
          <span>
            ODENVIA <small>STAY</small>
          </span>
        </Link>

        {isHK ? (
          <div className="header-context">
            <LayoutDashboard size={17} />
            {t('housekeeping')}
          </div>
        ) : (
          <nav>
            <Link to="/alojamiento">{t('accommodation')}</Link>
            <Link to="/alojamiento#actividades">{t('whatToDo')}</Link>
          </nav>
        )}

        <div className="header-actions">
          <LanguageSwitcher />

          {!isHK && (
            <Link className="header-cta" to="/reserva">
              <CalendarDays size={17} />
              {t('book')}
              <ChevronRight size={15} />
            </Link>
          )}

          {isHK && (
            <Link className="header-cta ghost" to="/">
              {t('public')}
            </Link>
          )}

          {!isHK && (
            <Link className="house-link" to="/housekeeping">
              {t('housekeeping')}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
