import ScrollSection from '../components/ScrollSection'
import IntroSection from '../components/IntroSection'
import ScrollIndicator from '../components/ScrollIndicator'
import ContinueScrollIndicator from '../components/ContinueScrollIndicator'
import PanelAutoScaler from '../components/PanelAutoScaler'

// Act 1: The Hook
import PanelFlipItHook from './good-intentions-demon/panels/PanelFlipItHook'

// Act 2: The First Fall (Silicon Valley)
import PanelBuildToHelp from './good-intentions-demon/panels/PanelBuildToHelp'
import PanelSiliconValleyFail from './good-intentions-demon/panels/PanelSiliconValleyFail'

// Act 3: The Deeper Fall (EA)
import PanelEaPromise from './good-intentions-demon/panels/PanelEaPromise'
import PanelEaCorruption from './good-intentions-demon/panels/PanelEaCorruption'

// Act 4: The Deepest Fall (Rationalism)
import PanelRationalistMind from './good-intentions-demon/panels/PanelRationalistMind'
import PanelYudkowskiParadox from './good-intentions-demon/panels/PanelYudkowskiParadox'

// Act 5: The Pattern Revealed
import PanelThreeFalls from './good-intentions-demon/panels/PanelThreeFalls'
import PanelWhatIsThis from './good-intentions-demon/panels/PanelWhatIsThis'

// Act 6: The Demon Named
import PanelHelpingMindDemon from './good-intentions-demon/panels/PanelHelpingMindDemon'
import PanelMolochBridge from './good-intentions-demon/panels/PanelMolochBridge'

// Act 7: The Mirror
import PanelYouAreTheDemon from './good-intentions-demon/panels/PanelYouAreTheDemon'

// Act 8: The Alternative
import PanelMonasteryLaboratory from './good-intentions-demon/panels/PanelMonasteryLaboratory'
import PanelWisdomAcceleration from './good-intentions-demon/panels/PanelWisdomAcceleration'

// Act 9: The Call
import PanelTheCall from './good-intentions-demon/panels/PanelTheCall'


export default function GoodIntentionsDemonExplainer() {
  return (
    <div className="app" style={{ overflowX: 'hidden', backgroundColor: 'var(--deep-forest)' }}>
      <PanelAutoScaler />
      <ScrollIndicator />
      <ContinueScrollIndicator
        delay={3000}
        messages={['Keep going', 'There\'s more', 'Continue', '↓']}
      />

      {/* === ACT 1: THE HOOK === */}
      <IntroSection>
        <ScrollSection scrollLength={2}>
          {(progress) => <PanelFlipItHook progress={progress} />}
        </ScrollSection>
      </IntroSection>

      {/* === ACT 2: THE FIRST FALL (SILICON VALLEY) === */}
      <ScrollSection scrollLength={3}>
        {(progress) => <PanelBuildToHelp progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3}>
        {(progress) => <PanelSiliconValleyFail progress={progress} />}
      </ScrollSection>

      {/* === ACT 3: THE DEEPER FALL (EA) === */}
      <ScrollSection scrollLength={3}>
        {(progress) => <PanelEaPromise progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelEaCorruption progress={progress} />}
      </ScrollSection>

      {/* === ACT 4: THE DEEPEST FALL (RATIONALISM) === */}
      <ScrollSection scrollLength={3}>
        {(progress) => <PanelRationalistMind progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelYudkowskiParadox progress={progress} />}
      </ScrollSection>

      {/* === ACT 5: THE PATTERN REVEALED === */}
      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelThreeFalls progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={2.5}>
        {(progress) => <PanelWhatIsThis progress={progress} />}
      </ScrollSection>

      {/* === ACT 6: THE DEMON NAMED === */}
      <ScrollSection scrollLength={4}>
        {(progress) => <PanelHelpingMindDemon progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelMolochBridge progress={progress} />}
      </ScrollSection>

      {/* === ACT 7: THE MIRROR === */}
      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelYouAreTheDemon progress={progress} />}
      </ScrollSection>

      {/* === ACT 8: THE ALTERNATIVE === */}
      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelMonasteryLaboratory progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelWisdomAcceleration progress={progress} />}
      </ScrollSection>

      {/* === ACT 9: THE CALL === */}
      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelTheCall progress={progress} />}
      </ScrollSection>
    </div>
  )
}
