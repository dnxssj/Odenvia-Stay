import { createContext, useContext, useMemo, useState } from 'react';

const STORAGE_KEY = 'odenvia-language';

const translations = {
  es: {
    language: 'Idioma',
    spanish: 'Español',
    german: 'Alemán',
    english: 'Inglés',
    public: 'Web pública',
    housekeeping: 'Housekeeping',
    accommodation: 'Alojamiento',
    whatToDo: 'Qué hacer',
    book: 'Reservar',
    checkAvailability: 'Consultar disponibilidad',
    demoAccommodation: 'ALOJAMIENTO DEMO',
    demoProject: 'DEMO · Proyecto en desarrollo · Las reservas y pagos reales no están disponibles',
    differentStay: 'UNA ESTANCIA DIFERENTE',
    forestMountain: 'Un refugio entre bosque y montaña.',
    discoverAccommodation: 'Descubrir el alojamiento',
    odenwald: 'EL ODENWALD',
    slowDown: 'Tiempo para bajar el ritmo.',
    exploreArea: 'Explorar la zona',
    surroundings: 'ALREDEDORES',
    thingsNearby: 'Qué hacer cerca',
    seeAll: 'Ver todo',
    naturalEnvironment: 'Entorno natural',
    greenRoutes: 'Rutas y espacios verdes',
    clearExperience: 'Experiencia clara',
    transparentInfo: 'Información transparente',
    portfolioProject: 'Proyecto portfolio',
    demoDevelopment: 'Demo en desarrollo',
    completeAccommodation: 'ALOJAMIENTO COMPLETO · DEMO',
    reviews: 'reseñas',
    guests: 'Huéspedes',
    bedrooms: 'Habitaciones',
    beds: 'Camas',
    bathrooms: 'Baños',
    aboutAccommodation: 'Sobre este alojamiento',
    offers: 'Lo que ofrece',
    rules: 'Normas',
    whatToDoArea: 'Qué hacer en la zona',
    demoBooking: 'RESERVA DEMO',
    night: 'noche',
    nights: 'noches',
    selectDates: 'Selecciona tus fechas para continuar',
    continueBooking: 'Continuar con la reserva',
    noPayment: 'No se realiza ningún pago. Es una simulación.',
    back: 'Volver',
    stepDates: 'Fechas',
    stepGuest: 'Huésped',
    stepReview: 'Revisar',
    chooseDates: 'Elige tus fechas',
    selectCheckInOut: 'Selecciona entrada y salida. Las fechas ocupadas no pueden seleccionarse.',
    maximum: 'Máximo',
    continue: 'Continuar',
    guestData: 'Datos del huésped',
    fakeData: 'Usa datos ficticios. Esta información solo se guarda localmente para la demo.',
    fullName: 'Nombre completo',
    email: 'Email',
    phone: 'Teléfono',
    reviewRequest: 'Revisa la solicitud',
    checkIn: 'Entrada',
    checkOut: 'Salida',
    guest: 'Huésped',
    demo100: 'Reserva 100 % DEMO',
    noExternal: 'El botón siguiente no conecta con ningún sistema de reservas ni proveedor de pagos.',
    reserveDemo: 'Reservar DEMO',
    summary: 'RESUMEN',
    cleaningDemo: 'Limpieza · DEMO',
    serviceDemo: 'Servicio · DEMO',
    total: 'Total',
    fakeAmounts: 'Los importes son ficticios y no representan un cobro.',
    demoReservation: 'RESERVA DEMO',
    simulatedCorrectly: 'Reserva simulada correctamente',
    savedHistory: 'se ha guardado en el historial local de la aplicación.',
    thisIsDemo: 'Esto es una demostración.',
    noRealReservation: 'No se ha realizado ninguna reserva real ni se ha efectuado ningún pago.',
    backToAccommodation: 'Volver al alojamiento',
    openHousekeeping: 'Abrir Housekeeping',
    available: 'Disponible',
    occupied: 'Ocupado',
    selectCheckInOutShort: 'Selecciona entrada y salida',
    management: 'GESTIÓN',
    localData: 'DATOS LOCALES',
    localDataInfo: 'Los cambios se guardan en este navegador.',
    resetDemo: 'Restaurar datos demo',
    dashboard: 'Resumen',
    reservations: 'Reservas',
    calendar: 'Calendario',
    activities: 'Actividades',
    payments: 'Pagos',
    settings: 'Configuración',
    manageWithoutCode: 'Gestiona el alojamiento desde aquí sin tocar código.',
    pendingReservations: 'Reservas pendientes',
    confirmedReservations: 'Reservas confirmadas',
    demoVolume: 'Volumen DEMO',
    capacity: 'Capacidad',
    attention: 'ATENCIÓN',
    recentRequests: 'Solicitudes recientes',
    viewAll: 'Ver todas',
    noPending: 'No hay reservas pendientes.',
    all: 'Todas',
    pending: 'Pendientes',
    confirmed: 'Confirmadas',
    completed: 'Completadas',
    rejected: 'Rechazadas',
    reservation: 'Reserva',
    amount: 'Importe',
    status: 'Estado',
    accept: 'Aceptar',
    reject: 'Denegar',
    manageRequests: 'Acepta, deniega y consulta todas las solicitudes DEMO.',
    blockCalendar: 'Bloquea o libera fechas manualmente. Las reservas confirmadas se muestran como ocupadas.',
    manuallyBlocked: 'Fechas bloqueadas manualmente',
    noManualBlocks: 'No hay bloqueos manuales.',
    blockHelp: 'Haz clic sobre un día disponible para bloquearlo. Haz clic sobre un día bloqueado para liberarlo.',
    cms: 'HOUSEKEEPING · CMS',
    editPublic: 'Edita el contenido público sin tocar el código.',
    saveChanges: 'Guardar cambios',
    mainInfo: 'Información principal',
    name: 'Nombre',
    location: 'Ubicación',
    pricePerNight: 'Precio por noche',
    description: 'Descripción',
    photos: 'Fotografías',
    addUrlsOrImages: 'Añade URLs o imágenes desde tu PC.',
    uploadImage: 'Subir imagen',
    addImage: 'Añadir',
    amenities: 'Servicios',
    addElement: 'Añadir elemento',
    manageExperiences: 'Gestiona las experiencias y lugares que aparecen en la web.',
    newActivity: 'Nueva actividad',
    editActivity: 'Editar actividad',
    title: 'Título',
    category: 'Categoría',
    distance: 'Distancia',
    imageUrl: 'Imagen URL',
    cancel: 'Cancelar',
    save: 'Guardar',
    paymentHistory: 'Historial de pagos',
    fakePaymentRegistry: 'Registro ficticio de importes asociados a las reservas.',
    payment: 'Pago',
    demoOptions: 'Opciones de la demo.',
    demoMode: 'Modo demostración',
    alwaysActive: 'Siempre activo. No hay conexión con sistemas externos.',
    persistence: 'Persistencia',
    localStorageInfo: 'Datos almacenados localmente en este navegador.',
    paymentsInfo: 'Solo estados ficticios. No se procesa dinero.',
    edit: 'Editar',
    delete: 'Eliminar',
    principal: 'Principal',
    photo: 'Foto',
    day: 'día',
    demo: 'DEMO',
    noRealPayments: 'Sin reservas ni pagos reales'
  },
  de: {},
  en: {}
};

