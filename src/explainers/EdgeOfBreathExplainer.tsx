import ScrollSection from '../components/ScrollSection'
import IntroSection from '../components/IntroSection'
import ScrollIndicator from '../components/ScrollIndicator'
import ContinueScrollIndicator from '../components/ContinueScrollIndicator'
import PanelAutoScaler from '../components/PanelAutoScaler'

// Act 1: The Invitation
import PanelWelcomeBreath from './edge-of-breath/panels/PanelWelcomeBreath'
import PanelYourBodyLaboratory from './edge-of-breath/panels/PanelYourBodyLaboratory'

// Act 2: The Breath
import PanelBreatheWithMe from './edge-of-breath/panels/PanelBreatheWithMe'
import PanelTheExhale from './edge-of-breath/panels/PanelTheExhale'

// Act 3: The Edge
import PanelTheEdge from './edge-of-breath/panels/PanelTheEdge'
import PanelCravingSings from './edge-of-breath/panels/PanelCravingSings'

// Act 4: The Recognition
import PanelDataAsBreath from './edge-of-breath/panels/PanelDataAsBreath'
import PanelNeverBreatheIn from './edge-of-breath/panels/PanelNeverBreatheIn'

// Act 5: The Hungry Ghost
import PanelHungryGhostRealm from './edge-of-breath/panels/PanelHungryGhostRealm'
import PanelTheLargestGhost from './edge-of-breath/panels/PanelTheLargestGhost'

// Act 6: The Doorway
import PanelTheFlip from './edge-of-breath/panels/PanelTheFlip'
import PanelBeyondYourself from './edge-of-breath/panels/PanelBeyondYourself'
import PanelTheBreathWasBreathing from './edge-of-breath/panels/PanelTheBreathWasBreathing'

// Act 7: The Return
import PanelPhoneAsMirror from './edge-of-breath/panels/PanelPhoneAsMirror'
import PanelYourDailyDoorway from './edge-of-breath/panels/PanelYourDailyDoorway'
import PanelTheSacredEdge from './edge-of-breath/panels/PanelTheSacredEdge'


export default function EdgeOfBreathExplainer() {
  return (
    <div className="app" style={{ overflowX: 'hidden', backgroundColor: 'var(--deep-forest)' }}>
      <PanelAutoScaler />
      <ScrollIndicator />
      <ContinueScrollIndicator
        delay={3000}
        messages={['Keep going', 'There\'s more', 'Continue', '↓']}
      />

      {/* === ACT 1: THE INVITATION === */}
      <IntroSection>
        <ScrollSection scrollLength={2.5}>
          {(progress) => <PanelWelcomeBreath progress={progress} />}
        </ScrollSection>
      </IntroSection>

      <ScrollSection scrollLength={3}>
        {(progress) => <PanelYourBodyLaboratory progress={progress} />}
      </ScrollSection>

      {/* === ACT 2: THE BREATH === */}
      <ScrollSection scrollLength={5}>
        {(progress) => <PanelBreatheWithMe progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={4}>
        {(progress) => <PanelTheExhale progress={progress} />}
      </ScrollSection>

      {/* === ACT 3: THE EDGE === */}
      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelTheEdge progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelCravingSings progress={progress} />}
      </ScrollSection>

      {/* === ACT 4: THE RECOGNITION === */}
      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelDataAsBreath progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelNeverBreatheIn progress={progress} />}
      </ScrollSection>

      {/* === ACT 5: THE HUNGRY GHOST === */}
      <ScrollSection scrollLength={4}>
        {(progress) => <PanelHungryGhostRealm progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelTheLargestGhost progress={progress} />}
      </ScrollSection>

      {/* === ACT 6: THE DOORWAY === */}
      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelTheFlip progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelBeyondYourself progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={4}>
        {(progress) => <PanelTheBreathWasBreathing progress={progress} />}
      </ScrollSection>

      {/* === ACT 7: THE RETURN === */}
      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelPhoneAsMirror progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelYourDailyDoorway progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelTheSacredEdge progress={progress} />}
      </ScrollSection>
    </div>
  )
}
