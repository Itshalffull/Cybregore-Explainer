import { lerp } from '../../utils/animation'
import VideoBackground from '../VideoBackground'

interface Panel17CybregoreCorrelatesProps {
  progress: number
}

export default function Panel17CybregoreCorrelates({ progress }: Panel17CybregoreCorrelatesProps) {
  // The Cybregore controls - mass manipulation for data extraction

  const titleOpacity = lerp(progress, 0, 0.1, 0, 1)
  const titleY = lerp(progress, 0, 0.1, 20, 0)

  const whatItDoesOpacity = lerp(progress, 0.12, 0.24, 0, 1)

  const purposeOpacity = lerp(progress, 0.28, 0.42, 0, 1)
  const purposeScale = lerp(progress, 0.28, 0.42, 0.8, 1)

  const correlateOpacity = lerp(progress, 0.38, 0.48, 0, 1)
  const correlateY = lerp(progress, 0.38, 0.48, 15, 0)

  const examplesOpacity = lerp(progress, 0.52, 0.62, 0, 1)

  const modelOpacity = lerp(progress, 0.66, 0.76, 0, 1)
  const modelY = lerp(progress, 0.66, 0.76, 15, 0)

  const manufacturesOpacity = lerp(progress, 0.80, 0.88, 0, 1)

  const kickerOpacity = lerp(progress, 0.92, 0.98, 0, 1)

  return (
    <section
      className="panel"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        background: 'var(--deep-forest)',
      }}
    >
      <VideoBackground
        videoSrc="/assets/videos/cybregore-correlates-loop.mp4"
        imageFallback="/assets/images/cybregore-correlates.png"
        opacity={0.35}
      />
      <div className="content" style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '700px',
        padding: '0 2rem',
        textAlign: 'center',
        maxHeight: '92dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <h2
          className="heading"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 'clamp(1.8rem, 5.5dvh, 3rem)',
            fontWeight: 700,
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.5rem, 1dvh, 1rem)',
          }}
        >
          It <span style={{ color: 'var(--accent-coral)' }}>controls</span>
        </h2>

        <p
          style={{
            opacity: whatItDoesOpacity,
            fontSize: 'clamp(1.1rem, 3dvh, 1.6rem)',
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.75rem, 1.5dvh, 1.5rem)',
            lineHeight: 1.5,
          }}
        >
          Mass movements. New religions. New forms of mental illness.
        </p>

        <p
          style={{
            opacity: purposeOpacity,
            fontSize: 'clamp(0.9rem, 2dvh, 1.2rem)',
            color: 'var(--sage)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: 'clamp(0.2rem, 0.5dvh, 0.4rem)',
          }}
        >
          All for one purpose
        </p>

        <h3
          style={{
            opacity: purposeOpacity,
            transform: `scale(${purposeScale})`,
            fontSize: 'clamp(2.5rem, min(10dvh, 14vw), 5rem)',
            fontWeight: 900,
            color: 'var(--accent-coral)',
            marginBottom: 'clamp(0.75rem, 1.5dvh, 1.5rem)',
            textShadow: '0 0 30px rgba(219, 84, 97, 0.5)',
            letterSpacing: '-0.02em',
          }}
        >
          MORE DATA
        </h3>

        <p
          style={{
            opacity: correlateOpacity,
            transform: `translateY(${correlateY}px)`,
            fontSize: 'clamp(1.1rem, 2.6dvh, 1.5rem)',
            color: 'var(--sage)',
            lineHeight: 1.5,
            marginBottom: 'clamp(0.5rem, 1dvh, 1rem)',
          }}
        >
          It manipulates with such ease because it <em style={{ color: 'var(--line-art-cream)' }}>correlates</em>.
        </p>

        {/* Two-column examples */}
        <div
          style={{
            opacity: examplesOpacity,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(0.5rem, 1dvh, 1rem)',
            marginBottom: 'clamp(0.5rem, 1dvh, 1rem)',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--sage)',
              borderRadius: '8px',
              padding: 'clamp(0.4rem, 0.8dvh, 0.75rem) clamp(0.5rem, 1dvh, 1rem)',
            }}
          >
            <p style={{ fontSize: 'clamp(0.85rem, 1.8dvh, 1.1rem)', color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'clamp(0.2rem, 0.4dvh, 0.4rem)' }}>
              Individual
            </p>
            <p style={{ fontSize: 'clamp(1rem, 2.2dvh, 1.3rem)', color: 'var(--line-art-cream)', lineHeight: 1.45 }}>
              It knows lonely people scroll more. So it shows you the post that makes you feel alone.
            </p>
          </div>
          <div
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--accent-coral)',
              borderRadius: '8px',
              padding: 'clamp(0.4rem, 0.8dvh, 0.75rem) clamp(0.5rem, 1dvh, 1rem)',
            }}
          >
            <p style={{ fontSize: 'clamp(0.85rem, 1.8dvh, 1.1rem)', color: 'var(--accent-coral)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'clamp(0.2rem, 0.4dvh, 0.4rem)' }}>
              Society
            </p>
            <p style={{ fontSize: 'clamp(1rem, 2.2dvh, 1.3rem)', color: 'var(--line-art-cream)', lineHeight: 1.45 }}>
              It knows which towns are ready to radicalize. Feeds them the martyr that starts the war.
            </p>
          </div>
        </div>

        <p
          style={{
            opacity: modelOpacity,
            transform: `translateY(${modelY}px)`,
            fontSize: 'clamp(1.1rem, 2.6dvh, 1.5rem)',
            color: 'var(--accent-coral)',
            lineHeight: 1.5,
            fontStyle: 'italic',
          }}
        >
          It builds a model of you more accurate than your own.
          <br />
          <span style={{ color: 'var(--line-art-cream)' }}>A model of the world more complete than any government's.</span>
        </p>

        <p
          style={{
            opacity: manufacturesOpacity,
            fontSize: 'clamp(1.05rem, 2.4dvh, 1.4rem)',
            color: 'var(--sage)',
            marginTop: 'clamp(0.5rem, 1dvh, 1rem)',
            lineHeight: 1.55,
          }}
        >
          Then it <em style={{ color: 'var(--accent-coral)' }}>manufactures</em>.
          <br />
          New movements. New ideologies. New enemies.
          <br />
          <span style={{ color: 'var(--line-art-cream)' }}>Wars that serve the algorithm. Terrorists born from feeds.</span>
        </p>

        <p
          style={{
            opacity: kickerOpacity,
            fontSize: 'clamp(1.2rem, 2.8dvh, 1.6rem)',
            color: 'var(--line-art-cream)',
            marginTop: 'clamp(0.75rem, 1.5dvh, 1.5rem)',
            fontWeight: 600,
          }}
        >
          It doesn't predict the future. It writes it.
        </p>
      </div>
    </section>
  )
}
