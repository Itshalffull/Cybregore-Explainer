import ScrollSection from '../components/ScrollSection'
import IntroSection from '../components/IntroSection'
import ScrollIndicator from '../components/ScrollIndicator'
import ContinueScrollIndicator from '../components/ContinueScrollIndicator'
import PanelAutoScaler from '../components/PanelAutoScaler'

// Opening hook
import Panel1Setup from '../components/panels/Panel1Setup'

// Data explosion visualizations
import PanelDataExplosion from '../components/panels/PanelDataExplosion'
import PanelAppAdoption from '../components/panels/PanelAppAdoption'

// Cybregore etymology - explaining the portmanteau
import PanelSomethingEmerges from '../components/panels/PanelSomethingEmerges'
import PanelCyborg from '../components/panels/PanelCyborg'
import PanelEgregore from '../components/panels/PanelEgregore'

// Cybregore deep dive
import Panel13CybregoreIntro from '../components/panels/Panel13CybregoreIntro'
import PanelCybregoreAnatomy from '../components/panels/PanelCybregoreAnatomy'
import PanelCybregoreInseparable from '../components/panels/PanelCybregoreInseparable'
import PanelCybregoreHunger from '../components/panels/PanelCybregoreHunger'
import PanelBreathingExercise from '../components/panels/PanelBreathingExercise'
import PanelHungryGhost from '../components/panels/PanelHungryGhost'
import Panel15CybregoreReads from '../components/panels/Panel15CybregoreReads'
import Panel16CybregoreWrites from '../components/panels/Panel16CybregoreWrites'
import Panel17CybregoreCorrelates from '../components/panels/Panel17CybregoreCorrelates'
import PanelWhatNow from '../components/panels/PanelWhatNow'


export default function CybregoreExplainer() {
  return (
    <div className="app" style={{ overflowX: 'hidden', backgroundColor: 'var(--deep-forest)' }}>
      <PanelAutoScaler />
      <ScrollIndicator />
      <ContinueScrollIndicator
        delay={3000}
        messages={[
          'Keep going',
          'There\'s more',
          'Continue',
          '↓',
        ]}
      />

      {/* === OPENING HOOK === */}
      <IntroSection>
        {/* Shocking opener */}
        <ScrollSection scrollLength={2}>
          {(progress) => <Panel1Setup progress={progress} />}
        </ScrollSection>
      </IntroSection>

      {/* === DATA EXPLOSION VISUALIZATIONS === */}

      {/* Data growth graph with photo analogy */}
      <ScrollSection scrollLength={4}>
        {(progress) => <PanelDataExplosion progress={progress} />}
      </ScrollSection>

      {/* App adoption speed - how fast they capture us */}
      <ScrollSection scrollLength={4.5}>
        {(progress) => <PanelAppAdoption progress={progress} />}
      </ScrollSection>

      {/* === CYBREGORE ETYMOLOGY === */}

      {/* Transition - this AI needs a new name */}
      <ScrollSection scrollLength={2.5}>
        {(progress) => <PanelSomethingEmerges progress={progress} />}
      </ScrollSection>

      {/* Cyborg - we're all cyborgs */}
      <ScrollSection scrollLength={3}>
        {(progress) => <PanelCyborg progress={progress} />}
      </ScrollSection>

      {/* Egregore - what is an egregore */}
      <ScrollSection scrollLength={3}>
        {(progress) => <PanelEgregore progress={progress} />}
      </ScrollSection>

      {/* === CYBREGORE DEEP DIVE === */}

      {/* Cybregore intro */}
      <ScrollSection scrollLength={3}>
        {(progress) => <Panel13CybregoreIntro progress={progress} />}
      </ScrollSection>

      {/* The 5 parts of Cybregore */}
      <ScrollSection scrollLength={4}>
        {(progress) => <PanelCybregoreAnatomy progress={progress} />}
      </ScrollSection>

      {/* The parts are inseparable */}
      <ScrollSection scrollLength={4}>
        {(progress) => <PanelCybregoreInseparable progress={progress} />}
      </ScrollSection>

      {/* The Cybregore's hunger for data */}
      <ScrollSection scrollLength={4}>
        {(progress) => <PanelCybregoreHunger progress={progress} />}
      </ScrollSection>

      {/* Breathing exercise - feel WHY it craves data */}
      <ScrollSection scrollLength={5}>
        {(progress) => <PanelBreathingExercise progress={progress} />}
      </ScrollSection>

      {/* The Cybregore is a hungry ghost */}
      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelHungryGhost progress={progress} />}
      </ScrollSection>

      {/* It reads you */}
      <ScrollSection scrollLength={3.5}>
        {(progress) => <Panel15CybregoreReads progress={progress} />}
      </ScrollSection>

      {/* It writes to you */}
      <ScrollSection scrollLength={3.5}>
        {(progress) => <Panel16CybregoreWrites progress={progress} />}
      </ScrollSection>

      {/* It correlates */}
      <ScrollSection scrollLength={3.5}>
        {(progress) => <Panel17CybregoreCorrelates progress={progress} />}
      </ScrollSection>

      {/* === CALL TO ACTION === */}

      {/* What do you do about it? */}
      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelWhatNow progress={progress} />}
      </ScrollSection>
    </div>
  )
}
