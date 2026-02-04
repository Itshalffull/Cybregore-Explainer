import { ReactNode } from 'react'
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
 * A styled button that jumps to another explainer.
 * Renders as a standalone link with an arrow.
 *
 * Renders nothing if the target is a stub or unknown.
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

// ─── Inline variant ──────────────────────────────────────────────────────────

interface InlineJumpLinkProps {
  /** Target explainer id */
  to: string
  /** Text shown as the link. Also used as breadcrumb label unless fromLabel is set. */
  children: ReactNode
  /** Optional label saved in breadcrumb (defaults to text content of children) */
  fromLabel?: string
  className?: string
  style?: React.CSSProperties
}

/**
 * An inline text link that jumps to another explainer.
 * Use inside paragraphs to link a word or phrase.
 *
 * Falls back to plain text (no link, no wrapper) if the target
 * is a stub or unknown — so it's always safe to use.
 *
 * Usage:
 *   <p>
 *     In Buddhist cosmology, there are
 *     <InlineJumpLink to="buddhist-cosmology"> Hungry Ghosts</InlineJumpLink>.
 *   </p>
 */
export function InlineJumpLink({
  to,
  children,
  fromLabel,
  className = '',
  style,
}: InlineJumpLinkProps) {
  const { jumpTo, transitioning, explainers } = useExplainer()

  const target = explainers[to]
  if (!target || !isImplemented(target)) {
    // Plain text fallback — no link styling, no wrapper
    return <>{children}</>
  }

  return (
    <button
      className={`jump-link-inline ${className}`}
      style={style}
      disabled={transitioning}
      onClick={() => jumpTo(to, { fromLabel: fromLabel || String(children) })}
    >
      {children}
    </button>
  )
}
