import { useExplainer } from './ExplainerRouter'

/**
 * Sticky breadcrumb trail showing the jump history.
 * Renders at the bottom of the viewport. Each crumb is clickable
 * to jump back to that point.
 *
 * Appears automatically when the jump stack has entries.
 * Disappears when back at the starting explainer.
 */
export default function JumpBreadcrumbs() {
  const { stack, jumpBack, transitioning, current } = useExplainer()

  if (stack.length === 0) return null

  return (
    <nav className="jump-breadcrumbs" aria-label="Explainer trail">
      <div className="jump-breadcrumbs__trail">
        {stack.map((entry, i) => (
          <button
            key={`${entry.explainer}-${i}`}
            className="jump-breadcrumbs__crumb"
            disabled={transitioning}
            onClick={() => jumpBack(i)}
            title={`Back to ${entry.title}`}
          >
            <span className="jump-breadcrumbs__arrow">←</span>
            <span className="jump-breadcrumbs__title">{entry.title}</span>
            <span className="jump-breadcrumbs__from">{entry.fromLabel}</span>
          </button>
        ))}
        <span className="jump-breadcrumbs__current">{current}</span>
      </div>
    </nav>
  )
}
