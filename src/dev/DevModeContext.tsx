import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import type { DevPanelNote, DevInsert, PanelActions } from './types'

interface DevModeContextValue {
  /** Whether dev mode UI is visible */
  active: boolean
  toggle: () => void

  /** Per-panel notes keyed by panel index */
  panelNotes: Map<number, DevPanelNote>
  setPanelNote: (index: number, panelId: string, note: string) => void
  setPanelAction: (
    index: number,
    panelId: string,
    action: keyof PanelActions,
    value: boolean,
  ) => void
  setBackgroundPrompt: (index: number, panelId: string, prompt: string) => void
  setHasExistingBackground: (index: number, value: boolean) => void

  /** Insert requests (new panels between existing ones) */
  inserts: DevInsert[]
  addInsert: (insert: DevInsert) => void
  updateInsert: (afterIndex: number, updates: Partial<DevInsert>) => void
  removeInsert: (afterIndex: number) => void

  /** Clear all notes and inserts */
  clearAll: () => void

  /** Count of pending changes */
  pendingCount: number
}

const DevModeContext = createContext<DevModeContextValue | null>(null)

export function useDevMode() {
  return useContext(DevModeContext)
}

/** Only renders children when dev mode context exists and is active */
export function DevOnly({ children }: { children: ReactNode }) {
  const ctx = useDevMode()
  if (!ctx?.active) return null
  return <>{children}</>
}

export default function DevModeProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(() => {
    return new URLSearchParams(window.location.search).has('dev')
  })
  const [panelNotes, setPanelNotes] = useState<Map<number, DevPanelNote>>(
    () => new Map(),
  )
  const [inserts, setInserts] = useState<DevInsert[]>([])

  const toggle = useCallback(() => setActive((a) => !a), [])

  const defaultActions: PanelActions = { delete: false, background: false }

  const getOrCreate = (
    map: Map<number, DevPanelNote>,
    index: number,
    panelId: string,
  ): DevPanelNote =>
    map.get(index) ?? {
      panelId,
      panelIndex: index,
      note: '',
      actions: { ...defaultActions },
      hasExistingBackground: false,
      backgroundPrompt: '',
    }

  const setPanelNote = useCallback(
    (index: number, panelId: string, note: string) => {
      setPanelNotes((prev) => {
        const next = new Map(prev)
        const existing = getOrCreate(prev, index, panelId)
        next.set(index, { ...existing, panelId, note })
        return next
      })
    },
    [],
  )

  const setPanelAction = useCallback(
    (
      index: number,
      panelId: string,
      action: keyof PanelActions,
      value: boolean,
    ) => {
      setPanelNotes((prev) => {
        const next = new Map(prev)
        const existing = getOrCreate(prev, index, panelId)
        next.set(index, {
          ...existing,
          panelId,
          actions: { ...existing.actions, [action]: value },
        })
        return next
      })
    },
    [],
  )

  const setBackgroundPrompt = useCallback(
    (index: number, panelId: string, prompt: string) => {
      setPanelNotes((prev) => {
        const next = new Map(prev)
        const existing = getOrCreate(prev, index, panelId)
        next.set(index, { ...existing, panelId, backgroundPrompt: prompt })
        return next
      })
    },
    [],
  )

  const setHasExistingBackground = useCallback(
    (index: number, value: boolean) => {
      setPanelNotes((prev) => {
        const next = new Map(prev)
        const existing = next.get(index)
        if (existing) {
          next.set(index, { ...existing, hasExistingBackground: value })
        }
        return next
      })
    },
    [],
  )

  const addInsert = useCallback((insert: DevInsert) => {
    setInserts((prev) => {
      // Replace existing insert at same position
      const filtered = prev.filter((i) => i.afterIndex !== insert.afterIndex)
      return [...filtered, insert].sort((a, b) => a.afterIndex - b.afterIndex)
    })
  }, [])

  const updateInsert = useCallback(
    (afterIndex: number, updates: Partial<DevInsert>) => {
      setInserts((prev) =>
        prev.map((i) => (i.afterIndex === afterIndex ? { ...i, ...updates } : i)),
      )
    },
    [],
  )

  const removeInsert = useCallback((afterIndex: number) => {
    setInserts((prev) => prev.filter((i) => i.afterIndex !== afterIndex))
  }, [])

  const clearAll = useCallback(() => {
    setPanelNotes(new Map())
    setInserts([])
  }, [])

  // Count notes with content or actions set, plus inserts
  const pendingCount =
    Array.from(panelNotes.values()).filter(
      (n) =>
        n.note.trim() ||
        n.actions.delete ||
        n.actions.background,
    ).length + inserts.filter((i) => i.note.trim()).length

  return (
    <DevModeContext.Provider
      value={{
        active,
        toggle,
        panelNotes,
        setPanelNote,
        setPanelAction,
        setBackgroundPrompt,
        setHasExistingBackground,
        inserts,
        addInsert,
        updateInsert,
        removeInsert,
        clearAll,
        pendingCount,
      }}
    >
      {children}
    </DevModeContext.Provider>
  )
}
