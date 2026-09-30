import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, LockKeyhole, Mail, Phone, ShieldCheck, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n, localized } from '../i18n';
import Calendar from '../components/Calendar';
import { Button } from '../components/ui';
import { formatDate, money, pricing } from '../utils/booking';

export default function Booking({ property, booking, setBooking, store, update }) {
  const navigate = useNavigate();
  const { language, t } = useI18n();
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState('');
  const [createdReservationId, setCreatedReservationId] = useState('');

  const price = useMemo(
    () => pricing(property, booking.checkIn, booking.checkOut, booking.guests),
    [property, booking]
  );

  const canDates = Boolean(
    booking.checkIn && booking.checkOut && price.nights > 0
  );

  const submit = () => {
    if (!booking.guest.name || !booking.guest.email) {
      setErrors('Completa al menos nombre y email para continuar.');
      return;
    }

    const id = `DEMO-${String(store.reservations.length + 1).padStart(3, '0')}`;
    const reservation = {
      id,
      propertyId: property.id,
      guest: booking.guest,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guests: booking.guests,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      paymentStatus: 'PENDING',
      pricing: price,
    };

    update({
      reservations: [...store.reservations, reservation],
    });
    setCreatedReservationId(id);
    setDone(true);
  };

  if (done) {
    return (
      <main className="confirmation">
        <div className="confirm-icon">
          <Check />
        </div>
        <span className="eyebrow">{t('demoReservation')}</span>
        <h1>{t('simulatedCorrectly')}</h1>
        <p>
          {t('reservation')} <strong>{createdReservationId}</strong> {t('savedHistory')}
        </p>

        <div className="warning-card">
          <LockKeyhole />
          <div>
            <strong>{t('thisIsDemo')}</strong>
            <span>{t('noRealReservation')}</span>
          </div>
        </div>

        <div className="confirm-actions">
          <Button to="/">{t('backToAccommodation')}</Button>
          <Button to="/housekeeping" variant="secondary">
            {t('openHousekeeping')}
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="booking-page">
      <div className="booking-head">
        <button className="back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          {t('back')}
        </button>

        <div className="steps">
          <span className={step >= 1 ? 'active' : ''}>01 {t('stepDates')}</span>
          <i />
          <span className={step >= 2 ? 'active' : ''}>02 {t('stepGuest')}</span>
          <i />
          <span className={step >= 3 ? 'active' : ''}>03 {t('stepReview')}</span>
        </div>
      </div>

      <div className="booking-layout">
        <div className="booking-main">
          {step === 1 && (
            <>
              <span className="eyebrow">PASO 01</span>
              <h1>{t('chooseDates')}</h1>
              <p className="muted">{t('selectCheckInOut')}</p>

              <Calendar
                value={booking}
                onChange={(value) => setBooking({ ...booking, ...value })}
                blockedDates={store.blockedDates}
                reservations={store.reservations}
              />

              <div className="guest-selector">
                <div>
                  <strong>{t('guests')}</strong>
                  <span>{t('maximum')} {property.capacity.guests}</span>
                </div>
                <div className="counter">
                  <button
                    onClick={() =>
                      setBooking({
                        ...booking,
                        guests: Math.max(1, booking.guests - 1),
                      })
                    }
                  >
                    −
                  </button>
                  <strong>{booking.guests}</strong>
                  <button
                    onClick={() =>
                      setBooking({
                        ...booking,
                        guests: Math.min(
                          property.capacity.guests,
                          booking.guests + 1
                        ),
                      })
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <Button disabled={!canDates} onClick={() => setStep(2)}>
                {t('continue')}
                <ArrowRight />
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <span className="eyebrow">PASO 02</span>
              <h1>{t('guestData')}</h1>
              <p className="muted">{t('fakeData')}</p>

              <div className="form">
                <label>
                  <UserRound />
                  {t('fullName')}
                  <input
                    value={booking.guest.name}
                    onChange={(event) =>
                      setBooking({
                        ...booking,
                        guest: {
                          ...booking.guest,
                          name: event.target.value,
                        },
                      })
                    }
                    placeholder="Daniel García"
                  />
                </label>

                <label>
                  <Mail />
                  {t('email')}
                  <input
                    type="email"
                    value={booking.guest.email}
                    onChange={(event) =>
                      setBooking({
                        ...booking,
                        guest: {
                          ...booking.guest,
                          email: event.target.value,
                        },
                      })
                    }
                    placeholder="daniel@example.demo"
                  />
                </label>

                <label>
                  <Phone />
                  {t('phone')}
                  <input
                    value={booking.guest.phone}
                    onChange={(event) =>
                      setBooking({
                        ...booking,
                        guest: {
                          ...booking.guest,
                          phone: event.target.value,
                        },
                      })
                    }
                    placeholder="+49 170 000000"
                  />
                </label>
              </div>

              {errors && <p className="form-error">{errors}</p>}

              <div className="button-row">
                <Button variant="secondary" onClick={() => setStep(1)}>
                  {t('back')}
                </Button>
                <Button
                  onClick={() => {
                    if (!booking.guest.name || !booking.guest.email) {
                      setErrors('Completa al menos nombre y email para continuar.');
                    } else {
                      setErrors('');
                      setStep(3);
                    }
                  }}
                >
                  {t('stepReview')}
                  <ArrowRight />
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <span className="eyebrow">PASO 03</span>
              <h1>{t('reviewRequest')}</h1>

              <div className="review-card">
                <div>
                  <span>{t('checkIn')}</span>
                  <strong>{formatDate(booking.checkIn, language)}</strong>
                </div>
                <div>
                  <span>{t('checkOut')}</span>
                  <strong>{formatDate(booking.checkOut, language)}</strong>
                </div>
                <div>
                  <span>{t('guests')}</span>
                  <strong>{booking.guests}</strong>
                </div>
                <div>
                  <span>{t('guest')}</span>
                  <strong>{booking.guest.name}</strong>
                </div>
              </div>

              <div className="warning-card">
                <ShieldCheck />
                <div>
                  <strong>{t('demo100')}</strong>
                  <span>{t('noExternal')}</span>
                </div>
              </div>

              <div className="button-row">
                <Button variant="secondary" onClick={() => setStep(2)}>
                  {t('back')}
                </Button>
                <Button onClick={submit}>
                  {t('reserveDemo')}
                  <ArrowRight />
                </Button>
              </div>
            </>
          )}
        </div>

        <aside className="summary-card">
          <span className="eyebrow">{t('summary')}</span>
          <div className="summary-property">
            <img src={property.images[0]} alt="" />
            <div>
              <strong>{localized(property.name, language)}</strong>
              <span>{localized(property.location, language)}</span>
            </div>
          </div>

          <div className="summary-lines">
            <div>
              <span>{money(property.pricePerNight, language)} × {price.nights} {t('nights')}</span>
              <strong>{money(price.subtotal, language)}</strong>
            </div>
            <div>
              <span>{t('cleaningDemo')}</span>
              <strong>{money(price.cleaning, language)}</strong>
            </div>
            <div>
              <span>{t('serviceDemo')}</span>
              <strong>{money(price.service, language)}</strong>
            </div>
            <hr />
            <div className="total">
              <span>{t('total')}</span>
              <strong>{money(price.total, language)}</strong>
            </div>
          </div>

          <small>{t('fakeAmounts')}</small>
        </aside>
      </div>
    </main>
  );
}
