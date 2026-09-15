# Reglas

## Inicio de la partida

Pip comienza la partida en la zona Roble.

Poppy comienza en la zona Arbusto.

Cada jugador inicia con 0 puntos.

La distribución de alimentos se genera nuevamente al comenzar una partida.

## Turnos

Los jugadores participan alternando turnos.

En cada turno se realiza una sola acción válida.

Después de completar la acción, el turno pasa al otro jugador.

## Acciones

### Mover

El jugador puede desplazarse desde su zona actual hacia otra zona del parque.

No puede utilizar la acción de mover para seleccionar la zona en la que ya se encuentra.

Mover termina inmediatamente el turno.

### Recoger

El jugador puede recoger un alimento únicamente si se encuentra en la misma zona que ese alimento.

Cuando se recoge una comida:

1. desaparece de la zona;
2. se suman sus puntos al jugador;
3. termina el turno.

Valores de los alimentos:

| Alimento | Puntos |
|---|---:|
| Bellota | 1 |
| Fresa | 2 |
| Uvas | 2 |
| Galleta | 3 |

### Robar

La acción de robar solamente está disponible cuando Pip y Poppy se encuentran en la misma zona.

El rival debe tener al menos 1 punto.

Al realizar esta acción:

- el rival pierde 1 punto;
- el jugador actual recibe 1 punto;
- termina el turno.

No es válido robar si el rival está en otra zona o tiene 0 puntos.

## Recursos compartidos

Los alimentos pertenecen al estado compartido de la partida.

Si un jugador recoge una comida, deja de estar disponible para el otro.

Esto produce competencia entre los jugadores por los mismos recursos.

## Aparición de alimentos

Después de completar una ronda puede aparecer un alimento nuevo en una zona aleatoria.

Una zona no recibe más alimentos si ya contiene cuatro.

## Rondas

Una ronda termina después del turno de Poppy.

La partida tiene un máximo de cinco rondas.

## Condición de victoria

Un jugador gana inmediatamente cuando alcanza al menos 7 puntos.

## Finalización por rondas

Si se completan cinco rondas y ningún jugador alcanza 7 puntos:

- gana quien tenga más puntos;
- si ambos tienen la misma puntuación, se produce un empate.

## Acciones inválidas

El servidor rechaza acciones que no cumplen las reglas.

Algunos casos inválidos son:

- intentar jugar fuera de turno;
- moverse a la misma zona;
- recoger una comida que ya no está disponible;
- seleccionar una zona inexistente;
- intentar robar a un jugador que está en otra zona;
- intentar robar cuando el rival no tiene puntos;
- realizar acciones después de que la partida terminó.

## Estados principales

La partida mantiene los siguientes estados:

- posición de Pip;
- posición de Poppy;
- puntuación de cada jugador;
- turno actual;
- número de ronda;
- alimentos disponibles en cada zona;
- estado de la partida;
- ganador;
- mensajes de la partida;
- historial de acciones.

## Elementos que cambian durante la partida

Durante el juego:

- las ardillas cambian de posición;
- los alimentos desaparecen al ser recogidos;
- pueden aparecer nuevos alimentos;
- cambia la puntuación;
- cambia el turno;
- cambia la ronda;
- aparece el resultado final.
