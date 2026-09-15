# API HTTP REST

## GET /api/partida
Devuelve el estado completo de la partida en JSON.

## POST /api/reiniciar
Crea una nueva partida con distribución aleatoria de alimentos.

Entrada:
```json
{ "reiniciar": true }
```

## POST /api/accion
Procesa una acción del jugador actual.

Mover:
```json
{ "jugador": "pip", "accion": "mover", "objetivo": "manta" }
```

Recoger:
```json
{ "jugador": "pip", "accion": "recoger", "objetivo": "fresa" }
```

El servidor valida turno, zona y disponibilidad de la comida. Todas las entradas y respuestas usan JSON.
