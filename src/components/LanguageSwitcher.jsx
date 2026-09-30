import { Languages } from 'lucide-react';
import { useI18n } from '../i18n';

export default function LanguageSwitcher() {
  const { language, changeLanguage, t } = useI18n();

  return (
    <label className="language-switcher" title={t('language')}>
      <Languages size={15} />
      <select value={language} onChange={(event) => changeLanguage(event.target.value)} aria-label={t('language')}>
        <option value="es">ES</option>
        <option value="de">DE</option>
        <option value="en">EN</option>
      </select>
    </label>
  );
}
