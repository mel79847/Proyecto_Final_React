import type {
  ComidaId,
  Jugador,
  JugadorId,
  Zona,
  ZonaId,
} from '../types'

const comidas = {
  bellota: {
    icono: '🌰',
    puntos: 1,
    nombre: 'Bellota',
  },

  fresa: {
    icono: '🍓',
    puntos: 2,
    nombre: 'Fresa',
  },

  uva: {
    icono: '🍇',
    puntos: 2,
    nombre: 'Uvas',
  },

  galleta: {
    icono: '🍪',
    puntos: 3,
    nombre: 'Galleta',
  },
}

type Props = {
  zona: Zona
  jugadores: Jugador[]
  turno: JugadorId
  enviando: boolean
  onMover: (
    zona: ZonaId,
  ) => void
  onRecoger: (
    comida: ComidaId,
  ) => void
  onRobar: (
    jugador: JugadorId,
  ) => void
}

export default function ZonaParque({
  zona,
  jugadores,
  turno,
  enviando,
  onMover,
  onRecoger,
  onRobar,
}: Props) {
  const actual =
    jugadores.find(
      (jugador) =>
        jugador.id === turno,
    )

  const rival =
    jugadores.find(
      (jugador) =>
        jugador.id !== turno,
    )

  const estaAqui =
    actual?.zona === zona.id

  const rivalAqui =
    rival?.zona === zona.id

  const puedeRobar =
    estaAqui &&
    rivalAqui &&
    (rival?.puntos ?? 0) > 0

  return (
    <section
      className={`
        map-zone
        map-zone-${zona.id}
        ${estaAqui ? 'current-zone' : ''}
      `}
      data-testid={`zona-${zona.id}`}
    >
      <button
        className="zone-sign"
        onClick={() =>
          onMover(zona.id)
        }
        disabled={
          estaAqui ||
          enviando
        }
        data-testid={`mover-${zona.id}`}
      >
        <span>{zona.icono}</span>

        <strong>
          {zona.nombre}
        </strong>

        <small>
          {estaAqui
            ? 'ESTÁS AQUÍ'
            : 'IR AQUÍ'}
        </small>
      </button>

      <div className="food-area">
        {zona.comidas.map(
          (comida, index) => {
            const info =
              comidas[comida]

            return (
              <button
                key={`${comida}-${index}`}
                className={`
                  food-item
                  ${
                    estaAqui
                      ? 'food-active'
                      : ''
                  }
                `}
                disabled={
                  !estaAqui ||
                  enviando
                }
                onClick={() =>
                  onRecoger(
                    comida,
                  )
                }
                data-testid={`comida-${zona.id}-${comida}`}
              >
                <span>
                  {info.icono}
                </span>

                <strong>
                  {info.nombre}
                </strong>

                <b>
                  +{info.puntos}
                </b>

                {estaAqui && (
                  <small>
                    TOMAR
                  </small>
                )}
              </button>
            )
          },
        )}
      </div>

      {puedeRobar && rival && (
        <button
          className="steal-button"
          disabled={enviando}
          onClick={() =>
            onRobar(
              rival.id,
            )
          }
        >
          🐾 ROBAR 1 PUNTO A{' '}
          {rival.nombre.toUpperCase()}
        </button>
      )}
    </section>
  )
}