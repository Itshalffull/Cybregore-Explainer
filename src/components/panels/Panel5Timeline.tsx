import { lerp } from '../../utils/animation'

interface EraFigure {
  id: number
  era: string
  year: string
  word: string
  description: string
}

const ERAS: EraFigure[] = [
  { id: 1, era: 'Hunter', year: '70,000 BCE', word: 'TRIBE', description: 'Coordination for survival' },
  { id: 2, era: 'Farmer', year: '10,000 BCE', word: 'PROPERTY', description: 'Ownership emerges' },
  { id: 3, era: 'Merchant', year: '3,000 BCE', word: 'MONEY', description: 'Abstract value' },
  { id: 4, era: 'Empire', year: '500 BCE', word: 'EMPIRE', description: 'Centralized control' },
  { id: 5, era: 'Worker', year: '1800 CE', word: 'INDUSTRY', description: 'Mechanized labor' },
  { id: 6, era: 'Modern', year: 'NOW', word: 'DATA', description: 'Digital everything' },
]

// Map era to generated images
const ERA_IMAGES: Record<string, string> = {
  'Hunter': '/assets/images/figure-hunter.png',
  'Farmer': '/assets/images/figure-farmer.png',
  'Merchant': '/assets/images/figure-merchant.png',
  'Empire': '/assets/images/figure-empire.png',
  'Worker': '/assets/images/figure-worker.png',
  'Modern': '/assets/images/figure-modern.png',
}

// AI-generated figure image component
const TimelineFigure = ({ era, opacity }: { era: string; opacity: number }) => (
  <img
    src={ERA_IMAGES[era]}
    alt={`${era} figure`}
    style={{
      width: '140px',
      height: '220px',
      objectFit: 'contain',
      opacity,
    }}
  />
)

interface Panel5TimelineProps {
  progress: number
}

export default function Panel5Timeline({ progress }: Panel5TimelineProps) {
  // Map scroll progress to animation phases
  // 0-0.1: Header appears
  // 0.1-0.6: Each figure appears progressively (6 figures, ~0.08 each)
  // 0.6-0.75: Conclusion text 1
  // 0.75-0.85: Conclusion text 2
  // 0.85-1.0: Scroll hint

  const headerOpacity = lerp(progress, 0, 0.1, 0, 1)
  const headerY = lerp(progress, 0, 0.1, -20, 0)

  // Each era gets a progressive opacity based on scroll
  const eraOpacities = ERAS.map((_, index) => {
    const start = 0.1 + index * 0.08
    const end = start + 0.08
    return lerp(progress, start, end, 0, 1)
  })

  const conclusion1Opacity = lerp(progress, 0.6, 0.7, 0, 1)
  const conclusion1Y = lerp(progress, 0.6, 0.7, 20, 0)

  const conclusion2Opacity = lerp(progress, 0.75, 0.85, 0, 1)

  const scrollHintOpacity = lerp(progress, 0.9, 0.95, 0, 0.6)

  return (
    <section
      className="panel panel--dark"
      style={{
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
      <div className="content" style={{ maxWidth: '1000px' }}>
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'var(--space-xl)',
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
          }}
        >
          <h2 className="heading heading-md text-cream">It scales.</h2>
        </div>

        {/* Timeline grid - 3 columns x 2 rows */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-lg)',
            marginBottom: 'var(--space-xl)',
          }}
        >
          {ERAS.map((era, index) => (
            <div
              key={era.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <TimelineFigure era={era.era} opacity={eraOpacities[index]} />

              <div
                className="mt-sm"
                style={{ opacity: eraOpacities[index] }}
              >
                <p className="body-sm text-cream" style={{ fontWeight: 500 }}>
                  {era.year}
                </p>
                <p className="body-sm text-cream mt-xs" style={{ opacity: 0.6, fontSize: '0.8rem' }}>
                  {era.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div style={{ textAlign: 'center' }}>
          <h3
            className="heading heading-md text-cream"
            style={{
              opacity: conclusion1Opacity,
              transform: `translateY(${conclusion1Y}px)`,
            }}
          >
            Each invention made us more powerful.
          </h3>

          <p
            className="body-lg text-cream mt-md"
            style={{ opacity: conclusion2Opacity }}
          >
            And more destructive.
          </p>

          <p
            className="body-md text-cream mt-lg"
            style={{ opacity: scrollHintOpacity }}
          >
            ↓ Keep scrolling
          </p>
        </div>
      </div>
    </section>
  )
}
