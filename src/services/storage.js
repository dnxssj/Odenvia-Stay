import {
  seedActivities,
  seedBlockedDates,
  seedProperty,
  seedReservations,
} from '../data/seed';

const KEY = 'odenvia-stay-demo-v2';

const clone = (value) => JSON.parse(JSON.stringify(value));

export function loadStore() {
  try {
    const raw = localStorage.getItem(KEY);

    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Fall back to the demo seed when local storage is unavailable.
  }

  const store = {
    property: clone(seedProperty),
    activities: clone(seedActivities),
    reservations: clone(seedReservations),
    blockedDates: [...seedBlockedDates],
  };

  saveStore(store);
  return store;
}

export function saveStore(store) {
  localStorage.setItem(KEY, JSON.stringify(store));
  window.dispatchEvent(
    new CustomEvent('odenvia-store', {
      detail: store,
    })
  );
}

export function resetStore() {
  localStorage.removeItem(KEY);
  window.location.reload();
}
