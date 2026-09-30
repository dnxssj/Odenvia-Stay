import { ArrowRight, CheckCircle2, ChevronRight, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n, localized } from '../i18n';
import PropertyHero from '../components/PropertyHero';
import { SectionTitle } from '../components/ui';
import ActivityCard from '../components/ActivityCard';

export default function Home({ property, activities }) {
  const { language, t } = useI18n();
  const navigate = useNavigate();

  return (
    <main>
      <PropertyHero
        property={property}
        onBook={() => navigate('/reserva')}
      />

      <section className="intro section">
        <div className="intro-copy">
          <span className="eyebrow">{t('differentStay')}</span>
          <h2>{t('forestMountain')}</h2>
          <p>{localized(property.description, language)}</p>
          <Link className="text-link" to="/alojamiento">
            {t('discoverAccommodation')}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="intro-features">
          {property.highlights.slice(0, 4).map((item) => (
            <div key={localized(item, language)}>
              <CheckCircle2 size={18} />
              {localized(item, language)}
            </div>
          ))}
        </div>
      </section>

      <section className="photo-strip">
        <img src={property.images[1]} alt="" />
        <img src={property.images[2]} alt="" />
        <div className="photo-copy">
          <span className="eyebrow">{t('odenwald')}</span>
          <h2>{t('slowDown')}</h2>
          <p>{t('greenRoutes')}, pueblos y gastronomía regional a pocos minutos.</p>
          <Link className="text-link light-link" to="/alojamiento#actividades">
            {t('exploreArea')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section">
        <SectionTitle
          eyebrow={t('surroundings')}
          title={t('thingsNearby')}
        >
          <Link className="text-link" to="/alojamiento#actividades">
            {t('seeAll')}
            <ChevronRight size={16} />
          </Link>
        </SectionTitle>

        <div className="activity-grid">
          {activities.slice(0, 3).map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>

      <section className="trust section">
        <div>
          <Leaf />
          <strong>{t('naturalEnvironment')}</strong>
          <span>{t('greenRoutes')}</span>
        </div>
        <div>
          <ShieldCheck />
          <strong>{t('clearExperience')}</strong>
          <span>{t('transparentInfo')}</span>
        </div>
        <div>
          <Sparkles />
          <strong>{t('portfolioProject')}</strong>
          <span>{t('demoDevelopment')}</span>
        </div>
      </section>
    </main>
  );
}
