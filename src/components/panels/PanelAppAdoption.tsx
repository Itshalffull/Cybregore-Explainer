import { lerp } from '../../utils/animation'

interface PanelAppAdoptionProps {
  progress: number
}

interface AppData {
  name: string
  launchYear: number
  reached100MYear: number
  days: number
  color: string
  timeLabel: string
}

export default function PanelAppAdoption({ progress }: PanelAppAdoptionProps) {
  // Show how fast platforms reached 100M users - with timeline context

  const titleOpacity = lerp(progress, 0, 0.08, 0, 1)
  const subtitleOpacity = lerp(progress, 0.05, 0.13, 0, 1)
  const timelineOpacity = lerp(progress, 0.1, 0.18, 0, 1)

  // Each app appears sequentially
  const app1Opacity = lerp(progress, 0.15, 0.24, 0, 1) // Facebook
  const app2Opacity = lerp(progress, 0.22, 0.31, 0, 1) // Twitter
  const app3Opacity = lerp(progress, 0.29, 0.38, 0, 1) // Instagram
  const app4Opacity = lerp(progress, 0.36, 0.45, 0, 1) // WeChat
  const app5Opacity = lerp(progress, 0.43, 0.52, 0, 1) // TikTok
  const app6Opacity = lerp(progress, 0.5, 0.62, 0, 1)  // ChatGPT
  const app7Opacity = lerp(progress, 0.6, 0.72, 0, 1)  // Threads

  const highlightOpacity = lerp(progress, 0.74, 0.84, 0, 1)
  const conclusionOpacity = lerp(progress, 0.85, 0.94, 0, 1)
  const conclusionY = lerp(progress, 0.85, 0.94, 15, 0)
  const sourceOpacity = lerp(progress, 0.9, 0.98, 0, 1)

  const apps: AppData[] = [
    { name: 'Facebook', launchYear: 2004, reached100MYear: 2008, days: 1825, color: '#4267B2', timeLabel: '~5 years' },
    { name: 'Twitter', launchYear: 2006, reached100MYear: 2011, days: 1750, color: '#1DA1F2', timeLabel: '~5 years' },
    { name: 'Instagram', launchYear: 2010, reached100MYear: 2013, days: 912, color: '#E4405F', timeLabel: '~2.5 years' },
    { name: 'WeChat', launchYear: 2011, reached100MYear: 2012, days: 433, color: '#7BB32E', timeLabel: '~14 months' },
    { name: 'TikTok', launchYear: 2017, reached100MYear: 2018, days: 270, color: '#FF0050', timeLabel: '~9 months' },
    { name: 'ChatGPT', launchYear: 2022, reached100MYear: 2023, days: 60, color: '#10A37F', timeLabel: '~2 months' },
    { name: 'Threads', launchYear: 2023, reached100MYear: 2023, days: 5, color: '#000000', timeLabel: '5 days' },
  ]

  const appOpacities = [app1Opacity, app2Opacity, app3Opacity, app4Opacity, app5Opacity, app6Opacity, app7Opacity]

  // Timeline spans 2004-2024
  const startYear = 2004
  const endYear = 2024
  const totalYears = endYear - startYear

  // Reserve left space for app name labels (percentage of container width)
  const labelWidth = 22

  // Calculate position on timeline, offset by label area
  const getYearPosition = (year: number) => labelWidth + ((year - startYear) / totalYears) * (100 - labelWidth)

  return (
    <section className="panel panel--dark">
      <div className="panel-body panel-body--wide">
        <h2
          className="text-heading text-cream text-bold text-center mb-xs"
          style={{
            opacity: titleOpacity,
          }}
        >
          Time to Reach 100 Million Users
        </h2>

        <p
          className="text-body-lg text-sage text-center mb-lg"
          style={{
            opacity: subtitleOpacity,
          }}
        >
          How fast they capture us
        </p>

        {/* Timeline visualization */}
        <div style={{ position: 'relative', marginBottom: 'clamp(0.5rem, 1.5dvh, 1.25rem)', padding: '0 0.5rem' }}>
          {/* Timeline axis */}
          <div
            style={{
              opacity: timelineOpacity,
              position: 'relative',
              height: 'clamp(25px, 4dvh, 35px)',
              marginBottom: 'clamp(0.4rem, 0.8dvh, 0.6rem)',
            }}
          >
            {/* Timeline line */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: `${labelWidth}%`,
                right: 0,
                height: '2px',
                background: 'var(--dark-olive)',
              }}
            />
            {/* Year markers */}
            {[2004, 2008, 2012, 2016, 2020, 2024].map((year) => (
              <div
                key={year}
                style={{
                  position: 'absolute',
                  left: `${getYearPosition(year)}%`,
                  transform: 'translateX(-50%)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '2px',
                    height: '10px',
                    background: 'var(--dark-olive)',
                    margin: '0 auto 4px',
                  }}
                />
                <span className="text-label text-sage">
                  {year}
                </span>
              </div>
            ))}
          </div>

          {/* Apps on timeline */}
          <div style={{ position: 'relative', minHeight: 'clamp(180px, 32dvh, 260px)' }}>
            {apps.map((app, index) => {
              const launchPos = getYearPosition(app.launchYear)
              const reachedPos = getYearPosition(app.reached100MYear)
              const isRecent = app.days <= 60
              const rowHeight = typeof window !== 'undefined' && window.innerHeight < 700 ? 30 : 36

              return (
                <div
                  key={app.name}
                  style={{
                    opacity: appOpacities[index],
                    position: 'absolute',
                    top: `${index * rowHeight}px`,
                    left: 0,
                    right: 0,
                    height: `${rowHeight}px`,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {/* App name label - positioned within the reserved left area */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      width: `${labelWidth}%`,
                      textAlign: 'right',
                      paddingRight: '6px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    <span
                      className="text-label"
                      style={{
                        color: isRecent ? 'var(--accent-coral)' : 'var(--line-art-cream)',
                        fontWeight: isRecent ? 600 : 400,
                      }}
                    >
                      {app.name}
                    </span>
                  </div>

                  {/* Timeline bar from launch to 100M */}
                  <div
                    style={{
                      position: 'absolute',
                      left: `${launchPos}%`,
                      width: `${Math.max(reachedPos - launchPos, 0.5)}%`,
                      height: 'clamp(12px, 2dvh, 16px)',
                      background: isRecent
                        ? 'linear-gradient(90deg, var(--accent-coral), var(--accent-coral))'
                        : `linear-gradient(90deg, ${app.color}88, ${app.color})`,
                      borderRadius: '3px',
                      boxShadow: isRecent ? '0 0 8px var(--accent-coral)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '4px',
                    }}
                  >
                    {/* Duration label inside bar if it fits, otherwise outside */}
                    {(reachedPos - launchPos) > 8 && (
                      <span
                        className="text-label text-medium"
                        style={{
                          color: '#fff',
                          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                        }}
                      >
                        {app.timeLabel}
                      </span>
                    )}
                  </div>

                  {/* Duration label outside bar for short bars */}
                  {(reachedPos - launchPos) <= 8 && (
                    <span
                      className="text-label"
                      style={{
                        position: 'absolute',
                        left: `${reachedPos + 1}%`,
                        color: isRecent ? 'var(--accent-coral)' : 'var(--sage)',
                        fontWeight: isRecent ? 600 : 400,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {app.timeLabel}
                    </span>
                  )}

                  {/* Launch dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: `${launchPos}%`,
                      transform: 'translateX(-50%)',
                      width: 'clamp(5px, 0.8dvh, 7px)',
                      height: 'clamp(5px, 0.8dvh, 7px)',
                      borderRadius: '50%',
                      background: isRecent ? 'var(--accent-coral)' : app.color,
                      border: '2px solid var(--deep-forest)',
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Dramatic highlight */}
        <div
          className="box-coral text-center mb-lg"
          style={{
            opacity: highlightOpacity,
          }}
        >
          <p className="text-body-lg text-cream mb-xs">
            From <strong>5 years</strong> to <strong className="text-coral">5 days</strong>.
          </p>
          <p className="text-body-lg text-sage">
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
          <p className="text-subheading text-cream text-medium mb-xs">
            Something is hungry for our attention.
          </p>
          <p className="text-body-lg text-sage text-italic">
            What is it?
          </p>
        </div>

        {/* Source links */}
        <div
          className="text-label text-dark text-center leading-relaxed"
          style={{
            opacity: sourceOpacity,
          }}
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
