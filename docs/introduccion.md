# Introducción

## Nombre del juego

**Picnic Rush: Ardillas al picnic**

## Descripción

Picnic Rush es un juego competitivo para dos jugadores que utilizan el mismo dispositivo.

Los personajes son Pip y Poppy, dos ardillas que recorren distintas zonas de un parque buscando alimentos.

Durante cada turno, el jugador debe tomar una decisión entre moverse a otra zona, recoger una comida disponible o intentar robar un punto al rival cuando ambos se encuentran en el mismo lugar.

Cada alimento tiene un valor diferente:

- bellota: 1 punto;
- fresa: 2 puntos;
- uvas: 2 puntos;
- galleta: 3 puntos.

Los alimentos son recursos compartidos. Cuando un jugador recoge uno, desaparece del escenario y deja de estar disponible para el rival.

Además, la distribución de alimentos cambia entre partidas y pueden aparecer nuevos alimentos durante el juego.

## Propósito

El propósito del proyecto es implementar un juego completo utilizando React y Express, demostrando la comunicación real entre frontend y backend mediante una API HTTP REST.

La aplicación busca que el estado de la partida sea comprensible directamente desde la interfaz, mostrando posiciones, turno, puntuaciones, recursos disponibles, mensajes importantes y resultado final.

## Jugadores

El juego tiene dos jugadores:

- **Pip**
- **Poppy**

Ambos juegan por turnos en el mismo dispositivo.

## Experiencia de juego

El jugador observa un parque dividido en cuatro zonas:

- Roble;
- Manta;
- Arbusto;
- Canasta.

Cada zona puede contener distintos alimentos.

En su turno, el jugador evalúa qué acción le conviene realizar según su ubicación, los alimentos disponibles, la puntuación y la ubicación del rival.

## Finalización

La partida termina cuando ocurre una de estas condiciones:

- un jugador alcanza 7 puntos;
- se completan cinco rondas.

Si termina la quinta ronda sin que alguien alcance 7 puntos, gana quien tenga la mayor puntuación.

Si ambos jugadores tienen la misma cantidad de puntos, el resultado es empate.
