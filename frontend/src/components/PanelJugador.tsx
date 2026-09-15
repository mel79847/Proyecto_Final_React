import type { Jugador } from '../types'

type Props = {
  jugador: Jugador
  activo: boolean
  meta: number
}

export default function PanelJugador({ jugador, activo, meta }: Props) {
  const progreso = Math.min(100, (jugador.puntos / meta) * 100)
  const imagen = jugador.id === 'pip' ? '/assets/pip.svg' : '/assets/poppy.svg'

  return (
    <aside className={`panel-jugador panel-${jugador.id} ${activo ? 'activo' : ''}`}>
      <div className="cabecera-jugador">
        <img src={imagen} alt={jugador.nombre} />
        <div>
          <span>{activo ? '¡TU TURNO!' : 'ESPERANDO'}</span>
          <h3>{jugador.nombre}</h3>
          <small>📍 {jugador.zona}</small>
        </div>
      </div>

      <div className="puntaje-grande">
        <strong>{jugador.puntos}</strong>
        <span>/ {meta} puntos</span>
      </div>

      <div className="barra-progreso" aria-label={`Progreso de ${jugador.nombre}`}>
        <span style={{ width: `${progreso}%` }} />
      </div>

      <p className="ayuda-panel">
        {jugador.puntos >= meta ? '¡Llegó a la meta!' : `Le faltan ${meta - jugador.puntos} puntos.`}
      </p>
    </aside>
  )
}
