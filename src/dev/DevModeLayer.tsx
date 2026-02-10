import DevModeProvider from './DevModeContext'
import DevOverlay from './DevOverlay'
import DevToolbar from './DevToolbar'
import type { PanelMeta } from '../types/metadata'
import './dev-mode.css'

interface DevModeLayerProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>
  panels: PanelMeta[]
  explainerId: string
}

/**
 * Single entry point for all dev mode UI.
 * Lazily loaded in ExplainerRouter — never imported in production.
 * Wraps its own DevModeProvider around the dev UI only;
 * the actual explainer panels are unaffected.
 */
export default function DevModeLayer({
  wrapperRef,
  panels,
  explainerId,
}: DevModeLayerProps) {
  return (
    <DevModeProvider>
      <DevOverlay
        containerRef={wrapperRef}
        panels={panels}
      />
      <DevToolbar explainerId={explainerId} />
    </DevModeProvider>
  )
}
