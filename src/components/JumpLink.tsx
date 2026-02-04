import { useExplainer, isImplemented } from './ExplainerRouter'

interface JumpLinkProps {
  /** Target explainer id */
  to: string
  /** Visible label text */
  label: string
  /** Optional label saved in breadcrumb (defaults to `label`) */
  fromLabel?: string
  className?: string
  style?: React.CSSProperties
}

/**
 * A styled link that jumps to another explainer.
 * Drop this into any panel to create a cross-explainer link.
 *
 * Usage:
 *   <JumpLink to="meaning-makers" label="Explore: Meaning Makers →" />
 */
export default function JumpLink({
  to,
  label,
  fromLabel,
  className = '',
  style,
}: JumpLinkProps) {
  const { jumpTo, transitioning, explainers } = useExplainer()

  // Hide link if target doesn't exist or is a stub (no content yet)
  const target = explainers[to]
  if (!target || !isImplemented(target)) return null

  return (
    <button
      className={`jump-link ${className}`}
      style={style}
      disabled={transitioning}
      onClick={() => jumpTo(to, { fromLabel: fromLabel || label })}
    >
      <span className="jump-link__arrow">→</span>
      <span className="jump-link__label">{label}</span>
    </button>
  )
}
