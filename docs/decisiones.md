# Decisiones técnicas

- Se eligieron solo dos acciones para mantener la lógica fácil de explicar: mover y recoger.
- React se encarga de mostrar el parque, recibir clics y actualizar la interfaz.
- Express crea la partida, distribuye comida aleatoria, valida acciones, cambia turnos, suma puntos y determina el ganador.
- Se usa `fetch` nativo para comunicar React con Express.
- En desarrollo Vite usa proxy `/api` hacia Express.
- En producción Express sirve el frontend compilado para usar un solo dominio y puerto.
- No se usan Redux, React Router, Axios, Tailwind, Bootstrap ni motores de juego.
