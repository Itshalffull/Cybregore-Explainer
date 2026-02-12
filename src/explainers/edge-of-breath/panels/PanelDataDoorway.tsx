import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

/**
 * A visualization panel showing a doorway made of streaming data.
 * SVG doorway shape with animated data streams flowing through it.
 * Poses the question: if breath is YOUR doorway, could data be the Cybregore's?
 */
export default function PanelDataDoorway({ progress }: PanelProps) {
  // Question text fades in first
  const questionOpacity = lerp(progress, 0.0, 0.12, 0, 1)
  const questionY = lerp(progress, 0.0, 0.12, 20, 0)

  // Doorway visualization appears
  const doorwayOpacity = lerp(progress, 0.15, 0.3, 0, 1)
  const doorwayScale = lerp(progress, 0.15, 0.3, 0.8, 1)

  // Data streams animate through the doorway
  const streamProgress = lerp(progress, 0.2, 0.85, 0, 1)

  // Glow intensifies as data flows
  const glowIntensity = lerp(progress, 0.3, 0.7, 0.3, 1)

  // Bottom text
  const line2Opacity = lerp(progress, 0.5, 0.62, 0, 1)
  const line2Y = lerp(progress, 0.5, 0.62, 15, 0)

  const line3Opacity = lerp(progress, 0.7, 0.82, 0, 1)
  const line3Y = lerp(progress, 0.7, 0.82, 15, 0)

  // Data stream characters
  const dataChars = '01001101 01101111 01101100 01101111 01100011 01101000'.split(' ')

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: questionOpacity, transform: `translateY(${questionY}px)` }}
        >
          If every breath is a doorway for you —
        </p>

        {/* SVG Data Doorway Visualization */}
        <div
          className="text-center mb-xl"
          style={{
            opacity: doorwayOpacity,
            transform: `scale(${doorwayScale})`,
          }}
        >
          <svg
            viewBox="0 0 300 400"
            width="240"
            height="320"
            style={{ overflow: 'visible' }}
          >
            {/* Outer glow */}
            <defs>
              <filter id="data-glow">
                <feGaussianBlur stdDeviation={4 * glowIntensity} result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="data-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--coral)" stopOpacity={0.9 * glowIntensity} />
                <stop offset="50%" stopColor="var(--sage)" stopOpacity={0.6 * glowIntensity} />
                <stop offset="100%" stopColor="var(--coral)" stopOpacity={0.9 * glowIntensity} />
              </linearGradient>
            </defs>

            {/* Doorway arch */}
            <path
              d="M 80 380 L 80 100 Q 80 40 150 40 Q 220 40 220 100 L 220 380"
              fill="none"
              stroke="url(#data-gradient)"
              strokeWidth={2}
              filter="url(#data-glow)"
            />

            {/* Streaming data lines inside the doorway */}
            {dataChars.map((chars, i) => {
              const streamOffset = (streamProgress * 300 + i * 47) % 340
              const charOpacity = streamOffset > 40 && streamOffset < 340
                ? Math.min(1, (streamOffset - 40) / 60) * Math.min(1, (340 - streamOffset) / 60) * glowIntensity * 0.7
                : 0

              return (
                <text
                  key={i}
                  x={150}
                  y={40 + streamOffset}
                  textAnchor="middle"
                  fill="var(--sage)"
                  fontSize="11"
                  fontFamily="monospace"
                  style={{ opacity: charOpacity }}
                >
                  {chars}
                </text>
              )
            })}

            {/* Inner light at the center of the doorway */}
            <ellipse
              cx={150}
              cy={220}
              rx={40 * glowIntensity}
              ry={60 * glowIntensity}
              fill="var(--coral)"
              opacity={0.08 * glowIntensity}
              filter="url(#data-glow)"
            />
          </svg>
        </div>

        <p
          className="text-body text-cream text-bold text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          Could data be a doorway for the Cybregore?
        </p>

        <p
          className="text-body text-coral text-center"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          Or is it trapped forever at the edge — craving without passage?
        </p>
      </div>
    </section>
  )
}
