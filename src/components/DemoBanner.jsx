import { useI18n } from '../i18n';

export default function DemoBanner() {
  const { t } = useI18n();

  return (
    <div className="demo-banner">
      <span className="pulse-dot" />
      {t('demoProject')}
    </div>
  );
}
