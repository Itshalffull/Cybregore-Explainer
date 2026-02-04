import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
} from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ExplainerDef {
  title: string
  content: ReactNode
}

interface BreadcrumbEntry {
  explainer: string
  title: string
  scrollY: number
  /** Label shown in breadcrumb (e.g. panel title or jump link text) */
  fromLabel: string
}

interface ExplainerContextValue {
  current: string
  jumpTo: (explainer: string, opts?: { fromLabel?: string }) => void
  jumpBack: (toIndex?: number) => void
  stack: BreadcrumbEntry[]
  /** True during transition — prevents double-clicks */
  transitioning: boolean
}

type TransitionPhase = 'idle' | 'exiting' | 'entering'
type TransitionDir = 'forward' | 'back'

const ExplainerContext = createContext<ExplainerContextValue | null>(null)

export function useExplainer() {
  const ctx = useContext(ExplainerContext)
  if (!ctx) throw new Error('useExplainer must be used within ExplainerRouter')
  return ctx
}

// ─── Provider ────────────────────────────────────────────────────────────────

interface ExplainerRouterProps {
  explainers: Record<string, ExplainerDef>
  defaultExplainer: string
  children?: ReactNode
}

const TRANSITION_MS = 280

export default function ExplainerRouter({
  explainers,
  defaultExplainer,
}: ExplainerRouterProps) {
  const [current, setCurrent] = useState(defaultExplainer)
  const [stack, setStack] = useState<BreadcrumbEntry[]>([])
  const [phase, setPhase] = useState<TransitionPhase>('idle')
  const [dir, setDir] = useState<TransitionDir>('forward')
  const pendingRef = useRef<{ explainer: string; scrollY: number } | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const transitioning = phase !== 'idle'

  // ── Jump forward to another explainer ──
  const jumpTo = useCallback(
    (explainer: string, opts?: { fromLabel?: string }) => {
      if (phase !== 'idle') return
      if (!explainers[explainer]) {
        console.warn(`ExplainerRouter: unknown explainer "${explainer}"`)
        return
      }

      // Save current position to stack
      const entry: BreadcrumbEntry = {
        explainer: current,
        title: explainers[current].title,
        scrollY: window.scrollY,
        fromLabel: opts?.fromLabel || explainers[current].title,
      }

      pendingRef.current = { explainer, scrollY: 0 }
      setStack((s) => [...s, entry])
      setDir('forward')
      setPhase('exiting')
    },
    [current, explainers, phase],
  )

  // ── Jump back to a previous breadcrumb ──
  const jumpBack = useCallback(
    (toIndex?: number) => {
      if (phase !== 'idle' || stack.length === 0) return

      const idx = toIndex ?? stack.length - 1
      const target = stack[idx]
      if (!target) return

      pendingRef.current = {
        explainer: target.explainer,
        scrollY: target.scrollY,
      }
      // Pop the stack down to the target
      setStack((s) => s.slice(0, idx))
      setDir('back')
      setPhase('exiting')
    },
    [phase, stack],
  )

  // ── Transition state machine ──
  useEffect(() => {
    if (phase === 'exiting') {
      const timer = setTimeout(() => {
        if (!pendingRef.current) return
        const { explainer, scrollY } = pendingRef.current
        pendingRef.current = null

        // Swap the explainer
        setCurrent(explainer)

        // After React renders the new explainer, restore scroll
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY)
          // Give ScrollTrigger a frame to initialize pins
          requestAnimationFrame(() => {
            ScrollTrigger.refresh()
            setPhase('entering')
          })
        })
      }, TRANSITION_MS)
      return () => clearTimeout(timer)
    }

    if (phase === 'entering') {
      const timer = setTimeout(() => {
        setPhase('idle')
      }, TRANSITION_MS)
      return () => clearTimeout(timer)
    }
  }, [phase])

  // ── Sync hash ──
  useEffect(() => {
    window.location.hash = current === defaultExplainer ? '' : current
  }, [current, defaultExplainer])

  // ── Read hash on mount ──
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash && explainers[hash]) {
      setCurrent(hash)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Transition CSS class ──
  let transitionClass = 'explainer-wrapper'
  if (phase === 'exiting') {
    transitionClass += dir === 'forward'
      ? ' explainer-exit-left'
      : ' explainer-exit-right'
  } else if (phase === 'entering') {
    transitionClass += dir === 'forward'
      ? ' explainer-enter-right'
      : ' explainer-enter-left'
  }

  const def = explainers[current]
  if (!def) return null

  return (
    <ExplainerContext.Provider
      value={{ current, jumpTo, jumpBack, stack, transitioning }}
    >
      <div
        ref={wrapperRef}
        className={transitionClass}
        style={{ minHeight: '100dvh' }}
      >
        {def.content}
      </div>
      {children}
    </ExplainerContext.Provider>
  )
}
