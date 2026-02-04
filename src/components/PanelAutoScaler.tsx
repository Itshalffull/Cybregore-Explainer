import { useEffect, useRef } from 'react'

/**
 * Global component that automatically scales panel content to fit viewport.
 * Uses ResizeObserver for reliable, continuous detection.
 * Applies CSS `scale` property (not `transform`) so it composes with
 * React-managed transforms on child elements without conflicts.
 *
 * Debounces measurements to avoid jitter from scroll-driven animations
 * (e.g. translateY changes during lerp cause scrollHeight fluctuations).
 */
export default function PanelAutoScaler() {
  const observerRef = useRef<ResizeObserver | null>(null)
  const panelBodiesRef = useRef<Set<HTMLElement>>(new Set())
  const debounceTimers = useRef<Map<HTMLElement, number>>(new Map())
  const scaledValues = useRef<Map<HTMLElement, string>>(new Map())

  useEffect(() => {
    const DEBOUNCE_MS = 150

    const scaleToFit = (content: HTMLElement) => {
      // Use 88% of viewport — leaves room for vertical auto-margins
      const availableHeight = window.innerHeight * 0.88

      // Temporarily neutralize inline transforms on all descendants so
      // scrollHeight reflects the natural layout height, not the
      // animation-inflated height (e.g. translateY(30px) adds space).
      const transformed: { el: HTMLElement; saved: string }[] = []
      content.querySelectorAll<HTMLElement>('[style*="transform"]').forEach((el) => {
        transformed.push({ el, saved: el.style.transform })
        el.style.transform = 'none'
      })

      // Also temporarily clear our own scale so it doesn't affect measurement
      const savedScale = content.style.scale
      content.style.scale = ''

      const contentHeight = content.scrollHeight

      // Restore transforms immediately (single synchronous block — no paint)
      for (const { el, saved } of transformed) {
        el.style.transform = saved
      }

      let newScale = ''
      if (contentHeight > availableHeight) {
        newScale = `${Math.max(0.45, availableHeight / contentHeight)}`
      }

      // Only apply if the scale actually changed — avoids layout thrash
      const prev = scaledValues.current.get(content)
      if (prev !== newScale) {
        scaledValues.current.set(content, newScale)
        content.style.scale = newScale
        if (newScale) {
          content.style.transformOrigin = 'center center'
        }
      } else {
        // Restore previous scale
        content.style.scale = savedScale
      }
    }

    const debouncedScaleToFit = (content: HTMLElement) => {
      const existing = debounceTimers.current.get(content)
      if (existing) cancelAnimationFrame(existing)

      // Use rAF + setTimeout to batch: wait for layout to settle,
      // then measure on the next idle frame
      debounceTimers.current.set(
        content,
        requestAnimationFrame(() => {
          const timer = window.setTimeout(() => {
            scaleToFit(content)
            debounceTimers.current.delete(content)
          }, DEBOUNCE_MS)
          // Store timeout so we can cancel on unmount
          debounceTimers.current.set(content, timer)
        }),
      )
    }

    // ResizeObserver fires when element size changes (including initial layout)
    observerRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement
        // Skip panels that handle their own scaling
        if (el.closest('.no-auto-scale')) continue
        debouncedScaleToFit(el)
      }
    })

    const observeAllPanelBodies = () => {
      const bodies = document.querySelectorAll<HTMLElement>('.panel-body, .panel-content-wrapper')
      bodies.forEach((body) => {
        if (!panelBodiesRef.current.has(body)) {
          panelBodiesRef.current.add(body)
          observerRef.current?.observe(body)
        }
      })
    }

    // Observe after initial render and again after async content loads
    observeAllPanelBodies()
    const t1 = setTimeout(observeAllPanelBodies, 300)
    const t2 = setTimeout(observeAllPanelBodies, 1000)

    // MutationObserver catches dynamically added panels
    const mutation = new MutationObserver(() => {
      observeAllPanelBodies()
    })
    mutation.observe(document.body, { childList: true, subtree: true })

    // Re-check on resize (viewport height changes) — immediate, not debounced
    const handleResize = () => {
      // Clear cached values so all panels re-measure
      scaledValues.current.clear()
      panelBodiesRef.current.forEach((body) => {
        if (!body.closest('.no-auto-scale')) {
          scaleToFit(body)
        }
      })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      observerRef.current?.disconnect()
      mutation.disconnect()
      window.removeEventListener('resize', handleResize)
      clearTimeout(t1)
      clearTimeout(t2)
      debounceTimers.current.forEach((id) => {
        cancelAnimationFrame(id)
        clearTimeout(id)
      })
    }
  }, [])

  return null
}
