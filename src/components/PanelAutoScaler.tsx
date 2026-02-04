import { useEffect, useRef } from 'react'

/**
 * Global component that automatically scales panel content to fit viewport.
 * Uses ResizeObserver for reliable, continuous detection.
 * Applies CSS `scale` property (not `transform`) so it composes with
 * React-managed transforms on child elements without conflicts.
 */
export default function PanelAutoScaler() {
  const observerRef = useRef<ResizeObserver | null>(null)
  const panelBodiesRef = useRef<Set<HTMLElement>>(new Set())

  useEffect(() => {
    const scaleToFit = (content: HTMLElement) => {
      // Use 88% of viewport — leaves room for vertical auto-margins
      const availableHeight = window.innerHeight * 0.88
      const contentHeight = content.scrollHeight

      if (contentHeight > availableHeight) {
        const newScale = Math.max(0.45, availableHeight / contentHeight)
        content.style.scale = `${newScale}`
        content.style.transformOrigin = 'center center'
      } else {
        // Content fits — remove any scale we previously applied
        content.style.scale = ''
      }
    }

    // ResizeObserver fires when element size changes (including initial layout)
    observerRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement
        // Skip panels that handle their own scaling
        if (el.closest('.no-auto-scale')) continue
        scaleToFit(el)
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

    // Re-check on resize (viewport height changes)
    const handleResize = () => {
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
    }
  }, [])

  return null
}
