import { useState } from 'react'
import Musica from './Musica'
import ZonaParque from './ZonaParque'

import type {
  Accion,
  ComidaId,
  JugadorId,
  Partida,
  RespuestaApi,
  ZonaId,
} from '../types'

type Props = {
  partida: Partida
  setPartida: (
    partida: Partida,
  ) => void
  onReiniciar: () => void
  onVolver: () => void
}

function esError(
  respuesta: RespuestaApi,
): respuesta is {
  error: string
  partida: Partida
} {
  return 'error' in respuesta
}

export default function Juego({
  partida,
  setPartida,
  onReiniciar,
  onVolver,
}: Props) {
  const [enviando, setEnviando] =
    useState(false)

  const [error, setError] =
    useState('')

  const actual =
    partida.jugadores.find(
      (jugador) =>
        jugador.id ===
        partida.turno,
    )

  const rival =
    partida.jugadores.find(
      (jugador) =>
        jugador.id !==
        partida.turno,
    )

  const zonaActual =
    partida.zonas.find(
      (zona) =>
        zona.id ===
        actual?.zona,
    )

  const puedeRobar =
    actual &&
    rival &&
    actual.zona ===
      rival.zona &&
    rival.puntos > 0

  async function enviarAccion(
    accion: Accion,
    objetivo:
      | ZonaId
      | ComidaId
      | JugadorId,
  ) {
    if (
      enviando ||
      partida.estado ===
        'terminado'
    ) {
      return
    }

    setEnviando(true)

    setError('')

    try {
      const respuesta =
        await fetch(
          '/api/accion',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body:
              JSON.stringify({
                jugador:
                  partida.turno,

                accion,

                objetivo,
              }),
          },
        )

      const datos:
        RespuestaApi =
        await respuesta.json()

      if (
        esError(datos)
      ) {
        setError(
          datos.error,
        )

        setPartida(
          datos.partida,
        )
      } else {
        setPartida(datos)
      }
    } catch {
      setError(
        'No se pudo comunicar con el servidor.',
      )
    } finally {
      setEnviando(false)
    }
  }

  function nombreGanador(
    ganador:
      | JugadorId
      | 'empate'
      | null,
  ) {
    if (
      ganador ===
      'empate'
    ) {
      return 'Empate'
    }

    return (
      partida.jugadores.find(
        (jugador) =>
          jugador.id ===
          ganador,
      )?.nombre ?? ''
    )
  }

  function instruccion() {
    if (
      puedeRobar &&
      rival
    ) {
      return `¡${rival.nombre} está aquí! Recoge comida, muévete o róbale 1 punto.`
    }

    if (
      zonaActual &&
      zonaActual.comidas.length >
        0
    ) {
      return 'Haz clic en una comida para recogerla o en otro letrero para moverte.'
    }

    return 'Aquí ya no queda comida. Elige otro letrero para moverte.'
  }

  const pip =
    partida.jugadores[0]

  const poppy =
    partida.jugadores[1]

  return (
    <main className="game-screen">

      <header className="game-hud">

        <div className="hud-player">
          <img
            src="/assets/pip.svg"
            alt="Pip"
          />

          <div>
            <span>PIP</span>

            <strong>
              {pip.puntos}
              <small>
                /{partida.metaPuntos}
              </small>
            </strong>
          </div>
        </div>

        <div
          className="hud-middle"
          data-testid="turno-banner"
        >
          <small>
            RONDA{' '}
            {partida.ronda}/
            {partida.maxRondas}
          </small>

          <h1>
            ¡TURNO DE{' '}
            {actual?.nombre.toUpperCase()}!
          </h1>

          <p>
            {instruccion()}
          </p>
        </div>

        <div className="hud-player hud-player-right">

          <div>
            <span>
              POPPY
            </span>

            <strong>
              {poppy.puntos}
              <small>
                /{partida.metaPuntos}
              </small>
            </strong>
          </div>

          <img
            src="/assets/poppy.svg"
            alt="Poppy"
          />

        </div>

      </header>

      <div className="game-tools">
        <Musica />

        <button
          onClick={
            onReiniciar
          }
        >
          ↻
        </button>

        <button
          onClick={onVolver}
        >
          ?
        </button>
      </div>

      <section className="forest-board">

        <div className="sun" />

        <div className="cloud cloud-one" />
        <div className="cloud cloud-two" />

        <div className="tree tree-left" />
        <div className="tree tree-right" />

        <div className="bush bush-one" />
        <div className="bush bush-two" />

        <div className="path" />

        <div className="picnic-blanket" />

        <div className="butterfly butterfly-one">
          🦋
        </div>

        <div className="butterfly butterfly-two">
          🦋
        </div>

        {partida.zonas.map(
          (zona) => (
            <ZonaParque
              key={zona.id}
              zona={zona}
              jugadores={
                partida.jugadores
              }
              turno={
                partida.turno
              }
              enviando={
                enviando
              }
              onMover={(
                destino,
              ) =>
                enviarAccion(
                  'mover',
                  destino,
                )
              }
              onRecoger={(
                comida,
              ) =>
                enviarAccion(
                  'recoger',
                  comida,
                )
              }
              onRobar={(
                jugador,
              ) =>
                enviarAccion(
                  'robar',
                  jugador,
                )
              }
            />
          ),
        )}

        {partida.jugadores.map(
          (jugador) => (
            <div
              key={
                jugador.id
              }
              data-testid={`ardilla-${jugador.id}`}
              className={`
                squirrel
                squirrel-${jugador.id}
                pos-${jugador.zona}
                ${
                  jugador.id ===
                  partida.turno
                    ? 'playing'
                    : ''
                }
              `}
            >
              <img
                src={
                  jugador.id ===
                  'pip'
                    ? '/assets/pip.svg'
                    : '/assets/poppy.svg'
                }
                alt={
                  jugador.nombre
                }
              />

              {jugador.id ===
                partida.turno && (
                <span className="turn-arrow">
                  ▼
                </span>
              )}
            </div>
          ),
        )}

      </section>

      {error && (
        <div className="toast-error">
          ⚠ {error}
        </div>
      )}

      {partida.estado ===
        'terminado' && (
        <div
          className="result-overlay"
          data-testid="resultado"
        >
          <section className="result-box">

            <span>🏆</span>

            <h2>
              {partida.ganador ===
              'empate'
                ? '¡Empate!'
                : `¡Ganó ${nombreGanador(
                    partida.ganador,
                  )}!`}
            </h2>

            <p>
              {
                partida.mensaje
              }
            </p>

            <button
              onClick={
                onReiniciar
              }
            >
              Jugar otra vez
            </button>

          </section>
        </div>
      )}

    </main>
  )
}