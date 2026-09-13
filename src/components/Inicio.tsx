type Props = {
  cargando: boolean
  onComenzar: () => void
}

export default function Inicio({ cargando, onComenzar }: Props) {
  return (
    <main className="inicio-v3">
      <div className="sol-inicio" />
      <div className="nube-inicio nube-1" />
      <div className="nube-inicio nube-2" />
      <div className="colina colina-1" />
      <div className="colina colina-2" />
      <div className="arbol-decor arbol-1" />
      <div className="arbol-decor arbol-2" />

      <section className="inicio-panel">
        <div className="inicio-encabezado">
          <p className="eyebrow">Proyecto final · React + Express</p>
          <h1>Picnic Rush</h1>
          <h2>Ardillas al picnic</h2>
          <p className="inicio-texto">
            Pip y Poppy recorren el parque buscando comida. En cada turno solo haces
            una acción: <strong>moverte</strong> a otra zona o <strong>recoger</strong>{' '}
            un alimento donde estás. La comida cambia en cada partida, así que siempre
            hay algo distinto.
          </p>
        </div>

        <div className="inicio-jugadores">
          <article className="inicio-jugador pip">
            <img src="/assets/pip.svg" alt="Pip" />
            <div>
              <strong>Pip</strong>
              <span>Ardilla exploradora</span>
            </div>
          </article>

          <div className="inicio-versus">VS</div>

          <article className="inicio-jugador poppy">
            <img src="/assets/poppy.svg" alt="Poppy" />
            <div>
              <strong>Poppy</strong>
              <span>Ardilla recolectora</span>
            </div>
          </article>
        </div>

        <div className="inicio-reglas">
          <article>
            <span>🧭</span>
            <h3>Mover</h3>
            <p>Te desplazas a otra zona del parque y termina tu turno.</p>
          </article>

          <article>
            <span>🍓</span>
            <h3>Recoger</h3>
            <p>Tomas una comida de tu zona actual y sumas puntos.</p>
          </article>

          <article>
            <span>🎯</span>
            <h3>Meta</h3>
            <p>Gana quien llegue primero a 7 puntos o quien tenga más al final.</p>
          </article>

          <article>
            <span>✨</span>
            <h3>Random</h3>
            <p>La comida cambia de lugar en cada nueva partida.</p>
          </article>
        </div>

        <div className="inicio-puntos">
          <span>🌰 Bellota · 1 punto</span>
          <span>🍓 Fresa · 2 puntos</span>
          <span>🍇 Uvas · 2 puntos</span>
          <span>🍪 Galleta · 3 puntos</span>
        </div>

        <button className="boton-principal boton-grande" onClick={onComenzar} disabled={cargando}>
          {cargando ? 'Preparando el bosque...' : 'Comenzar partida'}
        </button>
      </section>
    </main>
  )
}