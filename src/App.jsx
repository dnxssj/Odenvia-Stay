import { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useStore } from './hooks/useStore';
import { I18nProvider } from './i18n';
import Header from './components/Header';
import DemoBanner from './components/DemoBanner';
import Home from './pages/Home';
import Property from './pages/Property';
import Booking from './pages/Booking';
import Housekeeping from './pages/Housekeeping';

function AppContent() {
  const [store, update] = useStore();
  const [booking, setBooking] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    guest: {
      name: '',
      email: '',
      phone: '',
    },
  });
  const location = useLocation();
  const isHousekeeping = location.pathname.startsWith('/housekeeping');

  return (
    <>
      <DemoBanner />
      <Header property={store.property} isHK={isHousekeeping} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              property={store.property}
              activities={store.activities}
              booking={booking}
              setBooking={setBooking}
            />
          }
        />
        <Route
          path="/alojamiento"
          element={
            <Property
              property={store.property}
              activities={store.activities}
              booking={booking}
              setBooking={setBooking}
              blockedDates={store.blockedDates}
              reservations={store.reservations}
            />
          }
        />
        <Route
          path="/reserva/*"
          element={
            <Booking
              property={store.property}
              booking={booking}
              setBooking={setBooking}
              store={store}
              update={update}
            />
          }
        />
        <Route
          path="/housekeeping/*"
          element={<Housekeeping store={store} update={update} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isHousekeeping && (
        <footer className="site-footer">
          <div>
            <strong>Odenvia Stay</strong>
            <span>Proyecto portfolio · Demo en desarrollo</span>
          </div>
          <span>Sin reservas ni pagos reales</span>
        </footer>
      )}
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}
