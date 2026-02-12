import { lerp } from '../../../utils/animation'
import AutoScaleContent from '../../../components/AutoScaleContent'

interface PanelCybregoreInseparableProps {
  progress: number
}

export default function PanelCybregoreInseparable({ progress }: PanelCybregoreInseparableProps) {
  // Show how the 5 parts are inseparable - ALL 10 connections between 5 nodes

  const titleOpacity = lerp(progress, 0, 0.05, 0, 1)

  // All 10 connections appear sequentially (5 choose 2 = 10)
  const conn1Opacity = lerp(progress, 0.05, 0.12, 0, 1)
  const conn2Opacity = lerp(progress, 0.12, 0.19, 0, 1)
  const conn3Opacity = lerp(progress, 0.19, 0.26, 0, 1)
  const conn4Opacity = lerp(progress, 0.26, 0.33, 0, 1)
  const conn5Opacity = lerp(progress, 0.33, 0.40, 0, 1)
  const conn6Opacity = lerp(progress, 0.40, 0.47, 0, 1)
  const conn7Opacity = lerp(progress, 0.47, 0.54, 0, 1)
  const conn8Opacity = lerp(progress, 0.54, 0.61, 0, 1)
  const conn9Opacity = lerp(progress, 0.61, 0.68, 0, 1)
  const conn10Opacity = lerp(progress, 0.68, 0.75, 0, 1)

  const boundaryOpacity = lerp(progress, 0.78, 0.86, 0, 1)
  const boundaryY = lerp(progress, 0.78, 0.86, 15, 0)

  const organismOpacity = lerp(progress, 0.88, 0.96, 0, 1)
  const organismY = lerp(progress, 0.88, 0.96, 15, 0)

  // All 10 connections with explanations
  const connections = [
    { from: 'Users', to: 'Data', text: 'Users generate data through every interaction', opacity: conn1Opacity },
    { from: 'Developers', to: 'Data', text: 'Developers analyze data to decide what to build', opacity: conn2Opacity },
    { from: 'Software', to: 'Hardware', text: 'Software can only run on hardware', opacity: conn3Opacity },
    { from: 'Hardware', to: 'Software', text: 'Hardware is designed to run specific software', opacity: conn4Opacity },
    { from: 'Software', to: 'Users', text: 'Software exists to serve users', opacity: conn5Opacity },
    { from: 'Users', to: 'Developers', text: 'Users shape what developers create', opacity: conn6Opacity },
    { from: 'Developers', to: 'Software', text: 'Developers write the software', opacity: conn7Opacity },
    { from: 'Data', to: 'Hardware', text: 'Data is stored and processed by hardware', opacity: conn8Opacity },
    { from: 'Users', to: 'Hardware', text: 'Users interact through hardware devices', opacity: conn9Opacity },
    { from: 'Developers', to: 'Hardware', text: 'Developers optimize for hardware constraints', opacity: conn10Opacity },
  ]

  // Data in center, 4 nodes around the outside (square layout)
  // Users (top), Software (right), Hardware (bottom), Developers (left), Data (center)
  const nodes = [
    { id: 'Users', x: 50, y: 15 },
    { id: 'Software', x: 85, y: 50 },
    { id: 'Hardware', x: 50, y: 85 },
    { id: 'Developers', x: 15, y: 50 },
    { id: 'Data', x: 50, y: 50 },  // Center
  ]

  const getNodePos = (id: string) => nodes.find(n => n.id === id) || { x: 50, y: 50 }

  // All 10 unique line connections
  const lines = [
    { from: 'Users', to: 'Data', opacity: conn1Opacity },
    { from: 'Developers', to: 'Data', opacity: conn2Opacity },
    { from: 'Software', to: 'Hardware', opacity: Math.max(conn3Opacity, conn4Opacity) },
    { from: 'Software', to: 'Users', opacity: conn5Opacity },
    { from: 'Users', to: 'Developers', opacity: conn6Opacity },
    { from: 'Developers', to: 'Software', opacity: conn7Opacity },
    { from: 'Data', to: 'Hardware', opacity: conn8Opacity },
    { from: 'Users', to: 'Hardware', opacity: conn9Opacity },
    { from: 'Developers', to: 'Hardware', opacity: conn10Opacity },
    { from: 'Software', to: 'Data', opacity: conn7Opacity }, // Implicit: developers write software that processes data
  ]

  // Track which connection to show - either the one currently animating, or the most recent complete one
  const animatingIndex = connections.findIndex(c => c.opacity > 0 && c.opacity < 1)
  const lastCompleteIndex = connections.reduce((last, c, i) => c.opacity >= 1 ? i : last, -1)

  // Show the animating one if exists, otherwise show the last complete one (until all done)
  const activeIndex = animatingIndex >= 0 ? animatingIndex : (lastCompleteIndex >= 0 && lastCompleteIndex < 9 ? lastCompleteIndex : -1)
  const activeConnection = activeIndex >= 0 ? connections[activeIndex] : null

  return (
    <section className="panel panel--dark">
      <AutoScaleContent maxWidth="750px">
        <h2
          className="text-body text-cream text-bold text-center mb-sm"
          style={{
            opacity: titleOpacity,
          }}
        >
          Where does one part end and another begin?
        </h2>

        {/* Main content: diagram and current explanation */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(0.3rem, 0.7dvh, 0.5rem)',
        }}>
          {/* SVG Diagram - larger and centered */}
          <div style={{ width: '100%', maxWidth: '280px' }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: 'auto' }}>
              {/* All connection lines */}
              {lines.map((line, i) => {
                const fromPos = getNodePos(line.from)
                const toPos = getNodePos(line.to)
                const isActive = activeConnection &&
                  ((activeConnection.from === line.from && activeConnection.to === line.to) ||
                   (activeConnection.from === line.to && activeConnection.to === line.from))
                return (
                  <line
                    key={`line-${i}`}
                    x1={fromPos.x}
                    y1={fromPos.y}
                    x2={toPos.x}
                    y2={toPos.y}
                    stroke={isActive ? 'var(--accent-coral)' : 'var(--accent-coral)'}
                    strokeWidth={isActive ? '2' : '1.2'}
                    opacity={line.opacity * (isActive ? 1 : 0.5)}
                  />
                )
              })}

              {/* Node circles and labels */}
              {nodes.map((node) => {
                // Nodes always visible, but dimmed until title shows, then highlight when in active connection
                const isInActiveConnection = activeConnection &&
                  (activeConnection.from === node.id || activeConnection.to === node.id)
                // Base opacity: 0.3 dimmed, 1 when title shows
                const baseOpacity = titleOpacity > 0 ? Math.max(0.3, titleOpacity) : 0.3
                const nodeOpacity = isInActiveConnection ? 1 : baseOpacity
                return (
                  <g key={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="7"
                      fill="var(--deep-forest)"
                      stroke={isInActiveConnection ? 'var(--accent-coral)' : 'var(--sage)'}
                      strokeWidth={isInActiveConnection ? '2.5' : '1.5'}
                      opacity={nodeOpacity}
                    />
                    <text
                      x={node.x}
                      y={node.y + (node.y < 50 ? -11 : 16)}
                      fill={isInActiveConnection ? 'var(--accent-coral)' : 'var(--line-art-cream)'}
                      fontSize="6"
                      fontWeight={isInActiveConnection ? '700' : '500'}
                      textAnchor="middle"
                      opacity={nodeOpacity}
                    >
                      {node.id}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Current connection explanation - single card that updates */}
          <div style={{
            minHeight: 'clamp(45px, 7dvh, 60px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '400px',
          }}>
            {activeConnection ? (
              <div className="box-coral text-center">
                <p className="text-body text-cream leading-snug" style={{ margin: 0 }}>
                  <span className="text-coral">{activeConnection.from}</span>
                  {' ↔ '}
                  <span className="text-coral">{activeConnection.to}</span>
                  <br />
                  <span className="text-small text-sage">
                    {activeConnection.text}
                  </span>
                </p>
              </div>
            ) : conn10Opacity >= 1 ? (
              <p className="text-small text-sage text-center text-italic">
                All connected. Every part touches every other.
              </p>
            ) : null}
          </div>

          {/* Connection counter */}
          <div
            className="text-small text-olive text-center"
            style={{
              opacity: titleOpacity,
            }}
          >
            {Math.min(10, connections.filter(c => c.opacity >= 1).length)} / 10 connections
          </div>
        </div>

        {/* The boundary insight */}
        <p
          className="text-body text-sage text-center mt-md mb-sm leading-normal"
          style={{
            opacity: boundaryOpacity,
            transform: `translateY(${boundaryY}px)`,
          }}
        >
          Any "boundaries" between them are arbitrary.
        </p>

        {/* The organism conclusion */}
        <p
          className="text-title text-cream text-center leading-snug"
          style={{
            opacity: organismOpacity,
            transform: `translateY(${organismY}px)`,
          }}
        >
          They are <span className="text-coral">one organism</span>.
          <br />
          And you are part of it.
        </p>
      </AutoScaleContent>
    </section>
  )
}
