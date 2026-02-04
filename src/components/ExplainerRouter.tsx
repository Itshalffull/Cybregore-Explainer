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
import type { ExplainerMetadata } from '../types/metadata'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ExplainerDef {
  title: string
  /**
   * The rendered explainer content. Omit to register a stub —
   * stubs are invisible to users but appear in developer tooling.
   * Once content is provided, the explainer becomes live automatically.
   */
  content?: ReactNode
  /** Structured metadata for narrative documentation and search/discovery */
  metadata?: ExplainerMetadata
  /**
   * Asset URLs to prefetch when this explainer is registered but not active.
   * Typically the first panel's background image/video so jumps feel instant.
   */
  preloadSrcs?: string[]
}

/** Returns true if the explainer has been implemented (has content) */
export function isImplemented(def: ExplainerDef): boolean {
  return def.content != null
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
  /** All registered explainers (for search/discovery) */
  explainers: Record<string, ExplainerDef>
}

type TransitionPhase = 'idle' | 'exiting' | 'entering'
type TransitionDir = 'forward' | 'back'

const ExplainerContext = createContext<ExplainerContextValue | null>(null)

export function useExplainer() {
  const ctx = useContext(ExplainerContext)
  if (!ctx) throw new Error('useExplainer must be used within ExplainerRouter')
  return ctx
}

/** Access metadata for the currently active explainer */
export function useExplainerMetadata() {
  const { current, explainers } = useExplainer()
  return explainers[current]?.metadata ?? null
}

/** Access all implemented explainer metadata (for search/listing) */
export function useAllExplainerMetadata() {
  const { explainers } = useExplainer()
  return Object.entries(explainers)
    .filter(([, def]) => isImplemented(def))
    .map(([id, def]) => ({
      id,
      title: def.title,
      metadata: def.metadata,
    }))
}

/**
 * List all stub (unimplemented) explainers — metadata-only, no content yet.
 * Useful for developer tooling, dashboards, and planning.
 */
export function useStubExplainers() {
  const { explainers } = useExplainer()
  return Object.entries(explainers)
    .filter(([, def]) => !isImplemented(def))
    .map(([id, def]) => ({
      id,
      title: def.title,
      metadata: def.metadata,
    }))
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
  children,
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
      if (!isImplemented(explainers[explainer])) {
        console.warn(`ExplainerRouter: explainer "${explainer}" is a stub (no content yet)`)
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

        // Scroll to target position immediately (before enter animation)
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY)
          setPhase('entering')
        })
      }, TRANSITION_MS)
      return () => clearTimeout(timer)
    }

    if (phase === 'entering') {
      const timer = setTimeout(() => {
        setPhase('idle')
        // Refresh ScrollTrigger AFTER enter animation completes
        // so pins are measured without any transform on the wrapper
        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
        })
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
    if (hash && explainers[hash] && isImplemented(explainers[hash])) {
      setCurrent(hash)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Dev-mode: log stub explainers ──
  useEffect(() => {
    if (import.meta.env.DEV) {
      const stubs = Object.entries(explainers)
        .filter(([, def]) => !isImplemented(def))
      if (stubs.length > 0) {
        console.info(
          `ExplainerRouter: ${stubs.length} stub explainer(s) registered (metadata only):\n` +
          stubs.map(([id, def]) => `  • ${id} — "${def.title}"`).join('\n'),
        )
      }
    }
  }, [explainers])

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
  if (!def || !isImplemented(def)) return null

  // Collect prefetch URLs from non-current explainers
  const prefetchUrls = Object.entries(explainers)
    .filter(([id, d]) => id !== current && d.preloadSrcs?.length)
    .flatMap(([, d]) => d.preloadSrcs!)

  return (
    <ExplainerContext.Provider
      value={{ current, jumpTo, jumpBack, stack, transitioning, explainers }}
    >
      {prefetchUrls.map((url) => (
        <link key={url} rel="prefetch" href={url} />
      ))}
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
