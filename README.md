# Odenvia Stay Demo

Demo de una plataforma de alojamiento vacacional con portal público y panel Housekeeping.

## Incluye

- React + Vite
- Portal público responsive
- Calendario de disponibilidad interactivo
- Flujo completo de reserva DEMO
- Housekeeping / CMS frontend
- Gestión de reservas y estados
- Bloqueo manual de fechas
- Gestión de fotografías
- Gestión de actividades
- Historial de pagos ficticio
- Persistencia mediante localStorage
- Español, alemán e inglés
- Selector de idioma persistente
- Sin backend
- Sin pagos reales

## Instalación

```bash
npm install
npm run dev
```

La aplicación se sirve en:

```text
http://localhost:5180
```

## Formato del código

El código fuente está escrito de forma legible y vertical. También se incluye Prettier:

```bash
npm run format
```

## Housekeeping

Disponible en:

```text
/housekeeping
```

Los cambios se guardan en el navegador mediante `localStorage`.

## Importante

Es una DEMO. No existe backend, no se realizan reservas reales y no se procesa dinero real.

## Vercel · subpath

Esta versión está preparada para servirse en:

```text
https://tools.dnxlab.de/airbnb-like-demo/
```

Configuración incluida:

- `vite.config.js` con `base: '/airbnb-like-demo/'`
- `BrowserRouter` con `basename="/airbnb-like-demo"`
- `vercel.json` para las rutas SPA y los assets bajo el subpath

El dominio `tools.dnxlab.de` debe seguir asociado al proyecto Vercel que sirve el dominio.
Si ese dominio ya pertenece a otro proyecto, esta demo debe integrarse en ese proyecto o en su configuración de routing; no debe asignarse el mismo dominio a un segundo proyecto.
