export function toDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`;
}

export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) {
    return 0;
  }

  return Math.max(
    0,
    Math.round((toDate(checkOut) - toDate(checkIn)) / 86400000)
  );
}

export function money(value, language = 'es') {
  const locales = {
    es: 'es-ES',
    de: 'de-DE',
    en: 'en-GB',
  };

  return new Intl.NumberFormat(locales[language] ?? locales.es, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export function formatDate(value, language = 'es') {
  if (!value) {
    return '—';
  }

  const locales = {
    es: 'es-ES',
    de: 'de-DE',
    en: 'en-GB',
  };

  return new Intl.DateTimeFormat(locales[language] ?? locales.es, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(toDate(value));
}

export function rangeDates(start, end) {
  if (!start || !end) {
    return [];
  }

  const output = [];
  let date = toDate(start);
  const lastDate = toDate(end);

  while (date < lastDate) {
    output.push(dateKey(date));
    date.setDate(date.getDate() + 1);
  }

  return output;
}

export function pricing(property, checkIn, checkOut, guests) {
  const nights = nightsBetween(checkIn, checkOut);
  const subtotal = nights * property.pricePerNight;
  const cleaning = nights ? 60 : 0;
  const service = nights ? Math.round(subtotal * 0.05) : 0;

  return {
    nights,
    subtotal,
    cleaning,
    service,
    total: subtotal + cleaning + service,
    guests,
  };
}
