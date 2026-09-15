export type JugadorId = 'pip' | 'poppy'

export type ZonaId =
  | 'roble'
  | 'manta'
  | 'arbusto'
  | 'canasta'

export type ComidaId =
  | 'bellota'
  | 'fresa'
  | 'uva'
  | 'galleta'

export type Accion =
  | 'mover'
  | 'recoger'
  | 'robar'

export type Jugador = {
  id: JugadorId
  nombre: string
  zona: ZonaId
  puntos: number
}

export type Zona = {
  id: ZonaId
  nombre: string
  icono: string
  comidas: ComidaId[]
}

export type Partida = {
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

export type RespuestaApi =
  | Partida
  | {
      error: string
      partida: Partida
    }