# API HTTP REST

La comunicación entre React y Express utiliza solicitudes HTTP y formato JSON.

La API trabaja bajo la ruta `/api`.

## GET `/api/partida`

Devuelve el estado actual de la partida.

### Solicitud

```http
GET /api/partida
```

### Respuesta

```json
{
  "jugadores": [
    {
      "id": "pip",
      "nombre": "Pip",
      "zona": "roble",
      "puntos": 0
    },
    {
      "id": "poppy",
      "nombre": "Poppy",
      "zona": "arbusto",
      "puntos": 0
    }
  ],
  "zonas": [
    {
      "id": "roble",
      "nombre": "Roble",
      "icono": "🌳",
      "comidas": ["bellota", "fresa", "uva"]
    }
  ],
  "turno": "pip",
  "ronda": 1,
  "maxRondas": 5,
  "metaPuntos": 7,
  "estado": "jugando",
  "ganador": null,
  "mensaje": "Pip comienza. Elige una comida del Roble o muévete a otra zona.",
  "historial": [
    "Comienza el picnic. Pip juega primero."
  ]
}
```

La lista exacta de alimentos puede cambiar porque la partida se genera de manera aleatoria.

## POST `/api/reiniciar`

Crea una nueva partida.

La distribución de alimentos se vuelve a generar aleatoriamente.

### Solicitud

```http
POST /api/reiniciar
Content-Type: application/json
```

```json
{
  "reiniciar": true
}
```

### Respuesta

Devuelve el estado completo de la nueva partida.

Ejemplo parcial:

```json
{
  "turno": "pip",
  "ronda": 1,
  "maxRondas": 5,
  "metaPuntos": 7,
  "estado": "jugando",
  "ganador": null
}
```

La respuesta real también incluye jugadores, zonas, alimentos, mensaje e historial.

## POST `/api/accion`

Procesa una acción realizada por el jugador actual.

### Estructura

```json
{
  "jugador": "pip",
  "accion": "mover",
  "objetivo": "manta"
}
```

El valor de `accion` puede ser:

```text
mover
recoger
robar
```

## Acción: mover

### Solicitud

```json
{
  "jugador": "pip",
  "accion": "mover",
  "objetivo": "manta"
}
```

### Resultado

Express valida:

- que sea el turno de Pip;
- que la zona exista;
- que Pip no esté ya en esa zona.

Si la acción es válida, actualiza la posición y cambia el turno.

Ejemplo de parte de la respuesta:

```json
{
  "turno": "poppy",
  "mensaje": "Ahora juega Poppy."
}
```

## Acción: recoger

### Solicitud

```json
{
  "jugador": "pip",
  "accion": "recoger",
  "objetivo": "fresa"
}
```

Express verifica que la comida se encuentre en la zona actual del jugador.

Si la acción es válida:

- elimina la comida;
- suma su puntuación;
- revisa si existe un ganador;
- cambia el turno si la partida continúa.

## Acción: robar

### Solicitud

```json
{
  "jugador": "pip",
  "accion": "robar",
  "objetivo": "poppy"
}
```

La acción solamente se acepta si:

- Pip y Poppy están en la misma zona;
- Poppy tiene al menos 1 punto;
- es el turno de Pip.

Si es válida:

```text
Pip +1 punto
Poppy -1 punto
```

Después se revisa la condición de victoria.

## Respuesta de error

Cuando una acción no es válida, Express responde con código HTTP `400`.

Ejemplo:

```json
{
  "error": "No es el turno de ese jugador.",
  "partida": {
    "turno": "pip",
    "estado": "jugando"
  }
}
```

La respuesta incluye el estado de la partida para que React pueda mantener sincronizada la interfaz.

## Responsabilidades del backend

Express se encarga de:

- crear la partida;
- generar alimentos;
- almacenar el estado;
- validar acciones;
- cambiar turnos;
- controlar rondas;
- sumar y restar puntos;
- determinar victoria o empate;
- almacenar un historial;
- devolver respuestas JSON.
