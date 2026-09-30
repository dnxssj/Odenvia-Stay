import { useState } from 'react';
import { ArrowLeft, ArrowRight, Bath, BedDouble, Check, Info, MapPin, Star, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n, localized } from '../i18n';
import { Button, SectionTitle } from '../components/ui';
import ActivityCard from '../components/ActivityCard';
import Calendar from '../components/Calendar';
import { money, nightsBetween } from '../utils/booking';

export default function Property({ property, activities, booking, setBooking, blockedDates, reservations }) {
  const navigate = useNavigate();
  const { language, t } = useI18n();
  const [lightbox, setLightbox] = useState(false);

  const stats = [
    [Users, property.capacity.guests, t('guests')],
    [BedDouble, property.capacity.bedrooms, t('bedrooms')],
    [BedDouble, property.capacity.beds, t('beds')],
    [Bath, property.capacity.bathrooms, t('bathrooms')],
  ];

  return (
    <main>
      <div className="property-top">
        <button className="back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          {t('back')}
        </button>
        <span>{localized(property.name, language)} · {t('demo')}</span>
      </div>

      <section className="gallery">
        <div className="gallery-main">
          <img src={property.images[0]} alt="" />
        </div>
        <div className="gallery-grid">
          {property.images.slice(1, 5).map((image, index) => (
            <button key={image} onClick={() => setLightbox(index + 1)}>
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      </section>

      {lightbox !== false && (
        <div className="lightbox" onClick={() => setLightbox(false)}>
          <img src={property.images[lightbox]} alt="" />
        </div>
      )}

      <div className="property-layout">
        <div>
          <div className="property-heading">
            <div>
              <span className="eyebrow">{t('completeAccommodation')}</span>
              <h1>{localized(property.name, language)}</h1>
              <p>
                <MapPin size={16} />
                {localized(property.location, language)}
              </p>
            </div>
            <div className="rating">
              <Star fill="currentColor" size={17} />
              <strong>{property.rating}</strong>
              <span>{property.reviews} {t('reviews')}</span>
            </div>
          </div>

          <div className="stats">
            {stats.map(([Icon, value, label]) => (
              <div key={label}>
                <Icon />
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <section className="content-section">
            <h2>{t('aboutAccommodation')}</h2>
            <p className="large-copy">{localized(property.description, language)}</p>
          </section>

          <section className="content-section">
            <h2>{t('offers')}</h2>
            <div className="amenities">
              {property.amenities.map((item) => (
                <div key={localized(item, language)}>
                  <Check size={17} />
                  {localized(item, language)}
                </div>
              ))}
            </div>
          </section>

          <section className="content-section">
            <h2>{t('rules')}</h2>
            <div className="rules">
              {property.rules.map((item) => (
                <div key={localized(item, language)}>
                  <Info size={16} />
                  {localized(item, language)}
                </div>
              ))}
            </div>
          </section>

          <section className="content-section" id="actividades">
            <SectionTitle eyebrow={t('surroundings')} title={t('whatToDoArea')} />
            <div className="activity-grid">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </section>
        </div>

        <aside className="booking-card">
          <span className="eyebrow">{t('demoBooking')}</span>
          <div className="price">
            <strong>{money(property.pricePerNight, language)}</strong>
            <span>/ {t('night')}</span>
          </div>

          <Calendar
            value={booking}
            onChange={(value) => setBooking({ ...booking, ...value })}
            blockedDates={blockedDates}
            reservations={reservations}
          />

          <div className="mini-summary">
            {booking.checkIn && booking.checkOut ? (
              <>
                <span>{booking.checkIn} → {booking.checkOut}</span>
                <strong>{nightsBetween(booking.checkIn, booking.checkOut)} {t('nights')}</strong>
              </>
            ) : (
              <span>{t('selectDates')}</span>
            )}
          </div>

          <Button to="/reserva">
            {t('continueBooking')}
            <ArrowRight size={17} />
          </Button>
          <small className="demo-note">{t('noPayment')}</small>
        </aside>
      </div>
    </main>
  );
}
