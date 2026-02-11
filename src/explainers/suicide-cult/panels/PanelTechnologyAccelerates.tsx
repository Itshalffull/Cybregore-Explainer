import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelTechnologyAccelerates({ progress }: PanelProps) {
  const titleOpacity = lerp(progress, 0.0, 0.10, 0, 1)
  const titleY = lerp(progress, 0.0, 0.10, 20, 0)

  const chartOpacity = lerp(progress, 0.12, 0.22, 0, 1)

  // Each step appears sequentially
  const step1 = lerp(progress, 0.15, 0.25, 0, 1)
  const step2 = lerp(progress, 0.25, 0.35, 0, 1)
  const step3 = lerp(progress, 0.35, 0.45, 0, 1)
  const step4 = lerp(progress, 0.45, 0.55, 0, 1)
  const step5 = lerp(progress, 0.55, 0.65, 0, 1)

  const annotationOpacity = lerp(progress, 0.72, 0.85, 0, 1)
  const annotationY = lerp(progress, 0.72, 0.85, 15, 0)

  // Step heights (y positions — lower y = higher on chart)
  // Tribes: low destruction, AI: maximal
  const steps = [
    { label: 'Tribes', x: 30, y: 160, width: 55, opacity: step1 },
    { label: 'Agriculture', x: 90, y: 140, width: 55, opacity: step2 },
    { label: 'Industry', x: 150, y: 105, width: 55, opacity: step3 },
    { label: 'Internet', x: 210, y: 60, width: 55, opacity: step4 },
    { label: 'AI', x: 270, y: 15, width: 55, opacity: step5 },
  ]

  return (
    <section className="panel panel--dark">
      <div className="panel-body panel-body--wide">
        <p
          className="text-body text-cream text-bold text-center mb-lg"
          style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}
        >
          Each level of intelligence accelerates the killing
        </p>

        <svg
          viewBox="0 0 360 210"
          style={{ opacity: chartOpacity, width: '100%', maxWidth: '600px', margin: '0 auto', display: 'block' }}
        >
          {/* Grid lines */}
          <line x1="20" y1="170" x2="340" y2="170" stroke="var(--dark-olive)" strokeWidth="0.5" strokeDasharray="4" />
          <line x1="20" y1="130" x2="340" y2="130" stroke="var(--dark-olive)" strokeWidth="0.5" strokeDasharray="4" />
          <line x1="20" y1="90" x2="340" y2="90" stroke="var(--dark-olive)" strokeWidth="0.5" strokeDasharray="4" />
          <line x1="20" y1="50" x2="340" y2="50" stroke="var(--dark-olive)" strokeWidth="0.5" strokeDasharray="4" />

          {/* Axis */}
          <line x1="20" y1="170" x2="20" y2="5" stroke="var(--sage)" strokeWidth="1" />
          <line x1="20" y1="170" x2="340" y2="170" stroke="var(--sage)" strokeWidth="1" />

          {/* Y-axis label */}
          <text x="8" y="90" fill="var(--sage)" fontSize="9" textAnchor="middle" transform="rotate(-90, 8, 90)">Destruction</text>

          {/* Step graph — each step is a horizontal line + vertical riser */}
          {steps.map((step, i) => (
            <g key={step.label} style={{ opacity: step.opacity }}>
              {/* Horizontal step */}
              <line
                x1={step.x}
                y1={step.y}
                x2={step.x + step.width}
                y2={step.y}
                stroke={i >= 3 ? 'var(--accent-coral)' : 'var(--sage)'}
                strokeWidth="2.5"
              />
              {/* Vertical riser to next step */}
              {i < steps.length - 1 && (
                <line
                  x1={step.x + step.width}
                  y1={step.y}
                  x2={steps[i + 1].x}
                  y2={steps[i + 1].y}
                  stroke={i >= 2 ? 'var(--accent-coral)' : 'var(--sage)'}
                  strokeWidth="1.5"
                  strokeDasharray="3"
                />
              )}
              {/* Label */}
              <text
                x={step.x + step.width / 2}
                y={step.y + 14}
                fill={i >= 3 ? 'var(--accent-coral)' : 'var(--sage)'}
                fontSize="9"
                textAnchor="middle"
              >
                {step.label}
              </text>
            </g>
          ))}

          {/* Upward arrow at AI peak */}
          {step5 > 0.8 && (
            <g style={{ opacity: lerp(step5, 0.8, 1, 0, 1) }}>
              <line x1="325" y1="15" x2="325" y2="5" stroke="var(--accent-coral)" strokeWidth="2" />
              <polygon points="320,8 325,0 330,8" fill="var(--accent-coral)" />
            </g>
          )}
        </svg>

        <p
          className="text-body text-cream text-center mb-sm"
          style={{ opacity: annotationOpacity, transform: `translateY(${annotationY}px)` }}
        >
          Tribes to agriculture to industry to AI.
        </p>
        <p
          className="text-body text-coral text-bold text-center"
          style={{ opacity: annotationOpacity, transform: `translateY(${annotationY}px)` }}
        >
          The pattern is structural.
        </p>
      </div>
    </section>
  )
}
