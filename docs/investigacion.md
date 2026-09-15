# Investigación técnica

## Playwright

Se utilizó Playwright como herramienta de pruebas end-to-end.

Las pruebas se encuentran en:

```text
tests/juego.spec.ts
```

La configuración se encuentra en:

```text
playwright.config.ts
```

## Casos probados

Las pruebas E2E verifican:

1. inicio de una partida y comunicación con `/api/reiniciar`;
2. movimiento de un jugador y cambio de turno;
3. finalización de la partida después de completar las rondas.

## Ejecución headless

```bash
npm run test:e2e
```

Esta ejecución se utiliza también en GitHub Actions.

## Ejecución visual

```bash
npm run test:e2e:chrome
```

El proyecto utiliza Chromium configurado como Desktop Chrome.

## Ejecución contra producción

Playwright permite utilizar una URL pública mediante la variable:

```text
PLAYWRIGHT_BASE_URL
```

Ejemplo en PowerShell:

```powershell
$env:PLAYWRIGHT_BASE_URL="https://picnic-rush-ardillas.onrender.com"
npm run test:e2e:chrome
```

Cuando esta variable está definida, Playwright utiliza la aplicación publicada y no inicia el servidor local.

## GitHub Actions

Se configuraron tres workflows.

### Lint frontend and backend

Ejecuta:

```bash
npm run lint
```

Valida tanto:

```text
frontend/src
backend
```

### E2E Playwright

Instala Chromium y ejecuta:

```bash
npm run test:e2e
```

Las pruebas se ejecutan automáticamente en modo headless.

### Deploy Render

Utiliza un Deploy Hook almacenado en GitHub Secrets con el nombre:

```text
RENDER_DEPLOY_HOOK_URL
```

El workflow solicita un nuevo deployment cuando se actualiza la rama `main`.

## Publicación en Render

La aplicación se encuentra publicada como un Web Service en Render.

URL:

```text
https://picnic-rush-ardillas.onrender.com
```

La configuración está definida en:

```text
render.yaml
```

## Construcción

```bash
npm install && npm run build
```

## Inicio

```bash
npm start
```

## Puerto

Express utiliza:

```ts
Number(process.env.PORT) || 3000
```

En desarrollo utiliza el puerto 3000.

En Render, el valor de `PORT` es asignado por el servicio.

## Versión de Node

En `render.yaml` se configura:

```text
NODE_VERSION=22
```

## Características del servicio

Render ejecuta frontend y backend como una sola aplicación Node.

Vite genera el frontend dentro de:

```text
frontend/dist
```

Express sirve esos archivos junto con las rutas `/api`.

Por esta razón, toda la aplicación funciona bajo el mismo dominio y puerto.

## Limitaciones encontradas

El plan gratuito de Render puede suspender temporalmente una instancia que permanece inactiva.

Esto puede provocar que la primera solicitud después de un período de inactividad tarde más tiempo que las siguientes.

También fue necesario configurar un Deploy Hook como GitHub Secret para que el workflow de deployment pudiera solicitar nuevas publicaciones.

## Música

La aplicación utiliza una versión de *The Entertainer* de Scott Joplin obtenida desde Wikimedia Commons.

El recurso se reproduce directamente desde:

```text
https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Entertainer_-_Scott_Joplin.ogg
```

## Fuentes consultadas

- Playwright: https://playwright.dev/
- GitHub Actions: https://docs.github.com/actions
- Render: https://render.com/docs
- Vite: https://vite.dev/
- Express: https://expressjs.com/
- Wikimedia Commons: https://commons.wikimedia.org/
