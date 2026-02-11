import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelFourHorsemen({ progress }: PanelProps) {
  const titleOpacity = lerp(progress, 0.0, 0.10, 0, 1)
  const titleY = lerp(progress, 0.0, 0.10, 20, 0)

  const grid1Opacity = lerp(progress, 0.12, 0.25, 0, 1)
  const grid2Opacity = lerp(progress, 0.22, 0.35, 0, 1)
  const grid3Opacity = lerp(progress, 0.32, 0.45, 0, 1)
  const grid4Opacity = lerp(progress, 0.42, 0.55, 0, 1)

  // Bar fill animation for each chart
  const bars1 = lerp(progress, 0.15, 0.40, 0, 100)
  const bars2 = lerp(progress, 0.25, 0.50, 0, 100)
  const bars3 = lerp(progress, 0.35, 0.55, 0, 100)
  const bars4 = lerp(progress, 0.45, 0.60, 0, 100)

  const conclusionOpacity = lerp(progress, 0.68, 0.80, 0, 1)
  const conclusionY = lerp(progress, 0.68, 0.80, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body panel-body--wide">
        <p
          className="text-body text-cream text-bold text-center mb-lg"
          style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}
        >
          Four dimensions. One conclusion.
        </p>

        <div className="box-grid" style={{ opacity: 1 }}>
          {/* Habitat Destruction */}
          <div style={{ opacity: grid1Opacity }}>
            <p className="text-small text-coral text-center mb-sm">Habitat destruction</p>
            <svg viewBox="0 0 160 100" style={{ width: '100%' }}>
              <line x1="15" y1="85" x2="150" y2="85" stroke="var(--dark-olive)" strokeWidth="0.5" />
              <rect x="25" y={85 - (60 * bars1) / 100} width="18" height={(60 * bars1) / 100} fill="var(--sage)" opacity="0.5" />
              <rect x="50" y={85 - (68 * bars1) / 100} width="18" height={(68 * bars1) / 100} fill="var(--sage)" opacity="0.6" />
              <rect x="75" y={85 - (75 * bars1) / 100} width="18" height={(75 * bars1) / 100} fill="var(--sage)" opacity="0.7" />
              <rect x="100" y={85 - (82 * bars1) / 100} width="18" height={(82 * bars1) / 100} fill="var(--accent-coral)" opacity="0.8" />
              <rect x="125" y={85 - (85 * bars1) / 100} width="18" height={(85 * bars1) / 100} fill="var(--accent-coral)" />
              <text x="34" y="95" fill="var(--dark-olive)" fontSize="6" textAnchor="middle">1970</text>
              <text x="134" y="95" fill="var(--dark-olive)" fontSize="6" textAnchor="middle">2024</text>
            </svg>
          </div>

          {/* Coastal Dead Zones */}
          <div style={{ opacity: grid2Opacity }}>
            <p className="text-small text-coral text-center mb-sm">Global coastal dead zones</p>
            <svg viewBox="0 0 160 100" style={{ width: '100%' }}>
              <line x1="15" y1="85" x2="150" y2="85" stroke="var(--dark-olive)" strokeWidth="0.5" />
              <rect x="25" y={85 - (20 * bars2) / 100} width="18" height={(20 * bars2) / 100} fill="var(--sage)" opacity="0.5" />
              <rect x="50" y={85 - (35 * bars2) / 100} width="18" height={(35 * bars2) / 100} fill="var(--sage)" opacity="0.6" />
              <rect x="75" y={85 - (55 * bars2) / 100} width="18" height={(55 * bars2) / 100} fill="var(--sage)" opacity="0.7" />
              <rect x="100" y={85 - (72 * bars2) / 100} width="18" height={(72 * bars2) / 100} fill="var(--accent-coral)" opacity="0.8" />
              <rect x="125" y={85 - (85 * bars2) / 100} width="18" height={(85 * bars2) / 100} fill="var(--accent-coral)" />
              <text x="34" y="95" fill="var(--dark-olive)" fontSize="6" textAnchor="middle">1960</text>
              <text x="134" y="95" fill="var(--dark-olive)" fontSize="6" textAnchor="middle">2024</text>
            </svg>
          </div>

          {/* Factory Farming */}
          <div style={{ opacity: grid3Opacity }}>
            <p className="text-small text-coral text-center mb-sm">Billions killed in horrific conditions</p>
            <svg viewBox="0 0 160 100" style={{ width: '100%' }}>
              <line x1="15" y1="85" x2="150" y2="85" stroke="var(--dark-olive)" strokeWidth="0.5" />
              <rect x="25" y={85 - (30 * bars3) / 100} width="18" height={(30 * bars3) / 100} fill="var(--sage)" opacity="0.5" />
              <rect x="50" y={85 - (45 * bars3) / 100} width="18" height={(45 * bars3) / 100} fill="var(--sage)" opacity="0.6" />
              <rect x="75" y={85 - (60 * bars3) / 100} width="18" height={(60 * bars3) / 100} fill="var(--sage)" opacity="0.7" />
              <rect x="100" y={85 - (78 * bars3) / 100} width="18" height={(78 * bars3) / 100} fill="var(--accent-coral)" opacity="0.8" />
              <rect x="125" y={85 - (85 * bars3) / 100} width="18" height={(85 * bars3) / 100} fill="var(--accent-coral)" />
              <text x="34" y="95" fill="var(--dark-olive)" fontSize="6" textAnchor="middle">1960</text>
              <text x="134" y="95" fill="var(--dark-olive)" fontSize="6" textAnchor="middle">2024</text>
            </svg>
          </div>

          {/* Coral Cover */}
          <div style={{ opacity: grid4Opacity }}>
            <p className="text-small text-coral text-center mb-sm">Coral cover collapsing</p>
            <svg viewBox="0 0 160 100" style={{ width: '100%' }}>
              <line x1="15" y1="85" x2="150" y2="85" stroke="var(--dark-olive)" strokeWidth="0.5" />
              {/* Inverted — coral is declining, so bars go DOWN from tall to short */}
              <rect x="25" y={85 - (85 * bars4) / 100} width="18" height={(85 * bars4) / 100} fill="var(--sage)" opacity="0.7" />
              <rect x="50" y={85 - (70 * bars4) / 100} width="18" height={(70 * bars4) / 100} fill="var(--sage)" opacity="0.6" />
              <rect x="75" y={85 - (50 * bars4) / 100} width="18" height={(50 * bars4) / 100} fill="var(--accent-coral)" opacity="0.6" />
              <rect x="100" y={85 - (30 * bars4) / 100} width="18" height={(30 * bars4) / 100} fill="var(--accent-coral)" opacity="0.8" />
              <rect x="125" y={85 - (15 * bars4) / 100} width="18" height={(15 * bars4) / 100} fill="var(--accent-coral)" />
              <text x="34" y="95" fill="var(--dark-olive)" fontSize="6" textAnchor="middle">1950</text>
              <text x="134" y="95" fill="var(--dark-olive)" fontSize="6" textAnchor="middle">2024</text>
            </svg>
          </div>
        </div>

        <p
          className="text-body text-coral text-bold text-center mb-sm"
          style={{ opacity: conclusionOpacity, transform: `translateY(${conclusionY}px)` }}
        >
          One conclusion.
        </p>
        <p
          className="text-body text-cream text-center"
          style={{ opacity: conclusionOpacity, transform: `translateY(${conclusionY}px)` }}
        >
          This system kills everything it touches.
        </p>
      </div>
    </section>
  )
}
