import { useI18n, localized } from '../i18n';

export default function ActivityCard({ activity, onEdit, onDelete }) {
  const { language, t } = useI18n();

  return (
    <article className="activity-card">
      <img src={activity.image} alt="" />
      <div className="activity-body">
        <div className="activity-top">
          <span className="tag">{localized(activity.category, language)}</span>
          <span>{localized(activity.distance, language)}</span>
        </div>
        <h3>{localized(activity.title, language)}</h3>
        <p>{localized(activity.description, language)}</p>

        {onEdit && (
          <div className="row-actions">
            <button onClick={onEdit}>{t('edit')}</button>
            <button className="danger-text" onClick={onDelete}>
              {t('delete')}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
