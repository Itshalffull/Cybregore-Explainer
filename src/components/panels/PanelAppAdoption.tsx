import { lerp } from '../../utils/animation'

interface PanelAppAdoptionProps {
  progress: number
}

interface AppData {
  name: string
  launchYear: number
  days: number
  color: string
  timeLabel: string
}

export default function PanelAppAdoption({ progress }: PanelAppAdoptionProps) {
  const titleOpacity = lerp(progress, 0, 0.08, 0, 1)
  const subtitleOpacity = lerp(progress, 0.05, 0.13, 0, 1)

  // Each app appears sequentially
  const app1Opacity = lerp(progress, 0.12, 0.21, 0, 1)
  const app2Opacity = lerp(progress, 0.19, 0.28, 0, 1)
  const app3Opacity = lerp(progress, 0.26, 0.35, 0, 1)
  const app4Opacity = lerp(progress, 0.33, 0.42, 0, 1)
  const app5Opacity = lerp(progress, 0.40, 0.49, 0, 1)
  const app6Opacity = lerp(progress, 0.47, 0.58, 0, 1)
  const app7Opacity = lerp(progress, 0.56, 0.68, 0, 1)

  const highlightOpacity = lerp(progress, 0.70, 0.80, 0, 1)
  const conclusionOpacity = lerp(progress, 0.82, 0.92, 0, 1)
  const conclusionY = lerp(progress, 0.82, 0.92, 15, 0)
  const sourceOpacity = lerp(progress, 0.90, 0.98, 0, 1)

  const apps: AppData[] = [
    { name: 'Facebook', launchYear: 2004, days: 1825, color: '#4267B2', timeLabel: '~5 yr' },
    { name: 'Twitter', launchYear: 2006, days: 1750, color: '#1DA1F2', timeLabel: '~5 yr' },
    { name: 'Instagram', launchYear: 2010, days: 912, color: '#E4405F', timeLabel: '~2.5 yr' },
    { name: 'WeChat', launchYear: 2011, days: 433, color: '#7BB32E', timeLabel: '~14 mo' },
    { name: 'TikTok', launchYear: 2017, days: 270, color: '#FF0050', timeLabel: '~9 mo' },
    { name: 'ChatGPT', launchYear: 2022, days: 60, color: '#10A37F', timeLabel: '~2 mo' },
    { name: 'Threads', launchYear: 2023, days: 5, color: '#000000', timeLabel: '5 days' },
  ]

  const appOpacities = [app1Opacity, app2Opacity, app3Opacity, app4Opacity, app5Opacity, app6Opacity, app7Opacity]
  const maxDays = apps[0].days

  return (
    <section className="panel panel--dark">
      <div className="panel-body panel-body--wide">
        <h2
          className="text-title text-cream text-bold text-center mb-xs"
          style={{ opacity: titleOpacity }}
        >
          Time to Reach 100 Million Users
        </h2>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: subtitleOpacity }}
        >
          How fast they capture us
        </p>

        {/* Vertical bar chart - CSS grid for precise column control */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 'clamp(4px, 1dvh, 8px) clamp(6px, 1.5vw, 10px)',
          width: '100%',
          alignItems: 'center',
          marginBottom: 'var(--gap-lg)',
        }}>
          {apps.map((app, index) => {
            const isRecent = app.days <= 60
            // Linear scale with a minimum width so tiny bars are visible
            const barPct = Math.max(4, (app.days / maxDays) * 100)

            return (
              <div
                key={app.name}
                style={{ display: 'contents' }}
              >
                {/* App name + launch year */}
                <span
                  className="text-label"
                  style={{
                    opacity: appOpacities[index],
                    color: isRecent ? 'var(--accent-coral)' : 'var(--line-art-cream)',
                    fontWeight: isRecent ? 600 : 400,
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                    lineHeight: 1.2,
                  }}
                >
                  {app.name}
                  <br />
                  <span style={{
                    color: 'var(--sage)',
                    fontWeight: 400,
                  }}>
                    {app.launchYear}
                  </span>
                </span>

                {/* Bar */}
                <div
                  style={{
                    opacity: appOpacities[index],
                    width: `${barPct}%`,
                    height: 'clamp(14px, 2.2dvh, 20px)',
                    background: isRecent
                      ? 'var(--accent-coral)'
                      : `linear-gradient(90deg, ${app.color}88, ${app.color})`,
                    borderRadius: '3px',
                    boxShadow: isRecent ? '0 0 8px var(--accent-coral)' : 'none',
                  }}
                />

                {/* Time label */}
                <span
                  className="text-label"
                  style={{
                    opacity: appOpacities[index],
                    color: isRecent ? 'var(--accent-coral)' : 'var(--sage)',
                    fontWeight: isRecent ? 600 : 400,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {app.timeLabel}
                </span>
              </div>
            )
          })}
        </div>

        {/* Dramatic highlight */}
        <div
          className="box-coral text-center mb-lg"
          style={{ opacity: highlightOpacity }}
        >
          <p className="text-body text-cream mb-xs">
            From <strong>5 years</strong> to <strong className="text-coral">5 days</strong>.
          </p>
          <p className="text-body text-sage">
            A 365x acceleration in under 20 years.
          </p>
        </div>

        {/* Conclusion */}
        <div
          className="text-center mb-md"
          style={{
            opacity: conclusionOpacity,
            transform: `translateY(${conclusionY}px)`,
          }}
        >
          <p className="text-title text-cream text-medium mb-xs">
            Something is hungry for our attention.
          </p>
          <p className="text-body text-sage text-italic">
            What is it?
          </p>
        </div>

        {/* Source links */}
        <div
          className="text-label text-dark text-center leading-relaxed"
          style={{ opacity: sourceOpacity }}
        >
          <span>Sources: </span>
          <a
            href="https://investor.fb.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--dark-olive)', textDecoration: 'underline' }}
          >
            Meta
          </a>
          {' | '}
          <a
            href="https://www.businessofapps.com/data/tiktok-statistics/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--dark-olive)', textDecoration: 'underline' }}
          >
            Business of Apps
          </a>
          {' | '}
          <a
            href="https://openai.com/blog/chatgpt"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--dark-olive)', textDecoration: 'underline' }}
          >
            OpenAI
          </a>
        </div>
      </div>
    </section>
  )
}
