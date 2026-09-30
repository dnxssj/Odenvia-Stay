import { useState } from 'react';
import {
  CalendarDays,
  Check,
  ClipboardList,
  Euro,
  ExternalLink,
  Home,
  LayoutDashboard,
  MapPinned,
  Plus,
  ReceiptText,
  RotateCcw,
  Settings as SettingsIcon,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { useI18n, localized } from '../i18n';
import Calendar from '../components/Calendar';
import ActivityCard from '../components/ActivityCard';
import { Button, Status } from '../components/ui';
import { formatDate, money, pricing } from '../utils/booking';
import { resetStore } from '../services/storage';

function Nav() {
  const { t } = useI18n();

  const items = [
    ['', t('dashboard'), LayoutDashboard],
    ['reservas', t('reservations'), ClipboardList],
    ['calendario', t('calendar'), CalendarDays],
    ['alojamiento', t('accommodation'), Home],
    ['actividades', t('activities'), MapPinned],
    ['pagos', t('payments'), ReceiptText],
    ['configuracion', t('settings'), SettingsIcon],
  ];

  return (
    <aside className="hk-nav">
      <div className="hk-label">{t('management')}</div>

      {items.map(([to, label, Icon]) => (
        <NavLink
          key={label}
          to={`/housekeeping/${to}`}
          end={to === ''}
        >
          <Icon size={17} />
          {label}
        </NavLink>
      ))}

      <div className="hk-nav-bottom">
        <span>{t('localData')}</span>
        <small>{t('localDataInfo')}</small>
        <button onClick={resetStore}>
          <RotateCcw size={14} />
          {t('resetDemo')}
        </button>
      </div>
    </aside>
  );
}

function Shell({ children }) {
  return (
    <div className="hk-shell">
      <Nav />
      <section className="hk-content">{children}</section>
    </div>
  );
}

function Dashboard({ store, update }) {
  const { t, language } = useI18n();
  const pending = store.reservations.filter(
    (reservation) => reservation.status === 'PENDING'
  ).length;
  const confirmed = store.reservations.filter(
    (reservation) => reservation.status === 'CONFIRMED'
  ).length;
  const total = store.reservations.reduce(
    (sum, reservation) =>
      sum +
      (reservation.pricing?.total ||
        pricing(
          store.property,
          reservation.checkIn,
          reservation.checkOut,
          reservation.guests
        ).total),
    0
  );

  return (
    <Shell>
      <div className="page-head">
        <div>
          <span className="eyebrow">HOUSEKEEPING · DEMO</span>
          <h1>{t('dashboard')}</h1>
          <p>{t('manageWithoutCode')}</p>
        </div>
        <Link className="btn primary" to="/">
          {t('public')}
          <ExternalLink size={16} />
        </Link>
      </div>

      <div className="kpi-grid">
        <div>
          <ClipboardList />
          <span>{t('pendingReservations')}</span>
          <strong>{pending}</strong>
        </div>
        <div>
          <CalendarDays />
          <span>{t('confirmedReservations')}</span>
          <strong>{confirmed}</strong>
        </div>
        <div>
          <Euro />
          <span>{t('demoVolume')}</span>
          <strong>{money(total, language)}</strong>
        </div>
        <div>
          <Users />
          <span>{t('capacity')}</span>
          <strong>{store.property.capacity.guests}</strong>
        </div>
      </div>

      <div className="hk-panel">
        <div className="panel-head">
          <div>
            <span className="eyebrow">{t('attention')}</span>
            <h2>{t('recentRequests')}</h2>
          </div>
          <Link to="/housekeeping/reservas">{t('viewAll')}</Link>
        </div>

        {pending === 0 ? (
          <div className="empty">{t('noPending')}</div>
        ) : (
          <ReservationTable store={store} update={update} />
        )}
      </div>
    </Shell>
  );
}

function ReservationTable({ store, update }) {
  const { t, language } = useI18n();
  const [filter, setFilter] = useState('ALL');
  const list = store.reservations.filter(
    (reservation) => filter === 'ALL' || reservation.status === filter
  );

  const changeStatus = (reservation, status) => {
    update({
      reservations: store.reservations.map((item) =>
        item.id === reservation.id
          ? {
              ...item,
              status,
              paymentStatus:
                status === 'CONFIRMED' ? 'SIMULATED' : item.paymentStatus,
            }
          : item
      ),
    });
  };

  return (
    <>
      <div className="filters">
        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option value="ALL">{t('all')}</option>
          <option value="PENDING">{t('pending')}</option>
          <option value="CONFIRMED">{t('confirmed')}</option>
          <option value="COMPLETED">{t('completed')}</option>
          <option value="REJECTED">{t('rejected')}</option>
        </select>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>{t('reservation')}</th>
              <th>{t('guest')}</th>
              <th>{t('checkIn')} / {t('checkOut')}</th>
              <th>{t('amount')}</th>
              <th>{t('status')}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {list.map((reservation) => {
              const total =
                reservation.pricing?.total ||
                pricing(
                  store.property,
                  reservation.checkIn,
                  reservation.checkOut,
                  reservation.guests
                ).total;

              return (
                <tr key={reservation.id}>
                  <td>
                    <strong>{reservation.id}</strong>
                  </td>
                  <td>
                    <strong>{reservation.guest.name}</strong>
                    <small>{reservation.guest.email}</small>
                  </td>
                  <td>
                    {formatDate(reservation.checkIn, language)}
                    <small>→ {formatDate(reservation.checkOut, language)}</small>
                  </td>
                  <td>{money(total, language)}</td>
                  <td>
                    <Status status={reservation.status} />
                  </td>
                  <td>
                    {reservation.status === 'PENDING' && (
                      <div className="table-actions">
                        <button
                          title={t('accept')}
                          onClick={() => changeStatus(reservation, 'CONFIRMED')}
                        >
                          <Check />
                        </button>
                        <button
                          className="danger"
                          title={t('reject')}
                          onClick={() => changeStatus(reservation, 'REJECTED')}
                        >
                          <X />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Reservations({ store, update }) {
  const { t } = useI18n();

  return (
    <Shell>
      <div className="page-head">
        <div>
          <span className="eyebrow">HOUSEKEEPING</span>
          <h1>{t('reservations')}</h1>
          <p>{t('manageRequests')}</p>
        </div>
      </div>
      <div className="hk-panel">
        <ReservationTable store={store} update={update} />
      </div>
    </Shell>
  );
}

function HKCalendar({ store, update }) {
  const { t } = useI18n();
  const [value, setValue] = useState({});
  const [notice, setNotice] = useState('');

  const toggleDate = (date) => {
    const isBlocked = store.blockedDates.includes(date);
    update({
      blockedDates: isBlocked
        ? store.blockedDates.filter((item) => item !== date)
        : [...store.blockedDates, date],
    });
    setNotice(
      isBlocked
        ? `${date} ${t('available').toLowerCase()}.`
        : `${date} ${t('occupied').toLowerCase()}.`
    );
  };

  return (
    <Shell>
      <div className="page-head">
        <div>
          <span className="eyebrow">HOUSEKEEPING</span>
          <h1>{t('calendar')}</h1>
          <p>{t('blockCalendar')}</p>
        </div>
      </div>

      {notice && <div className="toast">{notice}</div>}

      <div className="calendar-admin">
        <Calendar
          admin
          value={value}
          onChange={(result) => {
            if (result.adminToggle) {
              toggleDate(result.adminToggle);
            }
          }}
          blockedDates={store.blockedDates}
          reservations={store.reservations}
        />

        <div className="hk-panel">
          <h2>{t('manuallyBlocked')}</h2>
          {store.blockedDates.length ? (
            <div className="chip-list">
              {store.blockedDates.sort().map((date) => (
                <button key={date} onClick={() => toggleDate(date)}>
                  {date}
                  <X size={13} />
                </button>
              ))}
            </div>
          ) : (
            <div className="empty">{t('noManualBlocks')}</div>
          )}
          <div className="info-box">{t('blockHelp')}</div>
        </div>
      </div>
    </Shell>
  );
}

function PropertyEditor({ store, update }) {
  const { t, language } = useI18n();
  const [property, setProperty] = useState(store.property);

  const save = () => update({ property });

  const updateCapacity = (key, value) => {
    setProperty({
      ...property,
      capacity: {
        ...property.capacity,
        [key]: Number(value),
      },
    });
  };

  return (
    <Shell>
      <div className="page-head">
        <div>
          <span className="eyebrow">{t('cms')}</span>
          <h1>{t('accommodation')}</h1>
          <p>{t('editPublic')}</p>
        </div>
        <Button onClick={save}>{t('saveChanges')}</Button>
      </div>

      <div className="editor-grid">
        <div className="hk-panel form">
          <h2>{t('mainInfo')}</h2>
          <label>
            {t('name')}
            <input
              value={localized(property.name, language)}
              onChange={(event) =>
                setProperty({ ...property, name: event.target.value })
              }
            />
          </label>
          <label>
            {t('location')}
            <input
              value={localized(property.location, language)}
              onChange={(event) =>
                setProperty({ ...property, location: event.target.value })
              }
            />
          </label>
          <label>
            {t('pricePerNight')}
            <input
              type="number"
              value={property.pricePerNight}
              onChange={(event) =>
                setProperty({
                  ...property,
                  pricePerNight: Number(event.target.value),
                })
              }
            />
          </label>
          <label>
            {t('description')}
            <textarea
              value={localized(property.description, language)}
              onChange={(event) =>
                setProperty({ ...property, description: event.target.value })
              }
            />
          </label>

          <div className="form-cols">
            <label>
              {t('guests')}
              <input
                type="number"
                value={property.capacity.guests}
                onChange={(event) =>
                  updateCapacity('guests', event.target.value)
                }
              />
            </label>
            <label>
              {t('bedrooms')}
              <input
                type="number"
                value={property.capacity.bedrooms}
                onChange={(event) =>
                  updateCapacity('bedrooms', event.target.value)
                }
              />
            </label>
            <label>
              {t('beds')}
              <input
                type="number"
                value={property.capacity.beds}
                onChange={(event) => updateCapacity('beds', event.target.value)}
              />
            </label>
            <label>
              {t('bathrooms')}
              <input
                type="number"
                value={property.capacity.bathrooms}
                onChange={(event) =>
                  updateCapacity('bathrooms', event.target.value)
                }
              />
            </label>
          </div>
        </div>

        <ImageManager property={property} setProperty={setProperty} />

        <div className="hk-panel form">
          <h2>{t('amenities')}</h2>
          <TagEditor
            values={property.amenities}
            onChange={(values) => setProperty({ ...property, amenities: values })}
          />
        </div>

        <div className="hk-panel form">
          <h2>{t('rules')}</h2>
          <TagEditor
            values={property.rules}
            onChange={(values) => setProperty({ ...property, rules: values })}
          />
        </div>
      </div>
    </Shell>
  );
}

function ImageManager({ property, setProperty }) {
  const { t } = useI18n();
  const [url, setUrl] = useState('');

  const addUrl = () => {
    if (url.trim()) {
      setProperty({
        ...property,
        images: [...property.images, url.trim()],
      });
    }
    setUrl('');
  };

  const remove = (index) => {
    setProperty({
      ...property,
      images: property.images.filter((_, current) => current !== index),
    });
  };

  const upload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 1400;
        const scale = Math.min(1, maxWidth / image.width);

        canvas.width = image.width * scale;
        canvas.height = image.height * scale;
        canvas
          .getContext('2d')
          .drawImage(image, 0, 0, canvas.width, canvas.height);

        setProperty({
          ...property,
          images: [
            ...property.images,
            canvas.toDataURL('image/jpeg', 0.78),
          ],
        });
      };
      image.src = reader.result;
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="hk-panel">
      <div className="panel-head">
        <div>
          <h2>{t('photos')}</h2>
          <p>{t('addUrlsOrImages')}</p>
        </div>
        <label className="upload-btn">
          + {t('uploadImage')}
          <input type="file" accept="image/*" onChange={upload} />
        </label>
      </div>

      <div className="image-manager">
        {property.images.map((image, index) => (
          <div key={`${image}-${index}`}>
            <img src={image} alt="" />
            <span>
              {index === 0 ? t('principal') : `${t('photo')} ${index + 1}`}
            </span>
            <button onClick={() => remove(index)}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="add-url">
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://... URL de imagen"
        />
        <button onClick={addUrl}>
          <Plus size={16} />
          {t('addImage')}
        </button>
      </div>
    </div>
  );
}

function TagEditor({ values, onChange }) {
  const { t } = useI18n();
  const [value, setValue] = useState('');

  return (
    <>
      <div className="chip-list editable">
        {values.map((item, index) => (
          <button
            key={`${item}-${index}`}
            onClick={() =>
              onChange(values.filter((_, current) => current !== index))
            }
          >
            {item}
            <X size={13} />
          </button>
        ))}
      </div>
      <div className="add-url">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={t('addElement')}
        />
        <button
          onClick={() => {
            if (value.trim()) {
              onChange([...values, value.trim()]);
              setValue('');
            }
          }}
        >
          <Plus size={16} />
          {t('addImage')}
        </button>
      </div>
    </>
  );
}

function Activities({ store, update }) {
  const { t } = useI18n();
  const [editing, setEditing] = useState(null);
  const blank = {
    id: '',
    category: 'Naturaleza',
    title: '',
    distance: '',
    description: '',
    image: '',
  };
  const [form, setForm] = useState(blank);

  const save = () => {
    if (!form.title) {
      return;
    }

    if (editing && editing !== 'new') {
      update({
        activities: store.activities.map((activity) =>
          activity.id === editing ? form : activity
        ),
      });
    } else {
      update({
        activities: [
          ...store.activities,
          { ...form, id: `a${Date.now()}` },
        ],
      });
    }

    setEditing(null);
    setForm(blank);
  };

  return (
    <Shell>
      <div className="page-head">
        <div>
          <span className="eyebrow">HOUSEKEEPING</span>
          <h1>{t('activities')}</h1>
          <p>{t('manageExperiences')}</p>
        </div>
        <Button
          onClick={() => {
            setEditing('new');
            setForm(blank);
          }}
        >
          <Plus />
          {t('newActivity')}
        </Button>
      </div>

      {editing && (
        <div className="hk-panel form activity-form">
          <h2>{editing === 'new' ? t('newActivity') : t('editActivity')}</h2>
          <div className="form-cols">
            <label>
              {t('title')}
              <input
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
              />
            </label>
            <label>
              {t('category')}
              <input
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
              />
            </label>
            <label>
              {t('distance')}
              <input
                value={form.distance}
                onChange={(event) =>
                  setForm({ ...form, distance: event.target.value })
                }
              />
            </label>
          </div>
          <label>
            {t('description')}
            <textarea
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
            />
          </label>
          <label>
            {t('imageUrl')}
            <input
              value={form.image}
              onChange={(event) =>
                setForm({ ...form, image: event.target.value })
              }
            />
          </label>
          <div className="button-row">
            <Button variant="secondary" onClick={() => setEditing(null)}>
              {t('cancel')}
            </Button>
            <Button onClick={save}>{t('save')}</Button>
          </div>
        </div>
      )}

      <div className="activity-grid hk-activities">
        {store.activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onEdit={() => {
              setEditing(activity.id);
              setForm(activity);
            }}
            onDelete={() =>
              update({
                activities: store.activities.filter(
                  (item) => item.id !== activity.id
                ),
              })
            }
          />
        ))}
      </div>
    </Shell>
  );
}

function Payments({ store }) {
  const { language, t } = useI18n();
  const rows = store.reservations.map((reservation) => ({
    reservation,
    total:
      reservation.pricing?.total ||
      pricing(
        store.property,
        reservation.checkIn,
        reservation.checkOut,
        reservation.guests
      ).total,
  }));

  return (
    <Shell>
      <div className="page-head">
        <div>
          <span className="eyebrow">HOUSEKEEPING</span>
          <h1>{t('paymentHistory')}</h1>
          <p>{t('fakePaymentRegistry')}</p>
        </div>
      </div>

      <div className="hk-panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>{t('payment')}</th>
                <th>{t('reservation')}</th>
                <th>{t('guest')}</th>
                <th>{t('amount')}</th>
                <th>{t('status')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ reservation, total }, index) => (
                <tr key={reservation.id}>
                  <td>
                    <strong>PAY-{String(index + 1).padStart(3, '0')}</strong>
                  </td>
                  <td>{reservation.id}</td>
                  <td>{reservation.guest.name}</td>
                  <td>{money(total, language)}</td>
                  <td>
                    <Status
                      status={
                        reservation.paymentStatus === 'PENDING'
                          ? 'PENDING'
                          : 'SIMULATED'
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}

function Settings() {
  const { t } = useI18n();

  return (
    <Shell>
      <div className="page-head">
        <div>
          <span className="eyebrow">HOUSEKEEPING</span>
          <h1>{t('settings')}</h1>
          <p>{t('demoOptions')}</p>
        </div>
      </div>

      <div className="hk-panel settings-card">
        <div>
          <strong>{t('demoMode')}</strong>
          <span>{t('alwaysActive')}</span>
        </div>
        <div>
          <strong>{t('persistence')}</strong>
          <span>{t('localStorageInfo')}</span>
        </div>
        <div>
          <strong>{t('payments')}</strong>
          <span>{t('paymentsInfo')}</span>
        </div>
      </div>
    </Shell>
  );
}

export default function Housekeeping({ store, update }) {
  return (
    <Routes>
      <Route index element={<Dashboard store={store} update={update} />} />
      <Route path="reservas" element={<Reservations store={store} update={update} />} />
      <Route path="calendario" element={<HKCalendar store={store} update={update} />} />
      <Route path="alojamiento" element={<PropertyEditor store={store} update={update} />} />
      <Route path="actividades" element={<Activities store={store} update={update} />} />
      <Route path="pagos" element={<Payments store={store} />} />
      <Route path="configuracion" element={<Settings />} />
    </Routes>
  );
}
