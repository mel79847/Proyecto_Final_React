import express from 'express'
import path from 'node:path'

type JugadorId = 'pip' | 'poppy'
type ZonaId = 'roble' | 'manta' | 'arbusto' | 'canasta'
type ComidaId = 'bellota' | 'fresa' | 'uva' | 'galleta'
type Accion = 'mover' | 'recoger' | 'robar'

type Jugador = {
  id: JugadorId
  nombre: string
  zona: ZonaId
  puntos: number
}

type Zona = {
  id: ZonaId
  nombre: string
  icono: string
  comidas: ComidaId[]
}

type Partida = {
  jugadores: Jugador[]
  zonas: Zona[]
  turno: JugadorId
  ronda: number
  maxRondas: number
  metaPuntos: number
  estado: 'jugando' | 'terminado'
  ganador: JugadorId | 'empate' | null
  mensaje: string
  historial: string[]
}

type AccionBody = {
  jugador?: JugadorId
  accion?: Accion
  objetivo?: ZonaId | ComidaId | JugadorId
}

const app = express()

const port =
  Number(process.env.PORT) || 3000

app.use(express.json())

const puntosComida: Record<
  ComidaId,
  number
> = {
  bellota: 1,
  fresa: 2,
  uva: 2,
  galleta: 3,
}

const comidasPosibles: ComidaId[] = [
  'bellota',
  'bellota',
  'fresa',
  'uva',
  'galleta',
]

function aleatorio<T>(
  lista: T[],
): T {
  return lista[
    Math.floor(
      Math.random() *
        lista.length,
    )
  ]
}

function comidasAleatorias(
  cantidad: number,
): ComidaId[] {
  return Array.from(
    { length: cantidad },
    () =>
      aleatorio(
        comidasPosibles,
      ),
  )
}

function crearPartida(): Partida {
  return {
    jugadores: [
      {
        id: 'pip',
        nombre: 'Pip',
        zona: 'roble',
        puntos: 0,
      },

      {
        id: 'poppy',
        nombre: 'Poppy',
        zona: 'arbusto',
        puntos: 0,
      },
    ],

    zonas: [
      {
        id: 'roble',
        nombre: 'Roble',
        icono: '🌳',
        comidas:
          comidasAleatorias(3),
      },

      {
        id: 'manta',
        nombre: 'Manta',
        icono: '🧺',
        comidas:
          comidasAleatorias(3),
      },

      {
        id: 'arbusto',
        nombre: 'Arbusto',
        icono: '🌿',
        comidas:
          comidasAleatorias(3),
      },

      {
        id: 'canasta',
        nombre: 'Canasta',
        icono: '🎒',
        comidas:
          comidasAleatorias(2),
      },
    ],

    turno: 'pip',

    ronda: 1,

    maxRondas: 5,

    metaPuntos: 7,

    estado: 'jugando',

    ganador: null,

    mensaje:
      'Pip comienza. Elige una comida del Roble o muévete a otra zona.',

    historial: [
      'Comienza el picnic. Pip juega primero.',
    ],
  }
}

let partida = crearPartida()

function jugadorPorId(
  id: JugadorId,
) {
  return partida.jugadores.find(
    (jugador) =>
      jugador.id === id,
  )
}

function zonaPorId(
  id: ZonaId,
) {
  return partida.zonas.find(
    (zona) => zona.id === id,
  )
}

function agregarHistorial(
  texto: string,
) {
  partida.historial = [
    ...partida.historial,
    texto,
  ].slice(-8)
}

function errorJugada(
  mensaje: string,
  res: express.Response,
) {
  partida.mensaje = mensaje

  return res
    .status(400)
    .json({
      error: mensaje,
      partida,
    })
}

function revisarGanador(
  jugador: Jugador,
) {
  if (
    jugador.puntos <
    partida.metaPuntos
  ) {
    return false
  }

  partida.estado =
    'terminado'

  partida.ganador =
    jugador.id

  partida.mensaje =
    `¡${jugador.nombre} llegó a ${jugador.puntos} puntos y ganó el picnic!`

  agregarHistorial(
    partida.mensaje,
  )

  return true
}

function terminarPorRondas() {
  const pip =
    partida.jugadores[0]

  const poppy =
    partida.jugadores[1]

  partida.estado =
    'terminado'

  if (
    pip.puntos ===
    poppy.puntos
  ) {
    partida.ganador =
      'empate'

    partida.mensaje =
      `Empate: ambos terminaron con ${pip.puntos} puntos.`

    return
  }

  const ganador =
    pip.puntos >
    poppy.puntos
      ? pip
      : poppy

  partida.ganador =
    ganador.id

  partida.mensaje =
    `${ganador.nombre} gana con ${ganador.puntos} puntos.`
}

function aparecerComida() {
  const zona =
    aleatorio(
      partida.zonas,
    )

  if (
    zona.comidas.length >= 4
  ) {
    return
  }

  const comida =
    aleatorio(
      comidasPosibles,
    )

  zona.comidas = [
    ...zona.comidas,
    comida,
  ]

  agregarHistorial(
    `Apareció comida nueva en ${zona.nombre}.`,
  )
}

