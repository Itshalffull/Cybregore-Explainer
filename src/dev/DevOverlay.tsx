import { useEffect, useState, useRef, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useDevMode } from './DevModeContext'
import DevPanelControls from './DevPanelControls'
import DevInsertSlot from './DevInsertSlot'
import type { PanelMeta } from '../types/metadata'

interface PanelDOMEntry {
  index: number
  element: HTMLElement
  portalContainer: HTMLDivElement
  insertContainer: HTMLDivElement | null
}

interface DevOverlayProps {
  /** The container element wrapping explainer content */
  containerRef: React.RefObject<HTMLElement | null>
  /** Panel metadata for labeling */
  panels: PanelMeta[]
}

/**
 * DevOverlay scans the explainer DOM for ScrollSection containers
 * (identified as direct children of the explainer wrapper that contain
 * a section.panel element). It injects portal containers for dev controls
 * and insert slots without disrupting the GSAP ScrollTrigger layout.
 */
export default function DevOverlay({
  containerRef,
  panels,
}: DevOverlayProps) {
  const dev = useDevMode()
  const [entries, setEntries] = useState<PanelDOMEntry[]>([])
  const observerRef = useRef<MutationObserver | null>(null)
  const scannedRef = useRef(false)

  useEffect(() => {
    if (!dev?.active) {
      // Clean up portal containers when deactivated
      entries.forEach((entry) => {
        entry.portalContainer.remove()
        entry.insertContainer?.remove()
      })
      setEntries([])
      scannedRef.current = false
      return
    }

    const container = containerRef.current
    if (!container) return

    const scan = () => {
      // Find all section.panel elements within the container
      const panelSections = container.querySelectorAll('section.panel')
      if (panelSections.length === 0) return

      // Avoid re-scanning if panel count hasn't changed
      if (scannedRef.current && entries.length === panelSections.length) return
      scannedRef.current = true

      // Clean up old containers
      entries.forEach((entry) => {
        entry.portalContainer.remove()
        entry.insertContainer?.remove()
      })

      const newEntries: PanelDOMEntry[] = []

      panelSections.forEach((section, index) => {
        const panelEl = section as HTMLElement

        // Find the ScrollSection container (the outermost wrapper)
        // Structure: ScrollSection > pinned-div > section.panel
        const scrollSectionContainer =
          panelEl.closest('[style*="position: relative"]') ??
          panelEl.parentElement?.parentElement

        if (!scrollSectionContainer) return

        // Create portal container for panel controls — placed inside
        // the panel section itself so it scrolls/pins with it
        const portalDiv = document.createElement('div')
        portalDiv.className = 'dev-portal-anchor'
        portalDiv.dataset.devPanelIndex = String(index)
        panelEl.appendChild(portalDiv)

        // Create insert slot container — placed AFTER the ScrollSection
        // in the document flow (between panels)
        let insertDiv: HTMLDivElement | null = null
        if (index < panelSections.length - 1) {
          insertDiv = document.createElement('div')
          insertDiv.className = 'dev-insert-anchor'
          insertDiv.dataset.devInsertAfter = String(index)
          // Insert after the ScrollSection container
          scrollSectionContainer.parentElement?.insertBefore(
            insertDiv,
            scrollSectionContainer.nextSibling,
          )
        }

        newEntries.push({
          index,
          element: panelEl,
          portalContainer: portalDiv,
          insertContainer: insertDiv,
        })
      })

      setEntries(newEntries)
    }

    // Initial scan after a brief delay to let GSAP set up
    const timer = setTimeout(scan, 300)

    // Watch for DOM changes (panels being added/removed during transitions)
    observerRef.current = new MutationObserver(() => {
      scannedRef.current = false
      scan()
    })
    observerRef.current.observe(container, { childList: true, subtree: true })

    return () => {
      clearTimeout(timer)
      observerRef.current?.disconnect()
    }
  }, [dev?.active, containerRef]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!dev?.active) return null

  const portals: ReactNode[] = []

  for (const entry of entries) {
    const meta = panels[entry.index]
    const panelId = meta?.id ?? `panel-${entry.index}`
    const panelTitle = meta?.title ?? `Panel ${entry.index + 1}`

    // Panel controls portal
    portals.push(
      createPortal(
        <DevPanelControls
          key={`ctrl-${entry.index}`}
          panelIndex={entry.index}
          panelId={panelId}
          panelTitle={panelTitle}
        />,
        entry.portalContainer,
      ),
    )

    // Insert slot portal (between panels)
    if (entry.insertContainer) {
      portals.push(
        createPortal(
          <DevInsertSlot
            key={`insert-${entry.index}`}
            afterIndex={entry.index}
          />,
          entry.insertContainer,
        ),
      )
    }
  }

  return <>{portals}</>
}
