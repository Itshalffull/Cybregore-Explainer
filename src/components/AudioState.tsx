import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface AudioStateValue {
  /** True when user has explicitly muted */
  muted: boolean
  /** Global volume multiplier (0-1) */
  volume: number
  toggleMute: () => void
  setVolume: (v: number) => void
}

const AudioStateContext = createContext<AudioStateValue | null>(null)

export function useAudioState() {
  const ctx = useContext(AudioStateContext)
  if (!ctx) throw new Error('useAudioState must be used within AudioStateProvider')
  return ctx
}

export default function AudioStateProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(false)
  const [volume, setVolumeRaw] = useState(1)

  const toggleMute = useCallback(() => setMuted((m) => !m), [])
  const setVolume = useCallback((v: number) => {
    setVolumeRaw(Math.max(0, Math.min(1, v)))
    // If user drags volume up from 0, un-mute
    if (v > 0) setMuted(false)
  }, [])

  return (
    <AudioStateContext.Provider value={{ muted, volume, toggleMute, setVolume }}>
      {children}
    </AudioStateContext.Provider>
  )
}