function terminarTurno(
  jugador: Jugador,
) {
  if (
    jugador.id === 'poppy'
  ) {
    if (
      partida.ronda >=
      partida.maxRondas
    ) {
      terminarPorRondas()

      return
    }

    partida.ronda += 1

    aparecerComida()
  }

  partida.turno =
    jugador.id === 'pip'
      ? 'poppy'
      : 'pip'

  const siguiente =
    jugadorPorId(
      partida.turno,
    )

  partida.mensaje =
    `Ahora juega ${siguiente?.nombre}.`
}

app.get(
  '/api/partida',
  (_req, res) => {
    return res.json(
      partida,
    )
  },
)

app.post(
  '/api/reiniciar',
  (_req, res) => {
    partida =
      crearPartida()

    return res.json(
      partida,
    )
  },
)

app.post(
  '/api/accion',
  (req, res) => {
    const body =
      req.body as AccionBody

    const jugadorId =
      body.jugador

    const accion =
      body.accion

    const objetivo =
      body.objetivo

    if (
      !jugadorId ||
      !accion ||
      !objetivo
    ) {
      return errorJugada(
        'Faltan datos para realizar la acción.',
        res,
      )
    }

    if (
      partida.estado ===
      'terminado'
    ) {
      return errorJugada(
        'La partida ya terminó.',
        res,
      )
    }

    if (
      jugadorId !==
      partida.turno
    ) {
      return errorJugada(
        'No es el turno de ese jugador.',
        res,
      )
    }

    const jugador =
      jugadorPorId(
        jugadorId,
      )

    if (!jugador) {
      return errorJugada(
        'Jugador no encontrado.',
        res,
      )
    }

    // MOVER
    
    if (
      accion === 'mover'
    ) {
      const destino =
        objetivo as ZonaId

      const zonaDestino =
        zonaPorId(destino)

      if (!zonaDestino) {
        return errorJugada(
          'La zona no existe.',
          res,
        )
      }

      if (
        jugador.zona ===
        destino
      ) {
        return errorJugada(
          `${jugador.nombre} ya está aquí.`,
          res,
        )
      }

      jugador.zona =
        destino

      agregarHistorial(
        `${jugador.nombre} se movió a ${zonaDestino.nombre}.`,
      )

      terminarTurno(
        jugador,
      )

      return res.json(
        partida,
      )
    }

// RECOGER

    if (
      accion ===
      'recoger'
    ) {
      const comida =
        objetivo as ComidaId

      const zona =
        zonaPorId(
          jugador.zona,
        )

      if (
        !zona ||
        !zona.comidas.includes(
          comida,
        )
      ) {
        return errorJugada(
          'Esa comida ya no está disponible.',
          res,
        )
      }

      const indice =
        zona.comidas.indexOf(
          comida,
        )

      zona.comidas =
        zona.comidas.filter(
          (_item, posicion) =>
            posicion !==
            indice,
        )

      jugador.puntos +=
        puntosComida[
          comida
        ]

      agregarHistorial(
        `${jugador.nombre} recogió ${comida} (+${puntosComida[comida]}).`,
      )

      if (
        revisarGanador(
          jugador,
        )
      ) {
        return res.json(
          partida,
        )
      }

      terminarTurno(
        jugador,
      )

      return res.json(
        partida,
      )
    }

//  ROBAR

    if (
      accion === 'robar'
    ) {
      const rivalId =
        objetivo as JugadorId

      const rival =
        jugadorPorId(
          rivalId,
        )

      if (
        !rival ||
        rival.id ===
          jugador.id
      ) {
        return errorJugada(
          'Rival no válido.',
          res,
        )
      }

      if (
        rival.zona !==
        jugador.zona
      ) {
        return errorJugada(
          `${rival.nombre} no está en tu zona.`,
          res,
        )
      }

      if (
        rival.puntos <= 0
      ) {
        return errorJugada(
          `${rival.nombre} todavía no tiene comida para robar.`,
          res,
        )
      }

      rival.puntos -= 1

      jugador.puntos += 1

      partida.mensaje =
        `¡${jugador.nombre} robó 1 punto de comida a ${rival.nombre}!`

      agregarHistorial(
        partida.mensaje,
      )

      if (
        revisarGanador(
          jugador,
        )
      ) {
        return res.json(
          partida,
        )
      }

      terminarTurno(
        jugador,
      )

      return res.json(
        partida,
      )
    }

    return errorJugada(
      'Acción no válida.',
      res,
    )
  },
)

const frontendDist =
  path.resolve(
    process.cwd(),
    'frontend',
    'dist',
  )

app.use(
  express.static(
    frontendDist,
  ),
)

app.use(
  (req, res, next) => {
    if (
      req.method === 'GET' &&
      !req.path.startsWith(
        '/api',
      )
    ) {
      return res.sendFile(
        path.join(
          frontendDist,
          'index.html',
        ),
      )
    }

    return next()
  },
)

app.listen(
  port,
  () => {
    console.log(
      `Picnic Rush disponible en http://localhost:${port}`,
    )
  },
)