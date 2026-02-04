import { useEffect, useRef } from 'react'

/**
 * Global component that automatically scales panel content to fit viewport.
 * Uses IntersectionObserver for performance - only scales panels when they enter view.
 */
export default function PanelAutoScaler() {
  const scaledElements = useRef<WeakSet<Element>>(new WeakSet())
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const scaleContent = (content: HTMLElement) => {
      const applyScale = () => {
        // Temporarily remove any existing scale transform to measure true height
        const originalTransform = content.style.transform
        content.style.transform = 'none'

        // Force reflow and measure
        const contentHeight = content.scrollHeight

        // Restore original transform immediately
        content.style.transform = originalTransform

        // Use 75% of viewport to leave room for top/bottom padding areas
        const availableHeight = window.innerHeight * 0.75

        console.log(`[AutoScaler] Content height: ${contentHeight}, Available: ${availableHeight}`)

        if (contentHeight > availableHeight) {
          const scale = Math.max(0.4, availableHeight / contentHeight)
          console.log(`[AutoScaler] Applying scale: ${scale}`)
          content.style.transform = `scale(${scale})`
          content.style.transformOrigin = 'center center'
        }
      }

      // Apply scale after delays for content/fonts to render
      setTimeout(applyScale, 50)
      setTimeout(applyScale, 200)
      setTimeout(applyScale, 500)
    }

    const processPanel = (panel: Element) => {
      // Skip if explicitly opted out
      if (panel.classList.contains('no-auto-scale')) return

      // Skip if already processed
      if (scaledElements.current.has(panel)) return
      scaledElements.current.add(panel)

      console.log('[AutoScaler] Processing panel:', panel.className)

      // Find the content wrapper - try multiple selectors in priority order
      const content = (
        panel.querySelector('.panel-body') ||
        panel.querySelector('.panel-content-wrapper') ||
        panel.querySelector('.content') ||
        panel.querySelector('.panel-content') ||
        panel.querySelector(':scope > div')
      ) as HTMLElement

      if (content) {
        console.log('[AutoScaler] Found content:', content.className || '(no class)')
        scaleContent(content)
      } else {
        console.log('[AutoScaler] No content found in panel')
      }
    }

    // IntersectionObserver - only process panels as they come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            processPanel(entry.target)
          }
        })
      },
      { rootMargin: '300px', threshold: 0 }
    )

    // Observe all panels
    const observePanels = () => {
      const panels = document.querySelectorAll('section.panel, .panel')
      console.log(`[AutoScaler] Found ${panels.length} panels`)
      panels.forEach((panel) => {
        observer.observe(panel)
      })
    }

    // Initial observation after content renders
    setTimeout(observePanels, 100)
    setTimeout(observePanels, 500)
    setTimeout(observePanels, 1000)

    // Handle resize - debounced
    const handleResize = () => {
      clearTimeout(resizeTimeoutRef.current)
      resizeTimeoutRef.current = setTimeout(() => {
        scaledElements.current = new WeakSet()
        observePanels()
      }, 150)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeoutRef.current)
    }
  }, [])

  return null
}