const german = {
  language: 'Sprache', spanish: 'Spanisch', german: 'Deutsch', english: 'Englisch', public: 'Öffentliche Website', housekeeping: 'Housekeeping', accommodation: 'Unterkunft', whatToDo: 'Aktivitäten', book: 'Buchen', checkAvailability: 'Verfügbarkeit prüfen', demoAccommodation: 'DEMO-UNTERKUNFT', demoProject: 'DEMO · Projekt in Entwicklung · Echte Buchungen und Zahlungen sind nicht verfügbar', differentStay: 'EIN ANDERER AUFENTHALT', forestMountain: 'Ein Rückzugsort zwischen Wald und Bergen.', discoverAccommodation: 'Unterkunft entdecken', odenwald: 'DER ODENWALD', slowDown: 'Zeit, um zur Ruhe zu kommen.', exploreArea: 'Umgebung entdecken', surroundings: 'UMGEBUNG', thingsNearby: 'Was gibt es in der Nähe?', seeAll: 'Alle ansehen', naturalEnvironment: 'Natur', greenRoutes: 'Wanderwege und Grünflächen', clearExperience: 'Klare Erfahrung', transparentInfo: 'Transparente Informationen', portfolioProject: 'Portfolio-Projekt', demoDevelopment: 'Demo in Entwicklung', completeAccommodation: 'GANZE UNTERKUNFT · DEMO', reviews: 'Bewertungen', guests: 'Gäste', bedrooms: 'Schlafzimmer', beds: 'Betten', bathrooms: 'Bäder', aboutAccommodation: 'Über diese Unterkunft', offers: 'Ausstattung', rules: 'Hausregeln', whatToDoArea: 'Aktivitäten in der Umgebung', demoBooking: 'DEMO-BUCHUNG', night: 'Nacht', nights: 'Nächte', selectDates: 'Wähle deine Daten, um fortzufahren', continueBooking: 'Mit der Buchung fortfahren', noPayment: 'Keine Zahlung. Dies ist eine Simulation.', back: 'Zurück', stepDates: 'Daten', stepGuest: 'Gast', stepReview: 'Prüfen', chooseDates: 'Daten auswählen', selectCheckInOut: 'Wähle An- und Abreise. Belegte Daten können nicht ausgewählt werden.', maximum: 'Maximal', continue: 'Weiter', guestData: 'Gästedaten', fakeData: 'Verwende Testdaten. Diese Informationen werden nur lokal für die Demo gespeichert.', fullName: 'Vollständiger Name', email: 'E-Mail', phone: 'Telefon', reviewRequest: 'Anfrage prüfen', checkIn: 'Anreise', checkOut: 'Abreise', guest: 'Gast', demo100: '100 % DEMO-BUCHUNG', noExternal: 'Die Schaltfläche verbindet sich mit keinem Buchungs- oder Zahlungsanbieter.', reserveDemo: 'DEMO BUCHEN', summary: 'ZUSAMMENFASSUNG', cleaningDemo: 'Reinigung · DEMO', serviceDemo: 'Service · DEMO', total: 'Gesamt', fakeAmounts: 'Die Beträge sind fiktiv und stellen keine Zahlung dar.', demoReservation: 'DEMO-BUCHUNG', simulatedCorrectly: 'Buchung erfolgreich simuliert', savedHistory: 'wurde im lokalen Verlauf der Anwendung gespeichert.', thisIsDemo: 'Dies ist eine Demonstration.', noRealReservation: 'Es wurde keine echte Buchung vorgenommen und keine Zahlung durchgeführt.', backToAccommodation: 'Zur Unterkunft', openHousekeeping: 'Housekeeping öffnen', available: 'Verfügbar', occupied: 'Belegt', selectCheckInOutShort: 'An- und Abreise auswählen', management: 'VERWALTUNG', localData: 'LOKALE DATEN', localDataInfo: 'Änderungen werden in diesem Browser gespeichert.', resetDemo: 'Demo-Daten zurücksetzen', dashboard: 'Übersicht', reservations: 'Buchungen', calendar: 'Kalender', activities: 'Aktivitäten', payments: 'Zahlungen', settings: 'Einstellungen', manageWithoutCode: 'Verwalte die Unterkunft hier ohne den Code zu ändern.', pendingReservations: 'Ausstehende Buchungen', confirmedReservations: 'Bestätigte Buchungen', demoVolume: 'DEMO-Umsatz', capacity: 'Kapazität', attention: 'AUFMERKSAMKEIT', recentRequests: 'Neue Anfragen', viewAll: 'Alle ansehen', noPending: 'Keine ausstehenden Buchungen.', all: 'Alle', pending: 'Ausstehend', confirmed: 'Bestätigt', completed: 'Abgeschlossen', rejected: 'Abgelehnt', reservation: 'Buchung', amount: 'Betrag', status: 'Status', accept: 'Annehmen', reject: 'Ablehnen', manageRequests: 'Bearbeite und prüfe alle DEMO-Buchungsanfragen.', blockCalendar: 'Blockiere oder entsperre Daten manuell. Bestätigte Buchungen werden als belegt angezeigt.', manuallyBlocked: 'Manuell blockierte Daten', noManualBlocks: 'Keine manuellen Sperren.', blockHelp: 'Klicke auf einen verfügbaren Tag zum Sperren oder auf einen gesperrten Tag zum Freigeben.', cms: 'HOUSEKEEPING · CMS', editPublic: 'Bearbeite öffentliche Inhalte ohne den Code zu ändern.', saveChanges: 'Änderungen speichern', mainInfo: 'Allgemeine Informationen', name: 'Name', location: 'Ort', pricePerNight: 'Preis pro Nacht', description: 'Beschreibung', photos: 'Fotos', addUrlsOrImages: 'Füge URLs oder Bilder von deinem PC hinzu.', uploadImage: 'Bild hochladen', addImage: 'Hinzufügen', amenities: 'Ausstattung', addElement: 'Element hinzufügen', manageExperiences: 'Verwalte Erlebnisse und Orte, die auf der Website angezeigt werden.', newActivity: 'Neue Aktivität', editActivity: 'Aktivität bearbeiten', title: 'Titel', category: 'Kategorie', distance: 'Entfernung', imageUrl: 'Bild-URL', cancel: 'Abbrechen', save: 'Speichern', paymentHistory: 'Zahlungsverlauf', fakePaymentRegistry: 'Fiktive Übersicht der Beträge zu den Buchungen.', payment: 'Zahlung', demoOptions: 'Optionen der Demo.', demoMode: 'Demomodus', alwaysActive: 'Immer aktiv. Keine Verbindung zu externen Systemen.', persistence: 'Persistenz', localStorageInfo: 'Daten werden lokal in diesem Browser gespeichert.', paymentsInfo: 'Nur fiktive Status. Es wird kein Geld verarbeitet.', edit: 'Bearbeiten', delete: 'Löschen', principal: 'Hauptbild', photo: 'Foto', day: 'Tag', demo: 'DEMO', noRealPayments: 'Keine echten Buchungen oder Zahlungen'
};

