# Investigación técnica

## Playwright
Se eligió Playwright para pruebas E2E. Las pruebas cubren inicio de partida, movimiento con comunicación al backend y finalización por rondas.

Local headless:
```bash
npm run test:e2e
```

Local visual en Chrome:
```bash
npm run test:e2e:chrome
```

## Publicación
Se preparó `render.yaml` para publicar frontend y backend como una sola aplicación Node en Render. Express sirve los archivos producidos por Vite desde `frontend/dist`.

## Música
El botón de música reproduce *The Entertainer* de Scott Joplin mediante un archivo de Wikimedia Commons. La composición y la interpretación seleccionada están indicadas como dominio público en Wikimedia Commons.
