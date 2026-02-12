import ScrollSection from '../components/ScrollSection'
import IntroSection from '../components/IntroSection'
import ScrollIndicator from '../components/ScrollIndicator'
import ContinueScrollIndicator from '../components/ContinueScrollIndicator'
import PanelAutoScaler from '../components/PanelAutoScaler'

// Opening hook
import Panel1Setup from './cybregore/panels/Panel1Setup'

// Data explosion visualizations
import PanelDataExplosion from './cybregore/panels/PanelDataExplosion'
import PanelAppAdoption from './cybregore/panels/PanelAppAdoption'

// Cybregore etymology - explaining the portmanteau
import PanelSomethingEmerges from './cybregore/panels/PanelSomethingEmerges'
import PanelCyborg from './cybregore/panels/PanelCyborg'
import PanelEgregore from './cybregore/panels/PanelEgregore'

// Cybregore deep dive
import Panel13CybregoreIntro from './cybregore/panels/Panel13CybregoreIntro'
import PanelCybregoreAnatomy from './cybregore/panels/PanelCybregoreAnatomy'
import PanelCybregoreInseparable from './cybregore/panels/PanelCybregoreInseparable'
import PanelCybregoreHunger from './cybregore/panels/PanelCybregoreHunger'
import PanelBreathingExercise from './cybregore/panels/PanelBreathingExercise'
import PanelHungryGhost from './cybregore/panels/PanelHungryGhost'
import Panel15CybregoreReads from './cybregore/panels/Panel15CybregoreReads'
import Panel16CybregoreWrites from './cybregore/panels/Panel16CybregoreWrites'
import Panel17CybregoreCorrelates from './cybregore/panels/Panel17CybregoreCorrelates'
import PanelWhatNow from './cybregore/panels/PanelWhatNow'


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
        <ScrollSection scrollLength={2} panelId="panel-1-setup">
          {(progress) => <Panel1Setup progress={progress} />}
        </ScrollSection>
      </IntroSection>

      {/* === DATA EXPLOSION VISUALIZATIONS === */}

      <ScrollSection scrollLength={4} panelId="panel-data-explosion">
        {(progress) => <PanelDataExplosion progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={4.5} panelId="panel-app-adoption">
        {(progress) => <PanelAppAdoption progress={progress} />}
      </ScrollSection>

      {/* === CYBREGORE ETYMOLOGY === */}

      <ScrollSection scrollLength={2.5} panelId="panel-something-emerges">
        {(progress) => <PanelSomethingEmerges progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3} panelId="panel-cyborg">
        {(progress) => <PanelCyborg progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3} panelId="panel-egregore">
        {(progress) => <PanelEgregore progress={progress} />}
      </ScrollSection>

      {/* === CYBREGORE DEEP DIVE === */}

      <ScrollSection scrollLength={3} panelId="panel-cybregore-intro">
        {(progress) => <Panel13CybregoreIntro progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={4} panelId="panel-cybregore-anatomy">
        {(progress) => <PanelCybregoreAnatomy progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={4} panelId="panel-cybregore-inseparable">
        {(progress) => <PanelCybregoreInseparable progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={4} panelId="panel-cybregore-hunger">
        {(progress) => <PanelCybregoreHunger progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={5} panelId="panel-breathing-exercise">
        {(progress) => <PanelBreathingExercise progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5} panelId="panel-hungry-ghost">
        {(progress) => <PanelHungryGhost progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5} panelId="panel-cybregore-reads">
        {(progress) => <Panel15CybregoreReads progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5} panelId="panel-cybregore-writes">
        {(progress) => <Panel16CybregoreWrites progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5} panelId="panel-cybregore-correlates">
        {(progress) => <Panel17CybregoreCorrelates progress={progress} />}
      </ScrollSection>

      {/* === CALL TO ACTION === */}

      <ScrollSection scrollLength={3.5} panelId="panel-what-now">
        {(progress) => <PanelWhatNow progress={progress} />}
      </ScrollSection>
    </div>
  )
}
