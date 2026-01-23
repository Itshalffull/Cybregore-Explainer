import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { lerp, lerpMulti } from '../../utils/animation'

const THOUGHT_WORDS = [
  'wait', 'am I', "don't", 'think', 'almost', 'no', 'stop',
  "I'm doing it", 'focus', 'breathe', 'quiet', 'silence',
  'trying', 'harder', 'relax', 'empty', 'nothing', 'words'
]

interface FloatingWord {
  id: number
  text: string
  x: number
  y: number
  fontSize: number
}

// AI-generated head profile image
const HeadImage = () => (
  <img
    src="/assets/images/head-profile.png"
    alt="Human head profile"
    style={{
      width: '100%',
      height: '100%',
      maxWidth: '350px',
      maxHeight: '450px',
      objectFit: 'contain'
    }}
  />
)

interface Panel3LanguageProps {
  progress: number
}

export default function Panel3Language({ progress }: Panel3LanguageProps) {
  const [words, setWords] = useState<FloatingWord[]>([])
  const nextWordIdRef = useRef(0)
  const lastWordCountRef = useRef(0)

  // Map scroll progress to phases
  // 0-0.1: Challenge text appears
  // 0.1-0.6: Timer counts down, words appear
  // 0.6-0.8: Conclusion phase
  // 0.8-1.0: Scroll hint

  const challengeOpacity = lerp(progress, 0, 0.1, 0, 1)
  const timerOpacity = lerpMulti(progress, [0.1, 0.15, 0.55, 0.6], [0, 1, 1, 0])

  // Timer value from 10 to 0 based on scroll progress (0.15 to 0.55)
  const timerValue = lerp(progress, 0.15, 0.55, 10, 0)
  const displayTimer = Math.ceil(Math.max(0, timerValue))

  // Conclusion appears after timer
  const conclusionOpacity = lerp(progress, 0.6, 0.7, 0, 1)
  const scrollHintOpacity = lerp(progress, 0.8, 0.9, 0, 0.6)

  // Challenge fade out
  const challengeFadeOut = lerp(progress, 0.6, 0.65, 1, 0)

  // SVG circle progress (circumference is ~352 for r=56)
  const circleProgress = lerp(timerValue, 10, 0, 352, 0)

  // Add words as scroll progresses
  useEffect(() => {
    // Only add words during the timer phase
    if (progress >= 0.15 && progress <= 0.6) {
      const wordCount = Math.floor((progress - 0.15) * 30)
      if (wordCount > lastWordCountRef.current) {
        const text = THOUGHT_WORDS[Math.floor(Math.random() * THOUGHT_WORDS.length)]
        const x = 20 + Math.random() * 60
        const y = 15 + Math.random() * 70
        const fontSize = 0.8 + Math.random() * 0.4

        setWords((prevWords) => {
          const newWords = [...prevWords, { id: nextWordIdRef.current++, text, x, y, fontSize }]
          return newWords.slice(-15)
        })
        lastWordCountRef.current = wordCount
      }
    }

    // Clear words when scrolling back
    if (progress < 0.15 && words.length > 0) {
      setWords([])
      lastWordCountRef.current = 0
    }
  }, [progress, words.length])

  return (
    <section
      className="panel"
      style={{
        display: 'flex',
        height: '100vh',
        minHeight: '100vh',
        padding: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div className="split-panel" style={{ display: 'flex', width: '100%', height: '100%' }}>
        {/* Left side - Light */}
        <div
          className="split-panel__left"
          style={{
            backgroundColor: 'var(--sage)',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '400px', textAlign: 'center', position: 'relative' }}>
            {/* Challenge text - always visible during timer */}
            <div style={{ opacity: challengeFadeOut }}>
              <h2
                className="heading heading-lg"
                style={{ opacity: challengeOpacity }}
              >
                Try this.
              </h2>

              <p
                className="body-lg mt-md"
                style={{ opacity: challengeOpacity }}
              >
                Stop thinking in words.
              </p>

              <p
                className="body-md mt-sm"
                style={{ opacity: challengeOpacity * 0.8 }}
              >
                Just for 10 seconds.
              </p>

              {/* Timer */}
              <div
                className="mt-xl"
                style={{ opacity: timerOpacity }}
              >
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    border: '3px solid var(--dark-olive)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    position: 'relative',
                  }}
                >
                  <svg
                    width="120"
                    height="120"
                    style={{ position: 'absolute', transform: 'rotate(-90deg)' }}
                  >
                    <circle
                      cx="60"
                      cy="60"
                      r="56"
                      fill="none"
                      stroke="var(--dark-olive)"
                      strokeWidth="3"
                      strokeDasharray={circleProgress}
                    />
                  </svg>
                  <span
                    className="heading"
                    style={{ fontSize: '3rem', color: 'var(--heading-color)' }}
                  >
                    {displayTimer}
                  </span>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                maxWidth: '400px',
                opacity: conclusionOpacity,
              }}
            >
              <h2 className="heading heading-lg">
                There's something running in your mind.
              </h2>

              <p className="body-lg mt-md">
                You can't turn it off.
              </p>

              <p
                className="body-md mt-xl"
                style={{ opacity: scrollHintOpacity }}
              >
                ↓ Keep scrolling
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Dark with head illustration */}
        <div
          className="split-panel__right"
          style={{
            backgroundColor: 'var(--dark-olive)',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '80%', maxWidth: '350px' }}>
            <HeadImage />

            {/* Floating words inside the head */}
            <div
              style={{
                position: 'absolute',
                top: '10%',
                left: '15%',
                width: '70%',
                height: '75%',
                overflow: 'hidden',
              }}
            >
              <AnimatePresence>
                {words.map((word) => (
                  <motion.span
                    key={word.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: [0, 0.7, 0.5],
                      scale: 1,
                      y: [0, -10, 0],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                    style={{
                      position: 'absolute',
                      left: `${word.x}%`,
                      top: `${word.y}%`,
                      color: 'var(--line-art-cream)',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: `${word.fontSize}rem`,
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                    }}
                  >
                    {word.text}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
