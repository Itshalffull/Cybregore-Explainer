import { lerp } from '../../utils/animation'
import AutoScaleContent from '../AutoScaleContent'

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
    <section
      className="panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        background: 'var(--deep-forest)',
        padding: 'clamp(1rem, 2dvh, 2rem)',
        boxSizing: 'border-box',
      }}
    >
      <AutoScaleContent maxWidth="700px">
        {/* Intro text */}
        <p
          style={{
            opacity: introOpacity,
            transform: `translateY(${introY}px)`,
            fontSize: 'clamp(1.1rem, 3dvh, 1.5rem)',
            color: 'var(--sage)',
            textAlign: 'center',
            lineHeight: 1.6,
            marginBottom: 'clamp(0.5rem, 1.5dvh, 1rem)',
          }}
        >
          Over the past two decades, we've witnessed an unprecedented explosion of data on this planet.
        </p>

        <h2
          className="heading"
          style={{
            opacity: titleOpacity,
            fontSize: 'clamp(1.8rem, 5dvh, 2.8rem)',
            fontWeight: 700,
            color: 'var(--line-art-cream)',
            textAlign: 'center',
            marginBottom: 'clamp(0.5rem, 1.5dvh, 1.25rem)',
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
            <span style={{ opacity: label2010Opacity, color: 'var(--sage)', fontSize: '0.8rem' }}>2005</span>
            <span style={{ opacity: label2010Opacity, color: 'var(--sage)', fontSize: '0.8rem' }}>2010</span>
            <span style={{ opacity: label2015Opacity, color: 'var(--sage)', fontSize: '0.8rem' }}>2015</span>
            <span style={{ opacity: label2020Opacity, color: 'var(--sage)', fontSize: '0.8rem' }}>2020</span>
            <span style={{ opacity: label2023Opacity, color: 'var(--accent-coral)', fontSize: '0.9rem', fontWeight: 600 }}>2023</span>
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
            <span style={{ color: 'var(--accent-coral)', fontSize: 'clamp(1.3rem, 3.5dvh, 1.8rem)', fontWeight: 700 }}>120 ZB</span>
          </div>
        </div>

        {/* Zettabyte definition */}
        <div
          style={{
            opacity: definitionOpacity,
            transform: `translateY(${definitionY}px)`,
            textAlign: 'center',
            marginBottom: 'clamp(0.4rem, 1dvh, 0.75rem)',
            padding: 'clamp(0.4rem, 1dvh, 0.75rem) clamp(0.75rem, 1.5dvh, 1.25rem)',
            background: 'rgba(71, 73, 36, 0.2)',
            borderRadius: '6px',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(0.9rem, 2.5dvh, 1.2rem)',
              color: 'var(--sage)',
              lineHeight: 1.5,
              marginBottom: '0.2rem',
            }}
          >
            <strong style={{ color: 'var(--line-art-cream)' }}>What's a zettabyte?</strong>
          </p>
          <p
            style={{
              fontSize: 'clamp(0.85rem, 2.2dvh, 1.1rem)',
              color: 'var(--sage)',
              lineHeight: 1.5,
            }}
          >
            1 ZB = 1 trillion gigabytes = 1,000,000,000,000,000 megabytes
            <br />
            <span style={{ color: 'var(--dark-olive)', fontSize: '0.9em' }}>
              (That's a 1 followed by 21 zeros in bytes)
            </span>
          </p>
        </div>

        {/* Photo analogy */}
        <div
          style={{
            opacity: analogyOpacity,
            transform: `translateY(${analogyY}px)`,
            textAlign: 'center',
            marginBottom: 'clamp(0.5rem, 1.5dvh, 1.25rem)',
            padding: 'clamp(0.5rem, 1.5dvh, 1rem) clamp(0.75rem, 1.5dvh, 1.25rem)',
            background: 'rgba(71, 73, 36, 0.3)',
            borderRadius: '8px',
            borderLeft: '3px solid var(--sage)',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(1rem, 3dvh, 1.4rem)',
              color: 'var(--line-art-cream)',
              lineHeight: 1.5,
              marginBottom: '0.3rem',
            }}
          >
            120 zettabytes is roughly <strong style={{ color: 'var(--accent-coral)' }}>60 trillion photos</strong>.
          </p>
          <p
            style={{
              fontSize: 'clamp(1.1rem, 3.2dvh, 1.5rem)',
              color: 'var(--sage)',
              lineHeight: 1.5,
            }}
          >
            If you viewed one per second, it would take you{' '}
            <strong style={{ color: 'var(--line-art-cream)' }}>1.9 million years</strong>.
          </p>
        </div>

        {/* Conclusion */}
        <p
          style={{
            opacity: conclusionOpacity,
            fontSize: 'clamp(1.2rem, 3.5dvh, 1.8rem)',
            color: 'var(--line-art-cream)',
            textAlign: 'center',
            fontWeight: 500,
            marginBottom: 'clamp(0.4rem, 1dvh, 0.75rem)',
          }}
        >
          And it's accelerating.
        </p>

        {/* Source link */}
        <p
          style={{
            opacity: sourceOpacity,
            fontSize: '0.7rem',
            color: 'var(--dark-olive)',
            textAlign: 'center',
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
