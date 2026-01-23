import { ReactNode } from 'react'

interface AutoScaleContentProps {
  children: ReactNode
  maxWidth?: string
  className?: string
  style?: React.CSSProperties
}

/**
 * Simple wrapper component for panel content.
 * The actual scaling is handled by PanelAutoScaler globally.
 * This just provides consistent styling for content containers.
 */
export default function AutoScaleContent({
  children,
  maxWidth = '650px',
  className = '',
  style = {},
}: AutoScaleContentProps) {
  return (
    <div
      className={`panel-content-wrapper ${className}`}
      style={{
        maxWidth,
        width: '90%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transformOrigin: 'center center',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
