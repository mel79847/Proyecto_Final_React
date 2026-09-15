# Picnic Rush: Ardillas al picnic

Juego web académico para dos jugadores. El frontend está hecho con React + TypeScript y el backend con Express + TypeScript.

## Ejecutar en desarrollo

```bash
npm install
npm run dev:back
```

En otra terminal:

```bash
npm run dev:front
```

Abrir `http://localhost:5173`.

## Producción local

```bash
npm run build
npm start
```

Abrir `http://localhost:3000`.

## Pruebas

```bash
npx playwright install chromium
npm run test:e2e
npm run test:e2e:chrome
```

## API

- `GET /api/partida`
- `POST /api/reiniciar`
- `POST /api/accion`

Más detalle en `docs/`.