const english = {
  language: 'Language', spanish: 'Spanish', german: 'German', english: 'English', public: 'Public website', housekeeping: 'Housekeeping', accommodation: 'Accommodation', whatToDo: 'Things to do', book: 'Book', checkAvailability: 'Check availability', demoAccommodation: 'DEMO ACCOMMODATION', demoProject: 'DEMO · Project in development · Real bookings and payments are not available', differentStay: 'A DIFFERENT STAY', forestMountain: 'A retreat between forest and mountains.', discoverAccommodation: 'Discover the accommodation', odenwald: 'THE ODENWALD', slowDown: 'Time to slow down.', exploreArea: 'Explore the area', surroundings: 'SURROUNDINGS', thingsNearby: 'Things to do nearby', seeAll: 'View all', naturalEnvironment: 'Natural setting', greenRoutes: 'Trails and green spaces', clearExperience: 'Clear experience', transparentInfo: 'Transparent information', portfolioProject: 'Portfolio project', demoDevelopment: 'Demo in development', completeAccommodation: 'ENTIRE ACCOMMODATION · DEMO', reviews: 'reviews', guests: 'Guests', bedrooms: 'Bedrooms', beds: 'Beds', bathrooms: 'Bathrooms', aboutAccommodation: 'About this accommodation', offers: 'What it offers', rules: 'House rules', whatToDoArea: 'Things to do in the area', demoBooking: 'DEMO BOOKING', night: 'night', nights: 'nights', selectDates: 'Select your dates to continue', continueBooking: 'Continue with booking', noPayment: 'No payment is made. This is a simulation.', back: 'Back', stepDates: 'Dates', stepGuest: 'Guest', stepReview: 'Review', chooseDates: 'Choose your dates', selectCheckInOut: 'Select check-in and check-out. Occupied dates cannot be selected.', maximum: 'Maximum', continue: 'Continue', guestData: 'Guest details', fakeData: 'Use fictional data. This information is stored locally for the demo only.', fullName: 'Full name', email: 'Email', phone: 'Phone', reviewRequest: 'Review request', checkIn: 'Check-in', checkOut: 'Check-out', guest: 'Guest', demo100: '100% DEMO BOOKING', noExternal: 'The next button does not connect to any booking system or payment provider.', reserveDemo: 'BOOK DEMO', summary: 'SUMMARY', cleaningDemo: 'Cleaning · DEMO', serviceDemo: 'Service · DEMO', total: 'Total', fakeAmounts: 'Amounts are fictional and do not represent a charge.', demoReservation: 'DEMO BOOKING', simulatedCorrectly: 'Booking simulated successfully', savedHistory: 'has been saved to the application’s local history.', thisIsDemo: 'This is a demonstration.', noRealReservation: 'No real booking has been made and no payment has been processed.', backToAccommodation: 'Back to accommodation', openHousekeeping: 'Open Housekeeping', available: 'Available', occupied: 'Occupied', selectCheckInOutShort: 'Select check-in and check-out', management: 'MANAGEMENT', localData: 'LOCAL DATA', localDataInfo: 'Changes are saved in this browser.', resetDemo: 'Reset demo data', dashboard: 'Dashboard', reservations: 'Reservations', calendar: 'Calendar', activities: 'Activities', payments: 'Payments', settings: 'Settings', manageWithoutCode: 'Manage the accommodation here without touching code.', pendingReservations: 'Pending reservations', confirmedReservations: 'Confirmed reservations', demoVolume: 'DEMO volume', capacity: 'Capacity', attention: 'ATTENTION', recentRequests: 'Recent requests', viewAll: 'View all', noPending: 'No pending reservations.', all: 'All', pending: 'Pending', confirmed: 'Confirmed', completed: 'Completed', rejected: 'Rejected', reservation: 'Reservation', amount: 'Amount', status: 'Status', accept: 'Accept', reject: 'Reject', manageRequests: 'Accept, reject and review all DEMO requests.', blockCalendar: 'Block or release dates manually. Confirmed reservations are shown as occupied.', manuallyBlocked: 'Manually blocked dates', noManualBlocks: 'No manual blocks.', blockHelp: 'Click an available day to block it. Click a blocked day to release it.', cms: 'HOUSEKEEPING · CMS', editPublic: 'Edit public content without touching the code.', saveChanges: 'Save changes', mainInfo: 'Main information', name: 'Name', location: 'Location', pricePerNight: 'Price per night', description: 'Description', photos: 'Photos', addUrlsOrImages: 'Add URLs or images from your PC.', uploadImage: 'Upload image', addImage: 'Add', amenities: 'Amenities', addElement: 'Add item', manageExperiences: 'Manage experiences and places shown on the website.', newActivity: 'New activity', editActivity: 'Edit activity', title: 'Title', category: 'Category', distance: 'Distance', imageUrl: 'Image URL', cancel: 'Cancel', save: 'Save', paymentHistory: 'Payment history', fakePaymentRegistry: 'Fictional record of amounts associated with reservations.', payment: 'Payment', demoOptions: 'Demo options.', demoMode: 'Demo mode', alwaysActive: 'Always active. No connection to external systems.', persistence: 'Persistence', localStorageInfo: 'Data stored locally in this browser.', paymentsInfo: 'Fictional statuses only. No money is processed.', edit: 'Edit', delete: 'Delete', principal: 'Main image', photo: 'Photo', day: 'day', demo: 'DEMO', noRealPayments: 'No real bookings or payments'
};

translations.de = german;
translations.en = english;

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem(STORAGE_KEY) || 'es');

  const changeLanguage = (next) => {
    setLanguage(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo(() => ({
    language,
    changeLanguage,
    t: (key) => translations[language]?.[key] ?? translations.es[key] ?? key,
  }), [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export function localized(value, language) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[language] ?? value.es ?? Object.values(value)[0] ?? '';
  }
  return value ?? '';
}
