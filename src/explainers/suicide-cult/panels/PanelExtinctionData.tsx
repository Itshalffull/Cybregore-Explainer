import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelExtinctionData({ progress }: PanelProps) {
  const titleOpacity = lerp(progress, 0.0, 0.12, 0, 1)
  const titleY = lerp(progress, 0.0, 0.12, 20, 0)

  const chartOpacity = lerp(progress, 0.15, 0.28, 0, 1)

  // Extinction curve drawn left to right — exponential shape
  const lineLength = lerp(progress, 0.20, 0.60, 0, 100)

  const labelOpacity = lerp(progress, 0.45, 0.55, 0, 1)

  const annotationOpacity = lerp(progress, 0.65, 0.78, 0, 1)
  const annotationY = lerp(progress, 0.65, 0.78, 15, 0)

  // The exponential curve path: starts flat then rockets upward
  // Points: (20,170) (80,168) (140,165) (200,158) (250,140) (290,105) (320,60) (350,20)
  const curvePath = 'M 20 170 C 80 168, 200 160, 250 140 C 290 110, 320 60, 370 15'
  const totalPathLength = 420

  const dashOffset = totalPathLength - (totalPathLength * lineLength) / 100

  return (
    <section className="panel panel--dark">
      <div className="panel-body panel-body--wide">
        <p
          className="text-body text-cream text-bold text-center mb-lg"
          style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}
        >
          Exponential increase in species extinctions
        </p>

        <svg
          viewBox="0 0 400 220"
          style={{ opacity: chartOpacity, width: '100%', maxWidth: '600px', margin: '0 auto', display: 'block' }}
        >
          {/* Grid lines */}
          <line x1="20" y1="170" x2="380" y2="170" stroke="var(--dark-olive)" strokeWidth="0.5" strokeDasharray="4" />
          <line x1="20" y1="130" x2="380" y2="130" stroke="var(--dark-olive)" strokeWidth="0.5" strokeDasharray="4" />
          <line x1="20" y1="90" x2="380" y2="90" stroke="var(--dark-olive)" strokeWidth="0.5" strokeDasharray="4" />
          <line x1="20" y1="50" x2="380" y2="50" stroke="var(--dark-olive)" strokeWidth="0.5" strokeDasharray="4" />

          {/* Axis */}
          <line x1="20" y1="170" x2="20" y2="10" stroke="var(--sage)" strokeWidth="1" />
          <line x1="20" y1="170" x2="380" y2="170" stroke="var(--sage)" strokeWidth="1" />

          {/* Axis labels */}
          <text x="200" y="195" fill="var(--sage)" fontSize="10" textAnchor="middle">Time</text>
          <text x="8" y="90" fill="var(--sage)" fontSize="10" textAnchor="middle" transform="rotate(-90, 8, 90)">Species Lost</text>

          {/* Time markers */}
          <text x="50" y="185" fill="var(--dark-olive)" fontSize="8" textAnchor="middle" style={{ opacity: labelOpacity }}>1800</text>
          <text x="140" y="185" fill="var(--dark-olive)" fontSize="8" textAnchor="middle" style={{ opacity: labelOpacity }}>1900</text>
          <text x="250" y="185" fill="var(--dark-olive)" fontSize="8" textAnchor="middle" style={{ opacity: labelOpacity }}>1970</text>
          <text x="330" y="185" fill="var(--dark-olive)" fontSize="8" textAnchor="middle" style={{ opacity: labelOpacity }}>2000</text>
          <text x="370" y="185" fill="var(--accent-coral)" fontSize="8" textAnchor="middle" style={{ opacity: labelOpacity }}>Now</text>

          {/* The extinction curve */}
          <path
            d={curvePath}
            fill="none"
            stroke="var(--accent-coral)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={totalPathLength}
            strokeDashoffset={dashOffset}
          />

          {/* Endpoint glow */}
          {lineLength > 95 && (
            <circle cx="370" cy="15" r="4" fill="var(--accent-coral)" opacity="0.8" />
          )}
        </svg>

        <p
          className="text-body text-coral text-bold text-center mb-sm"
          style={{ opacity: annotationOpacity, transform: `translateY(${annotationY}px)` }}
        >
          This is the cult's ritual.
        </p>
        <p
          className="text-body text-sage text-center"
          style={{ opacity: annotationOpacity, transform: `translateY(${annotationY}px)` }}
        >
          The systematic extermination of life on Earth.
        </p>
      </div>
    </section>
  )
}
