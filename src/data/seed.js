export const seedProperty = {
  id: 'odenvia-01',
  name: {
    es: 'Casa del Bosque',
    de: 'Waldhaus',
    en: 'Forest House',
  },
  location: {
    es: 'Wald-Michelbach, Odenwald, Alemania',
    de: 'Wald-Michelbach, Odenwald, Deutschland',
    en: 'Wald-Michelbach, Odenwald, Germany',
  },
  region: 'Odenwald',
  pricePerNight: 145,
  currency: 'EUR',
  rating: 4.92,
  reviews: 87,
  capacity: {
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
  },
  description: {
    es: 'Una casa de campo contemporánea rodeada de bosque, pensada para desconectar unos días y disfrutar del Odenwald con calma. Amplios espacios, chimenea, jardín privado y acceso directo a rutas naturales.',
    de: 'Ein modernes Landhaus mitten im Wald, ideal für ein paar ruhige Tage im Odenwald. Großzügige Räume, Kamin, privater Garten und direkter Zugang zu Naturwegen.',
    en: 'A contemporary country house surrounded by forest, designed for a few quiet days in the Odenwald. Spacious rooms, fireplace, private garden and direct access to nature trails.',
  },
  highlights: [
    {
      es: 'Jardín privado',
      de: 'Privater Garten',
      en: 'Private garden',
    },
    {
      es: 'Chimenea',
      de: 'Kamin',
      en: 'Fireplace',
    },
    {
      es: 'Vistas al bosque',
      de: 'Waldblick',
      en: 'Forest views',
    },
    {
      es: 'Parking privado',
      de: 'Privater Parkplatz',
      en: 'Private parking',
    },
    {
      es: 'Cocina equipada',
      de: 'Ausgestattete Küche',
      en: 'Equipped kitchen',
    },
    {
      es: 'Wi‑Fi rápido',
      de: 'Schnelles WLAN',
      en: 'Fast Wi-Fi',
    },
  ],
  amenities: [
    { es: 'Wi‑Fi', de: 'WLAN', en: 'Wi-Fi' },
    { es: 'Cocina completa', de: 'Voll ausgestattete Küche', en: 'Full kitchen' },
    { es: 'Lavadora', de: 'Waschmaschine', en: 'Washing machine' },
    { es: 'Lavavajillas', de: 'Geschirrspüler', en: 'Dishwasher' },
    { es: 'Calefacción', de: 'Heizung', en: 'Heating' },
    { es: 'Chimenea', de: 'Kamin', en: 'Fireplace' },
    { es: 'Parking privado', de: 'Privater Parkplatz', en: 'Private parking' },
    { es: 'Jardín', de: 'Garten', en: 'Garden' },
    { es: 'Barbacoa', de: 'Grill', en: 'BBQ' },
    { es: 'Escritorio de trabajo', de: 'Arbeitsplatz', en: 'Workspace' },
  ],
  rules: [
    { es: 'No fumar en el interior', de: 'Rauchen im Innenbereich nicht erlaubt', en: 'No smoking indoors' },
    { es: 'No se permiten fiestas', de: 'Keine Partys', en: 'No parties' },
    { es: 'Mascotas bajo petición', de: 'Haustiere auf Anfrage', en: 'Pets on request' },
    { es: 'Check-in desde las 15:00', de: 'Check-in ab 15:00 Uhr', en: 'Check-in from 3:00 PM' },
    { es: 'Check-out hasta las 11:00', de: 'Check-out bis 11:00 Uhr', en: 'Check-out by 11:00 AM' },
  ],
  images: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=85',
  ],
};

export const seedActivities = [
  {
    id: 'a1',
    category: { es: 'Naturaleza', de: 'Natur', en: 'Nature' },
    title: {
      es: 'Sendero del Odenwald',
      de: 'Odenwald-Wanderweg',
      en: 'Odenwald Trail',
    },
    distance: '2,4 km',
    description: {
      es: 'Ruta sencilla entre bosque mixto, miradores y pequeños caminos rurales.',
      de: 'Leichte Route durch Mischwald, Aussichtspunkte und kleine Landwege.',
      en: 'Easy route through mixed forest, viewpoints and small country paths.',
    },
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'a2',
    category: { es: 'Pueblos', de: 'Orte', en: 'Towns' },
    title: {
      es: 'Centro histórico de Wald-Michelbach',
      de: 'Historisches Zentrum von Wald-Michelbach',
      en: 'Wald-Michelbach historic centre',
    },
    distance: '3,1 km',
    description: {
      es: 'Pequeño núcleo histórico con cafés, comercios y arquitectura tradicional.',
      de: 'Kleiner historischer Ortskern mit Cafés, Geschäften und traditioneller Architektur.',
      en: 'Small historic centre with cafés, shops and traditional architecture.',
    },
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'a3',
    category: { es: 'Gastronomía', de: 'Gastronomie', en: 'Food' },
    title: {
      es: 'Gasthaus regional',
      de: 'Regionales Gasthaus',
      en: 'Regional inn',
    },
    distance: '4,8 km',
    description: {
      es: 'Cocina regional del Odenwald y productos locales en un entorno rural.',
      de: 'Regionale Odenwald-Küche und lokale Produkte in ländlicher Umgebung.',
      en: 'Regional Odenwald cuisine and local products in a rural setting.',
    },
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'a4',
    category: { es: 'Familia', de: 'Familie', en: 'Family' },
    title: {
      es: 'Parque natural',
      de: 'Naturpark',
      en: 'Nature park',
    },
    distance: '7,6 km',
    description: {
      es: 'Espacios verdes y recorridos aptos para pasar el día en familia.',
      de: 'Grünflächen und Wege für einen entspannten Familientag.',
      en: 'Green spaces and routes suitable for a family day out.',
    },
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
];

export const seedReservations = [
  {
    id: 'DEMO-001',
    propertyId: 'odenvia-01',
    guest: {
      name: 'Laura Martín',
      email: 'laura@example.demo',
      phone: '+49 170 000000',
    },
    checkIn: '2026-10-12',
    checkOut: '2026-10-16',
    guests: 3,
    status: 'CONFIRMED',
    createdAt: '2026-09-22T10:00:00Z',
    paymentStatus: 'SIMULATED',
  },
  {
    id: 'DEMO-002',
    propertyId: 'odenvia-01',
    guest: {
      name: 'Marco Weber',
      email: 'marco@example.demo',
      phone: '+49 171 000000',
    },
    checkIn: '2026-10-21',
    checkOut: '2026-10-23',
    guests: 2,
    status: 'PENDING',
    createdAt: '2026-09-28T16:20:00Z',
    paymentStatus: 'PENDING',
  },
  {
    id: 'DEMO-003',
    propertyId: 'odenvia-01',
    guest: {
      name: 'Sofía Ruiz',
      email: 'sofia@example.demo',
      phone: '+49 172 000000',
    },
    checkIn: '2026-09-05',
    checkOut: '2026-09-08',
    guests: 4,
    status: 'COMPLETED',
    createdAt: '2026-08-30T12:00:00Z',
    paymentStatus: 'SIMULATED',
  },
];

export const seedBlockedDates = [
  '2026-10-03',
  '2026-10-04',
  '2026-10-05',
  '2026-11-14',
  '2026-11-15',
];
