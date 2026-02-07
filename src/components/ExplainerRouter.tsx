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

export default function ExplainerRouter({
  explainers,
  defaultExplainer,
  children,
}: ExplainerRouterProps) {
  const [current, setCurrent] = useState(defaultExplainer)
  const [stack, setStack] = useState<BreadcrumbEntry[]>([])
  const [transitioning, setTransitioning] = useState(false)
  const [enterClass, setEnterClass] = useState('')
  const targetScrollYRef = useRef(0)
  const snapshotRef = useRef<HTMLElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // ── Clean up snapshot and finalize transition ──
  const finishTransition = useCallback(() => {
    if (snapshotRef.current) {
      snapshotRef.current.remove()
      snapshotRef.current = null
    }
    setEnterClass('')
    setTransitioning(false)
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      window.scrollTo({ top: targetScrollYRef.current, left: 0, behavior: 'instant' })
    })
  }, [])

  // ── Create a DOM snapshot of the current view for the exit animation ──
  const createSnapshot = useCallback((direction: TransitionDir) => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const snapshot = wrapper.cloneNode(true) as HTMLElement
    snapshot.setAttribute('aria-hidden', 'true')

    // GSAP pins elements with position:fixed. In the clone these break out
    // of overflow:hidden (no containing block yet). Convert to absolute so
    // they stay inside the snapshot and slide with it.
    snapshot.querySelectorAll<HTMLElement>('[style]').forEach((el) => {
      if (el.style.position === 'fixed') {
        el.style.position = 'absolute'
      }
    })

    Object.assign(snapshot.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100dvh',
      overflow: 'hidden',
      zIndex: '9999',
      pointerEvents: 'none',
      backgroundColor: 'var(--color-deep-forest)',
    })
    snapshot.className = direction === 'forward'
      ? 'explainer-exit-left'
      : 'explainer-exit-right'

    // Clean up when the CSS animation actually finishes (more precise than setTimeout)
    snapshot.addEventListener('animationend', finishTransition, { once: true })

    document.body.appendChild(snapshot)
    snapshotRef.current = snapshot
  }, [finishTransition])

  // ── Jump forward to another explainer ──
  const jumpTo = useCallback(
    (explainer: string, opts?: { fromLabel?: string }) => {
      if (transitioning) return
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

      // Snapshot the current view, then swap immediately
      createSnapshot('forward')
      targetScrollYRef.current = 0
      setStack((s) => [...s, entry])
      setCurrent(explainer)
      setEnterClass('explainer-enter-right')
      setTransitioning(true)

      // Scroll new content to top
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      })
    },
    [current, explainers, transitioning, createSnapshot, finishTransition],
  )

  // ── Jump back to a previous breadcrumb ──
  const jumpBack = useCallback(
    (toIndex?: number) => {
      if (transitioning || stack.length === 0) return

      const idx = toIndex ?? stack.length - 1
      const target = stack[idx]
      if (!target) return

      // Snapshot the current view, then swap immediately
      createSnapshot('back')
      targetScrollYRef.current = target.scrollY
      setStack((s) => s.slice(0, idx))
      setCurrent(target.explainer)
      setEnterClass('explainer-enter-left')
      setTransitioning(true)

      // Scroll to saved position
      requestAnimationFrame(() => {
        window.scrollTo({ top: target.scrollY, left: 0, behavior: 'instant' })
      })
    },
    [transitioning, stack, createSnapshot, finishTransition],
  )

  // ── Sync hash ──
  useEffect(() => {
    window.location.hash = current === defaultExplainer ? '' : current
  }, [current, defaultExplainer])

  // ── Read hash on mount ──
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash && explainers[hash] && isImplemented(explainers[hash])) {
      setCurrent(hash)
      // Ensure we start at the top when loading from a deep link
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
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

  // ── Clean up snapshot on unmount ──
  useEffect(() => {
    return () => {
      if (snapshotRef.current) {
        snapshotRef.current.remove()
        snapshotRef.current = null
      }
    }
  }, [])

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
        className={`explainer-wrapper ${enterClass}`}
        style={{ minHeight: '100dvh' }}
      >
        {def.content}
      </div>
      {children}
    </ExplainerContext.Provider>
  )
}
