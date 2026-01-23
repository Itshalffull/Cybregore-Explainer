import { lerp } from '../../utils/animation'

// Animated line graph component
const AnimatedGraph = ({
  title,
  color,
  isInverse,
  graphProgress,
}: {
  title: string
  color: string
  isInverse: boolean
  graphProgress: number
}) => {
  // Generate exponential curve points
  const generatePath = () => {
    const points: string[] = []
    const width = 280
    const height = 180
    const padding = 20

    for (let i = 0; i <= 100; i++) {
      const x = padding + (i / 100) * (width - 2 * padding)
      // Exponential curve
      let normalizedY = Math.pow(i / 100, 3) // Cubic for nice exponential look

      if (isInverse) {
        normalizedY = 1 - normalizedY
      }

      const y = padding + (1 - normalizedY) * (height - 2 * padding)

      if (i === 0) {
        points.push(`M ${x} ${y}`)
      } else {
        points.push(`L ${x} ${y}`)
      }
    }

    return points.join(' ')
  }

  const path = generatePath()

  const strokeDashoffset = lerp(graphProgress, 0, 1, 1000, 0)

  return (
    <div style={{ width: '100%', maxWidth: '320px' }}>
      <h3
        className="heading heading-sm"
        style={{ marginBottom: 'var(--space-sm)', color: 'var(--heading-color)' }}
      >
        {title}
      </h3>

      <svg viewBox="0 0 280 180" width="100%" height="auto">
        {/* Background grid */}
        <g opacity="0.1">
          {[1, 2, 3, 4].map((i) => (
            <line
              key={`h${i}`}
              x1="20"
              y1={20 + i * 35}
              x2="260"
              y2={20 + i * 35}
              stroke="var(--heading-color)"
              strokeWidth="1"
            />
          ))}
          {[1, 2, 3, 4, 5].map((i) => (
            <line
              key={`v${i}`}
              x1={20 + i * 48}
              y1="20"
              x2={20 + i * 48}
              y2="160"
              stroke="var(--heading-color)"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* Axes */}
        <line
          x1="20"
          y1="160"
          x2="260"
          y2="160"
          stroke="var(--heading-color)"
          strokeWidth="2"
        />
        <line
          x1="20"
          y1="20"
          x2="20"
          y2="160"
          stroke="var(--heading-color)"
          strokeWidth="2"
        />

        {/* Area under curve */}
        <path
          d={`${path} L 260 160 L 20 160 Z`}
          fill={color}
          fillOpacity={0.15}
          style={{ opacity: graphProgress }}
        />

        {/* Main line */}
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1000"
          strokeDashoffset={strokeDashoffset}
        />

        {/* Axis labels */}
        <text
          x="140"
          y="178"
          textAnchor="middle"
          fill="var(--body-color)"
          fontFamily="Inter, sans-serif"
          fontSize="10"
          opacity="0.6"
        >
          Time
        </text>
      </svg>
    </div>
  )
}

interface Panel6CorrelationProps {
  progress: number
}

export default function Panel6Correlation({ progress }: Panel6CorrelationProps) {
  // Map scroll progress to animation phases
  // 0-0.1: Graphs container fades in
  // 0.1-0.35: First graph draws
  // 0.35-0.6: Second graph draws
  // 0.6-0.75: Question appears
  // 0.75-0.85: Buddhist answer hint
  // 0.85-1.0: Scroll hint

  const graphsContainerOpacity = lerp(progress, 0, 0.1, 0, 1)
  const graphsContainerY = lerp(progress, 0, 0.1, 30, 0)

  const graph1Progress = lerp(progress, 0.1, 0.35, 0, 1)
  const graph2Progress = lerp(progress, 0.35, 0.6, 0, 1)

  const questionOpacity = lerp(progress, 0.6, 0.7, 0, 1)
  const questionY = lerp(progress, 0.6, 0.7, 20, 0)

  const answerHintOpacity = lerp(progress, 0.75, 0.85, 0, 1)
  const scrollHintOpacity = lerp(progress, 0.9, 0.95, 0, 0.6)

  return (
    <section
      className="panel panel--sage"
      style={{
        backgroundColor: 'var(--sage)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        minHeight: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div className="content" style={{ maxWidth: '900px' }}>
        {/* Graphs container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-xl)',
            marginBottom: 'var(--space-2xl)',
            opacity: graphsContainerOpacity,
            transform: `translateY(${graphsContainerY}px)`,
          }}
        >
          <AnimatedGraph
            title="Human AI Complexity"
            color="var(--dark-olive)"
            isInverse={false}
            graphProgress={graph1Progress}
          />

          <AnimatedGraph
            title="Life on Earth"
            color="var(--accent-coral)"
            isInverse={true}
            graphProgress={graph2Progress}
          />
        </div>

        {/* Question section */}
        <div>
          <h2
            className="heading heading-lg"
            style={{
              opacity: questionOpacity,
              transform: `translateY(${questionY}px)`,
            }}
          >
            Why do these lines mirror each other?
          </h2>

          <div
            className="mt-2xl"
            style={{ opacity: answerHintOpacity }}
          >
            <p className="body-lg" style={{ fontStyle: 'italic', opacity: 0.8 }}>
              Buddhist answer:
            </p>

            <p
              className="body-md mt-lg"
              style={{ opacity: scrollHintOpacity }}
            >
              ↓ Keep scrolling
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
