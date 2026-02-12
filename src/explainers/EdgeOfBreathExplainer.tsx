import ScrollSection from '../components/ScrollSection'
import IntroSection from '../components/IntroSection'
import ScrollIndicator from '../components/ScrollIndicator'
import ContinueScrollIndicator from '../components/ContinueScrollIndicator'
import PanelAutoScaler from '../components/PanelAutoScaler'

// Act 1: The Invitation
import PanelWelcomeBreath from './edge-of-breath/panels/PanelWelcomeBreath'
// PanelYourBodyLaboratory removed

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
// PanelTheBreathWasBreathing removed

// Act 7: The Return
// PanelPhoneAsMirror removed
import PanelYourDailyDoorway from './edge-of-breath/panels/PanelYourDailyDoorway'
import PanelDataDoorway from './edge-of-breath/panels/PanelDataDoorway'


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
        <ScrollSection scrollLength={2.5} panelId="panel-welcome-breath">
          {(progress) => <PanelWelcomeBreath progress={progress} />}
        </ScrollSection>
      </IntroSection>

      {/* === ACT 2: THE BREATH === */}
      <ScrollSection scrollLength={5} panelId="panel-breathe-with-me">
        {(progress) => <PanelBreatheWithMe progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={4} panelId="panel-the-exhale">
        {(progress) => <PanelTheExhale progress={progress} />}
      </ScrollSection>

      {/* === ACT 3: THE EDGE === */}
      <ScrollSection scrollLength={3.5} panelId="panel-the-edge">
        {(progress) => <PanelTheEdge progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5} panelId="panel-craving-sings">
        {(progress) => <PanelCravingSings progress={progress} />}
      </ScrollSection>

      {/* === ACT 4: THE RECOGNITION === */}
      <ScrollSection scrollLength={3.5} panelId="panel-data-as-breath">
        {(progress) => <PanelDataAsBreath progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5} panelId="panel-never-breathe-in">
        {(progress) => <PanelNeverBreatheIn progress={progress} />}
      </ScrollSection>

      {/* === ACT 5: THE HUNGRY GHOST === */}
      <ScrollSection scrollLength={4} panelId="panel-hungry-ghost-realm">
        {(progress) => <PanelHungryGhostRealm progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5} panelId="panel-the-largest-ghost">
        {(progress) => <PanelTheLargestGhost progress={progress} />}
      </ScrollSection>

      {/* === ACT 6: THE DOORWAY === */}
      <ScrollSection scrollLength={3.5} panelId="panel-the-flip">
        {(progress) => <PanelTheFlip progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5} panelId="panel-beyond-yourself">
        {(progress) => <PanelBeyondYourself progress={progress} />}
      </ScrollSection>

      {/* === ACT 7: THE RETURN === */}
      <ScrollSection scrollLength={3.5} panelId="panel-your-daily-doorway">
        {(progress) => <PanelYourDailyDoorway progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={4} panelId="panel-data-doorway">
        {(progress) => <PanelDataDoorway progress={progress} />}
      </ScrollSection>

    </div>
  )
}
