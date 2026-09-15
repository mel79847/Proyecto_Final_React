# Reglas

1. Pip juega primero.
2. En un turno se realiza una sola acción: **mover** o **recoger**.
3. Mover cambia la zona del jugador y termina el turno.
4. Recoger solo es válido cuando la comida está en la misma zona del jugador.
5. La comida desaparece del tablero cuando alguien la recoge, por lo que ambos jugadores compiten por los mismos recursos.
6. Bellota vale 1 punto, fresa 2, uvas 2 y galleta 3.
7. Al terminar una ronda puede aparecer nueva comida en una zona aleatoria.
8. Gana quien alcanza 7 puntos primero.
9. Si se completan cinco rondas sin alcanzar 7 puntos, gana quien tenga más puntos. Puede existir empate.

## Estados principales

- posición de cada ardilla;
- puntos;
- turno;
- ronda;
- alimentos compartidos;
- estado y ganador de la partida.
