import { useEffect, useState, useRef, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useDevMode } from './DevModeContext'
import DevPanelControls from './DevPanelControls'
import DevInsertSlot from './DevInsertSlot'
import type { PanelMeta } from '../types/metadata'

interface PanelDOMEntry {
  index: number
  element: HTMLElement
  portalContainer: HTMLDivElement
  insertContainer: HTMLDivElement | null
  /** Whether this panel has an existing video/image background */
  hasBackground: boolean
  /** Whether this panel has existing background audio */
  hasAudio: boolean
}

interface DevOverlayProps {
  /** The container element wrapping explainer content */
  containerRef: React.RefObject<HTMLElement | null>
  /** Panel metadata for labeling */
  panels: PanelMeta[]
}

/**
 * Detect whether a panel section contains a VideoBackground component
 * or an IntroSection-style fixed video background.
 */
function detectBackground(panelEl: HTMLElement): boolean {
  // VideoBackground: renders <video> inside the section
  if (panelEl.querySelector('video')) return true
  // panel-body--over-video class indicates a panel designed for a background
  if (panelEl.querySelector('.panel-body--over-video')) return true
  // IntroSection: fixed video is a sibling — check if the ScrollSection's
  // ancestor contains a fixed video
  const scrollSection = panelEl.parentElement?.parentElement
  const wrapper = scrollSection?.parentElement
  if (wrapper && wrapper.querySelector(':scope > div[style*="position: fixed"] video')) {
    return true
  }
  return false
}

/**
 * Detect whether a panel section contains an AudioBackground component.
 */
function detectAudio(panelEl: HTMLElement): boolean {
  return !!panelEl.querySelector('audio')
}

/**
 * Walk up from a section.panel to find the top-level element that
 * should have insert slots placed between it and its siblings.
 * Handles both direct ScrollSection children of .app and
 * ScrollSections nested inside IntroSection wrappers.
 */
function findTopLevelContainer(
  panelEl: HTMLElement,
  appRoot: HTMLElement,
): HTMLElement | null {
  // Walk up from the panel to find which direct child of appRoot contains it
  let node: HTMLElement | null = panelEl
  while (node && node.parentElement !== appRoot) {
    node = node.parentElement
  }
  return node
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
  const entriesRef = useRef<PanelDOMEntry[]>([])
  const isScanningRef = useRef(false)

  useEffect(() => {
    if (!dev?.active) {
      // Clean up portal containers and separator lines when deactivated
      entriesRef.current.forEach((entry) => {
        entry.portalContainer.remove()
        entry.insertContainer?.remove()
      })
      // Remove any separator lines we injected
      document.querySelectorAll('.dev-panel-separator').forEach((el) => el.remove())
      entriesRef.current = []
      setEntries([])
      // Refresh GSAP after removing dev DOM nodes
      requestAnimationFrame(() => ScrollTrigger.refresh())
      return
    }

    const container = containerRef.current
    if (!container) return

    const scan = () => {
      // Guard against re-entrant calls from MutationObserver
      if (isScanningRef.current) return
      isScanningRef.current = true

      try {
        // Find all section.panel elements within the container
        const panelSections = container.querySelectorAll('section.panel')
        if (panelSections.length === 0) return

        // Avoid re-scanning if panel count hasn't changed
        if (entriesRef.current.length === panelSections.length) return

        // Clean up old containers and separators
        entriesRef.current.forEach((entry) => {
          entry.portalContainer.remove()
          entry.insertContainer?.remove()
        })
        document.querySelectorAll('.dev-panel-separator').forEach((el) => el.remove())

        // Find the .app root (first child of the wrapper that has class "app"
        // or just the first element child)
        const appRoot =
          (container.querySelector('.app') as HTMLElement) ?? container

        const newEntries: PanelDOMEntry[] = []

        panelSections.forEach((section, index) => {
          const panelEl = section as HTMLElement

          // Detect background and audio
          const hasBackground = detectBackground(panelEl)
          const hasAudio = detectAudio(panelEl)

          // Create portal container for panel controls — placed inside
          // the panel section itself so it scrolls/pins with it
          const portalDiv = document.createElement('div')
          portalDiv.className = 'dev-portal-anchor'
          portalDiv.dataset.devPanelIndex = String(index)
          panelEl.appendChild(portalDiv)

          // Find the top-level container in the .app for insert placement
          const topContainer = findTopLevelContainer(panelEl, appRoot)

          // Create insert slot + separator line AFTER every panel
          // (placed after the top-level container in .app's direct children)
          let insertDiv: HTMLDivElement | null = null
          if (topContainer && index < panelSections.length - 1) {
            // Create a wrapper that holds the separator line + insert button
            insertDiv = document.createElement('div')
            insertDiv.className = 'dev-panel-separator'
            insertDiv.dataset.devInsertAfter = String(index)
            topContainer.parentElement?.insertBefore(
              insertDiv,
              topContainer.nextSibling,
            )
          }

          newEntries.push({
            index,
            element: panelEl,
            portalContainer: portalDiv,
            insertContainer: insertDiv,
            hasBackground,
            hasAudio,
          })
        })

        entriesRef.current = newEntries
        setEntries(newEntries)

        // Refresh GSAP after injecting dev DOM nodes
        requestAnimationFrame(() => ScrollTrigger.refresh())
      } finally {
        isScanningRef.current = false
      }
    }

    // Initial scan after a brief delay to let GSAP set up
    const timer = setTimeout(scan, 300)

    // Watch for DOM changes (panels being added/removed during transitions)
    // Only observe direct children of the container, not subtree —
    // subtree would trigger on our own portal injections causing loops
    const observer = new MutationObserver(() => {
      scan()
    })
    observer.observe(container, { childList: true })

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [dev?.active, containerRef]) // eslint-disable-line react-hooks/exhaustive-deps

  // Sync background and audio detection into DevModeContext
  useEffect(() => {
    if (!dev?.active) return
    for (const entry of entries) {
      dev.setHasExistingBackground(entry.index, entry.hasBackground)
      dev.setHasExistingSfx(entry.index, entry.hasAudio)
    }
  }, [entries]) // eslint-disable-line react-hooks/exhaustive-deps

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

    // Insert slot portal (between panels, inside separator)
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
