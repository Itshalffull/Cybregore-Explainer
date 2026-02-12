import { lerp } from '../../../utils/animation'
import AutoScaleContent from '../../../components/AutoScaleContent'

interface PanelDataExplosionProps {
  progress: number
}

export default function PanelDataExplosion({ progress }: PanelDataExplosionProps) {
  // Visualize the exponential data growth with relatable analogy

  // Intro text appears first
  const introOpacity = lerp(progress, 0, 0.08, 0, 1)
  const introY = lerp(progress, 0, 0.08, 20, 0)

  const titleOpacity = lerp(progress, 0.06, 0.14, 0, 1)
  const graphOpacity = lerp(progress, 0.12, 0.22, 0, 1)

  // Line drawing animation - from 0% to 100% of path
  const lineProgress = lerp(progress, 0.18, 0.45, 0, 1)

  // Data labels appear as line reaches them
  const label2010Opacity = lerp(progress, 0.25, 0.32, 0, 1)
  const label2015Opacity = lerp(progress, 0.30, 0.37, 0, 1)
  const label2020Opacity = lerp(progress, 0.36, 0.43, 0, 1)
  const label2023Opacity = lerp(progress, 0.42, 0.50, 0, 1)

  // Zettabyte definition
  const definitionOpacity = lerp(progress, 0.50, 0.60, 0, 1)
  const definitionY = lerp(progress, 0.50, 0.60, 20, 0)

  const analogyOpacity = lerp(progress, 0.62, 0.72, 0, 1)
  const analogyY = lerp(progress, 0.62, 0.72, 20, 0)

  const conclusionOpacity = lerp(progress, 0.78, 0.88, 0, 1)
  const sourceOpacity = lerp(progress, 0.85, 0.95, 0, 1)

  // SVG path for exponential curve (data points: 2005~0.1, 2010~2, 2015~15, 2020~40, 2023~120)
  // Normalized to fit in viewBox 0-400 width, 0-200 height (inverted Y)
  const pathLength = 450
  const strokeDashoffset = pathLength * (1 - lineProgress)

  return (
    <section className="panel panel--dark">
      <AutoScaleContent maxWidth="700px">
        {/* Intro text */}
        <p
          className="text-body text-sage text-center leading-relaxed mb-lg"
          style={{
            opacity: introOpacity,
            transform: `translateY(${introY}px)`,
          }}
        >
          Over the past two decades, we've witnessed an unprecedented explosion of data on this planet.
        </p>

        <h2
          className="text-body text-cream text-bold text-center mb-lg"
          style={{
            opacity: titleOpacity,
          }}
        >
          The Data Explosion
        </h2>

        {/* Graph container */}
        <div
          style={{
            opacity: graphOpacity,
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto clamp(0.5rem, 1.5dvh, 1.25rem)',
            position: 'relative',
          }}
        >
          <svg
            viewBox="0 0 400 220"
            style={{ width: '100%', height: 'auto' }}
          >
            {/* Y-axis */}
            <line x1="40" y1="10" x2="40" y2="200" stroke="var(--dark-olive)" strokeWidth="1" />
            {/* X-axis */}
            <line x1="40" y1="200" x2="380" y2="200" stroke="var(--dark-olive)" strokeWidth="1" />

            {/* Y-axis label */}
            <text x="15" y="105" fill="var(--sage)" fontSize="10" textAnchor="middle" transform="rotate(-90, 15, 105)">
              Zettabytes
            </text>

            {/* X-axis label */}
            <text x="210" y="218" fill="var(--sage)" fontSize="10" textAnchor="middle">
              Year
            </text>

            {/* Grid lines */}
            <line x1="40" y1="150" x2="380" y2="150" stroke="var(--dark-olive)" strokeWidth="0.5" strokeDasharray="4" opacity="0.5" />
            <line x1="40" y1="100" x2="380" y2="100" stroke="var(--dark-olive)" strokeWidth="0.5" strokeDasharray="4" opacity="0.5" />
            <line x1="40" y1="50" x2="380" y2="50" stroke="var(--dark-olive)" strokeWidth="0.5" strokeDasharray="4" opacity="0.5" />

            {/* Y-axis values */}
            <text x="35" y="153" fill="var(--sage)" fontSize="8" textAnchor="end">40</text>
            <text x="35" y="103" fill="var(--sage)" fontSize="8" textAnchor="end">80</text>
            <text x="35" y="53" fill="var(--sage)" fontSize="8" textAnchor="end">120</text>

            {/* Animated line */}
            <path
              d="M 60 195 Q 95 190 135 185 T 210 155 T 285 115 T 380 10"
              fill="none"
              stroke="var(--accent-coral)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={pathLength}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />

            {/* Fill area under curve */}
            <path
              d="M 60 195 Q 95 190 135 185 T 210 155 T 285 115 T 380 10 L 380 200 L 60 200 Z"
              fill="var(--accent-coral)"
              opacity={0.15 * lineProgress}
            />

            {/* Data point dots */}
            <circle cx="60" cy="195" r="4" fill="var(--accent-coral)" opacity={label2010Opacity} />
            <circle cx="135" cy="185" r="4" fill="var(--accent-coral)" opacity={label2010Opacity} />
            <circle cx="210" cy="155" r="4" fill="var(--accent-coral)" opacity={label2015Opacity} />
            <circle cx="285" cy="115" r="4" fill="var(--accent-coral)" opacity={label2020Opacity} />
            <circle cx="380" cy="10" r="5" fill="var(--accent-coral)" opacity={label2023Opacity} />
          </svg>

          {/* Year labels positioned below graph */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 2.5rem 0 3rem' }}>
            <span className="text-small text-sage" style={{ opacity: label2010Opacity }}>2005</span>
            <span className="text-small text-sage" style={{ opacity: label2010Opacity }}>2010</span>
            <span className="text-small text-sage" style={{ opacity: label2015Opacity }}>2015</span>
            <span className="text-small text-sage" style={{ opacity: label2020Opacity }}>2020</span>
            <span className="text-small text-coral" style={{ opacity: label2023Opacity }}>2023</span>
          </div>

          {/* Value callouts */}
          <div
            style={{
              position: 'absolute',
              top: '5%',
              right: '5%',
              opacity: label2023Opacity,
              background: 'rgba(71, 73, 36, 0.5)',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              border: '1px solid var(--accent-coral)',
            }}
          >
            <span className="text-body text-coral">120 ZB</span>
          </div>
        </div>

        {/* Zettabyte definition */}
        <div
          className="box-subtle text-center mb-md"
          style={{
            opacity: definitionOpacity,
            transform: `translateY(${definitionY}px)`,
          }}
        >
          <p className="text-body text-sage leading-normal mb-xs">
            <span className="text-cream">What's a zettabyte?</span>
          </p>
          <p className="text-small text-sage leading-normal">
            1 ZB = 1 trillion gigabytes = 1,000,000,000,000,000 megabytes
            <br />
            <span className="text-dark text-small">
              (That's a 1 followed by 21 zeros in bytes)
            </span>
          </p>
        </div>

        {/* Photo analogy */}
        <div
          className="box-definition mb-lg"
          style={{
            opacity: analogyOpacity,
            transform: `translateY(${analogyY}px)`,
            textAlign: 'center',
          }}
        >
          <p className="text-body text-cream leading-normal mb-xs">
            120 zettabytes is roughly <span className="text-coral">60 trillion photos</span>.
          </p>
          <p className="text-body text-sage leading-normal">
            If you viewed one per second, it would take you 1.9 million years.
          </p>
        </div>

        {/* Conclusion */}
        <p
          className="text-title text-cream text-center mb-md"
          style={{
            opacity: conclusionOpacity,
          }}
        >
          And it's accelerating.
        </p>

        {/* Source link */}
        <p
          className="text-label text-dark text-center"
          style={{
            opacity: sourceOpacity,
          }}
        >
          <a
            href="https://www.statista.com/statistics/871513/worldwide-data-created/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--dark-olive)',
              textDecoration: 'underline',
            }}
          >
            Source: IDC Global DataSphere; Statista (2024)
          </a>
        </p>
      </AutoScaleContent>
    </section>
  )
}
