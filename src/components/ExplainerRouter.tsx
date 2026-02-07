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
  const [animClass, setAnimClass] = useState('')
  const targetScrollYRef = useRef(0)
  const pendingRef = useRef<{ explainer: string; scrollY: number } | null>(null)
  const dirRef = useRef<TransitionDir>('forward')
  const wrapperRef = useRef<HTMLDivElement>(null)

  // ── Handle animationend on the wrapper ──
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper || !animClass) return

    const handleAnimEnd = () => {
      const isExiting = animClass.includes('exit')

      if (isExiting && pendingRef.current) {
        // Exit finished — wrapper is off-screen. Swap content + slide in.
        const { explainer, scrollY } = pendingRef.current
        pendingRef.current = null
        targetScrollYRef.current = scrollY

        setCurrent(explainer)
        setAnimClass(
          dirRef.current === 'forward'
            ? 'explainer-enter-right'
            : 'explainer-enter-left',
        )

        // Scroll to target while off-screen
        requestAnimationFrame(() => {
          window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' })
        })
      } else {
        // Enter finished — transition complete
        setAnimClass('')
        setTransitioning(false)
        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
          window.scrollTo({
            top: targetScrollYRef.current,
            left: 0,
            behavior: 'instant',
          })
        })
      }
    }

    wrapper.addEventListener('animationend', handleAnimEnd, { once: true })
    return () => wrapper.removeEventListener('animationend', handleAnimEnd)
  }, [animClass])

  // ── Jump forward to another explainer ──
  const jumpTo = useCallback(
    (explainer: string, opts?: { fromLabel?: string }) => {
      if (transitioning) return
      if (!explainers[explainer]) {
        console.warn(`ExplainerRouter: unknown explainer "${explainer}"`)
        return
      }
      if (!isImplemented(explainers[explainer])) {
        console.warn(
          `ExplainerRouter: explainer "${explainer}" is a stub (no content yet)`,
        )
        return
      }

      // Save current position to stack
      const entry: BreadcrumbEntry = {
        explainer: current,
        title: explainers[current].title,
        scrollY: window.scrollY,
        fromLabel: opts?.fromLabel || explainers[current].title,
      }

      // Kill ScrollTriggers so the transform doesn't fight pinned elements
      ScrollTrigger.getAll().forEach((t) => t.kill())

      pendingRef.current = { explainer, scrollY: 0 }
      dirRef.current = 'forward'
      setStack((s) => [...s, entry])
      setTransitioning(true)
      setAnimClass('explainer-exit-left')
    },
    [current, explainers, transitioning],
  )

  // ── Jump back to a previous breadcrumb ──
  const jumpBack = useCallback(
    (toIndex?: number) => {
      if (transitioning || stack.length === 0) return

      const idx = toIndex ?? stack.length - 1
      const target = stack[idx]
      if (!target) return

      // Kill ScrollTriggers so the transform doesn't fight pinned elements
      ScrollTrigger.getAll().forEach((t) => t.kill())

      pendingRef.current = {
        explainer: target.explainer,
        scrollY: target.scrollY,
      }
      dirRef.current = 'back'
      setStack((s) => s.slice(0, idx))
      setTransitioning(true)
      setAnimClass('explainer-exit-right')
    },
    [transitioning, stack],
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
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Dev-mode: log stub explainers ──
  useEffect(() => {
    if (import.meta.env.DEV) {
      const stubs = Object.entries(explainers).filter(
        ([, def]) => !isImplemented(def),
      )
      if (stubs.length > 0) {
        console.info(
          `ExplainerRouter: ${stubs.length} stub explainer(s) registered (metadata only):\n` +
            stubs
              .map(([id, def]) => `  • ${id} — "${def.title}"`)
              .join('\n'),
        )
      }
    }
  }, [explainers])

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
        className={`explainer-wrapper ${animClass}`}
        style={{ minHeight: '100dvh' }}
      >
        {def.content}
      </div>
      {children}
    </ExplainerContext.Provider>
  )
}
