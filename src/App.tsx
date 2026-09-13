import { useEffect, useState } from 'react'
import Inicio from './components/Inicio'
import Juego from './components/Juego'
import type { Partida } from './types'
import './App.css'

export default function App() {
  const [pantalla, setPantalla] = useState<'inicio' | 'juego'>('inicio')
  const [partida, setPartida] = useState<Partida | null>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch('/api/partida')
      .then((respuesta) => respuesta.json())
      .then((datos: Partida) => setPartida(datos))
      .finally(() => setCargando(false))
  }, [])

  async function comenzarPartida() {
    setCargando(true)

    const respuesta = await fetch('/api/reiniciar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reiniciar: true }),
    })

    const datos: Partida = await respuesta.json()
    setPartida(datos)
    setPantalla('juego')
    setCargando(false)
  }

  if (pantalla === 'inicio') {
    return <Inicio cargando={cargando} onComenzar={comenzarPartida} />
  }

  if (!partida) {
    return <main className="pantalla-carga">Preparando el picnic...</main>
  }

  return (
    <Juego
      partida={partida}
      setPartida={setPartida}
      onReiniciar={comenzarPartida}
      onVolver={() => setPantalla('inicio')}
    />
  )
}
