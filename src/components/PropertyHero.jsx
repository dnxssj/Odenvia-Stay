import { ArrowRight, MapPin, Star, Users } from 'lucide-react';
import { useI18n, localized } from '../i18n';
import { Button } from './ui';
import { money } from '../utils/booking';

export default function PropertyHero({ property, onBook }) {
  const { language, t } = useI18n();

  return (
    <section className="hero-wrap">
      <div
        className="hero-image"
        style={{ backgroundImage: `url(${property.images[0]})` }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="eyebrow light">{t('demoAccommodation')}</span>
          <h1>{localized(property.name, language)}</h1>

          <div className="hero-meta">
            <span>
              <MapPin size={16} />
              {localized(property.location, language)}
            </span>
            <span>
              <Star size={16} fill="currentColor" />
              {property.rating} · {property.reviews} {t('reviews')}
            </span>
            <span>
              <Users size={16} />
              {property.capacity.guests} {t('guests').toLowerCase()}
            </span>
          </div>

          <div className="hero-bottom">
            <div>
              <strong>{money(property.pricePerNight, language)}</strong>
              <span>/ {t('night')}</span>
            </div>
            <Button onClick={onBook}>
              {t('checkAvailability')}
              <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
