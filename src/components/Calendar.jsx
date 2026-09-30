import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { useI18n } from '../i18n';
import { dateKey, toDate } from '../utils/booking';

const weekDays = {
  es: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
  de: ['M', 'D', 'M', 'D', 'F', 'S', 'S'],
  en: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
};

export default function Calendar({
  value,
  onChange,
  blockedDates = [],
  reservations = [],
  admin = false,
}) {
  const { language, t } = useI18n();
  const initial = value?.checkIn ? toDate(value.checkIn) : new Date();
  const [cursor, setCursor] = useState(
    new Date(initial.getFullYear(), initial.getMonth(), 1)
  );

  const blocked = new Set([
    ...blockedDates,
    ...reservations
      .filter((reservation) => reservation.status === 'CONFIRMED')
      .flatMap((reservation) => {
        const dates = [];
        let date = toDate(reservation.checkIn);
        const end = toDate(reservation.checkOut);

        while (date < end) {
          dates.push(dateKey(date));
          date.setDate(date.getDate() + 1);
        }

        return dates;
      }),
  ]);

  const selected = new Set();
  if (value?.checkIn && value?.checkOut) {
    let date = toDate(value.checkIn);
    const end = toDate(value.checkOut);

    while (date <= end) {
      selected.add(dateKey(date));
      date.setDate(date.getDate() + 1);
    }
  }

  const cells = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const result = [];

    for (let index = 0; index < firstDay; index += 1) {
      result.push(null);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      result.push(new Date(year, month, day));
    }

    return result;
  }, [cursor]);

  const handleClick = (date) => {
    if (!date) {
      return;
    }

    const key = dateKey(date);

    if (blocked.has(key) && !admin) {
      return;
    }

    if (admin) {
      onChange?.({ adminToggle: key });
      return;
    }

    if (!value?.checkIn || value?.checkOut) {
      onChange?.({ checkIn: key, checkOut: '' });
      return;
    }

    if (value.checkIn && key <= value.checkIn) {
      onChange?.({ checkIn: key, checkOut: value.checkOut });
      return;
    }

    onChange?.({ checkIn: value.checkIn, checkOut: key });
  };

  const monthLabel = new Intl.DateTimeFormat(
    language === 'de' ? 'de-DE' : language === 'en' ? 'en-GB' : 'es-ES',
    { month: 'long', year: 'numeric' }
  ).format(cursor);

  return (
    <div className="calendar">
      <div className="cal-head">
        <button
          onClick={() =>
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
          }
          aria-label={t('back')}
        >
          <ChevronLeft />
        </button>
        <strong>{monthLabel}</strong>
        <button
          onClick={() =>
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
          }
          aria-label={t('continue')}
        >
          <ChevronRight />
        </button>
      </div>

      <div className="weekdays">
        {(weekDays[language] ?? weekDays.es).map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>

      <div className="days">
        {cells.map((date, index) => {
          if (!date) {
            return <span key={`empty-${index}`} />;
          }

          const key = dateKey(date);
          const isBlocked = blocked.has(key);
          const isSelected = selected.has(key);
          const isStart = key === value?.checkIn;
          const isEnd = key === value?.checkOut;

          return (
            <button
              key={key}
              disabled={isBlocked && !admin}
              onClick={() => handleClick(date)}
              className={`${isBlocked ? 'blocked' : ''} ${
                isSelected ? 'selected' : ''
              } ${isStart ? 'start' : ''} ${isEnd ? 'end' : ''}`}
            >
              {date.getDate()}
              {isBlocked && <Lock size={10} />}
            </button>
          );
        })}
      </div>

      <div className="cal-legend">
        <span>
          <i className="dot available" />
          {t('available')}
        </span>
        <span>
          <i className="dot busy" />
          {t('occupied')}
        </span>
        {!admin && <span>{t('selectCheckInOutShort')}</span>}
      </div>
    </div>
  );
}
