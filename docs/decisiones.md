# Decisiones técnicas

## Arquitectura

Se utilizó una arquitectura separada entre frontend y backend.

El frontend está desarrollado con React + TypeScript.

El backend está desarrollado con Express + TypeScript.

React se encarga principalmente de representar el escenario y recibir las interacciones del usuario.

Express conserva y modifica el estado principal de la partida.

## Comunicación

La comunicación entre React y Express se realiza mediante `fetch`.

No se utilizaron librerías externas como Axios.

Las solicitudes y respuestas de la API utilizan JSON.

## Acciones del juego

Se definieron tres acciones principales:

- mover;
- recoger;
- robar.

La cantidad de acciones se mantuvo reducida para que las reglas fueran sencillas de comprender, pero cada acción tiene una consecuencia diferente.

Mover permite buscar mejores recursos.

Recoger permite sumar puntos.

Robar permite afectar directamente al rival cuando ambos coinciden en una zona.

## Estado de la partida

El backend mantiene:

- jugadores;
- posición;
- puntuación;
- alimentos;
- turno;
- ronda;
- estado de partida;
- ganador;
- mensajes;
- historial.

Esto evita que la lógica principal dependa únicamente del navegador.

## Variabilidad

La distribución de alimentos se genera nuevamente al reiniciar una partida.

También puede aparecer comida nueva después de una ronda.

La variabilidad impide que todas las partidas tengan exactamente el mismo desarrollo.

## Vite Proxy

Durante el desarrollo, Vite redirige las solicitudes `/api` hacia:

```text
http://localhost:3000
```

De esta manera React puede utilizar rutas como:

```text
/api/partida
/api/reiniciar
/api/accion
```

sin escribir una URL diferente para desarrollo y producción.

## Producción

En producción, Express sirve los archivos generados por Vite desde:

```text
frontend/dist
```

Así, frontend y backend funcionan bajo el mismo dominio y puerto.

## Herramientas no utilizadas

No se utilizaron:

- Redux;
- React Router;
- Axios;
- Tailwind;
- Bootstrap;
- motores de juegos;
- bibliotecas externas para resolver la lógica principal.

La intención fue mantener una implementación basada en las herramientas trabajadas durante la materia.

## Cambios realizados durante el desarrollo

Durante el desarrollo se modificó la propuesta visual para aprovechar mejor toda la pantalla del navegador.

La interfaz pasó a utilizar el parque completo como espacio de juego, reduciendo la cantidad de paneles y elementos separados.

Los alimentos aumentaron de tamaño para facilitar su selección.

Las posiciones visuales de las ardillas fueron ajustadas para evitar que cubrieran botones o alimentos.

También se incorporó la acción de robar para aumentar la interacción directa entre los dos jugadores.

## Riesgos técnicos

### Desincronización entre frontend y backend

Riesgo:

React podía mostrar un estado distinto al almacenado en Express.

Medida:

Cada acción se envía al backend y React actualiza la interfaz con la respuesta devuelta por el servidor.

### Acciones inválidas

Riesgo:

Un jugador podía intentar recoger recursos inexistentes, jugar fuera de turno o realizar acciones no permitidas.

Medida:

Las validaciones se realizan en Express antes de modificar la partida.

### Problemas de CORS durante desarrollo

Riesgo:

Frontend y backend utilizan puertos diferentes durante desarrollo.

Medida:

Se utiliza el proxy de Vite para las rutas `/api`.

### Diferencias entre desarrollo y producción

Riesgo:

Una aplicación podía funcionar localmente pero fallar al publicarse.

Medida:

Se agregó construcción de Vite, ejecución desde Express, pruebas E2E, GitHub Actions y deployment en Render.

### Problemas visuales de interacción

Riesgo:

Las ardillas podían cubrir alimentos o controles.

Medida:

Se ajustaron posiciones y capas CSS para mantener los controles accesibles.
