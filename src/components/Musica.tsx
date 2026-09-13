import { useRef, useState } from 'react'

const MUSICA =
  'https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Entertainer_-_Scott_Joplin.ogg'

export default function Musica() {
  const audio = useRef<HTMLAudioElement>(null)
  const [sonando, setSonando] = useState(false)

  async function alternar() {
    if (!audio.current) return

    if (sonando) {
      audio.current.pause()
      setSonando(false)
      return
    }

    try {
      await audio.current.play()
      setSonando(true)
    } catch {
      setSonando(false)
    }
  }

  return (
    <div className="musica">
      <audio ref={audio} src={MUSICA} loop preload="none" />
      <button onClick={alternar} aria-label={sonando ? 'Pausar música' : 'Reproducir música'}>
        {sonando ? '🔊 Música' : '🔈 Música'}
      </button>
    </div>
  )
}
