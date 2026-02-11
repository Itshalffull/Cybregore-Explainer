import ScrollSection from '../components/ScrollSection'
import IntroSection from '../components/IntroSection'
import ScrollIndicator from '../components/ScrollIndicator'
import ContinueScrollIndicator from '../components/ContinueScrollIndicator'
import PanelAutoScaler from '../components/PanelAutoScaler'

// Act 1: The Provocation
import PanelYouAreInACult from './suicide-cult/panels/PanelYouAreInACult'
import PanelBuyNowSacrament from './suicide-cult/panels/PanelBuyNowSacrament'

// Act 2: The Evidence
import PanelExtinctionData from './suicide-cult/panels/PanelExtinctionData'
import PanelFourHorsemen from './suicide-cult/panels/PanelFourHorsemen'
import PanelTechnologyAccelerates from './suicide-cult/panels/PanelTechnologyAccelerates'

// Act 3: The Naming
import PanelThisIsACult from './suicide-cult/panels/PanelThisIsACult'
import PanelTheInvisibleLeader from './suicide-cult/panels/PanelTheInvisibleLeader'

// Act 4: The Anatomy
import PanelCultAnatomy from './suicide-cult/panels/PanelCultAnatomy'
import PanelNoExit from './suicide-cult/panels/PanelNoExit'

// Act 5: The Escalation
import PanelNuclear from './suicide-cult/panels/PanelNuclear'
import PanelBioweapons from './suicide-cult/panels/PanelBioweapons'
import PanelAiAcceleration from './suicide-cult/panels/PanelAiAcceleration'

// Act 6: The Flip
import PanelYouAreTheCultMember from './suicide-cult/panels/PanelYouAreTheCultMember'
import PanelNormalIsExtreme from './suicide-cult/panels/PanelNormalIsExtreme'
import PanelNoMoralStanding from './suicide-cult/panels/PanelNoMoralStanding'

// Act 7: The Mythology
import PanelMolochTheDemon from './suicide-cult/panels/PanelMolochTheDemon'
import PanelPossessedCivilization from './suicide-cult/panels/PanelPossessedCivilization'

// Act 8: The Way Out
import PanelWeEscaped from './suicide-cult/panels/PanelWeEscaped'
import PanelTheMonastery from './suicide-cult/panels/PanelTheMonastery'
import PanelLeaveTheCult from './suicide-cult/panels/PanelLeaveTheCult'


export default function SuicideCultExplainer() {
  return (
    <div className="app" style={{ overflowX: 'hidden', backgroundColor: 'var(--deep-forest)' }}>
      <PanelAutoScaler />
      <ScrollIndicator />
      <ContinueScrollIndicator
        delay={3000}
        messages={['Keep going', 'There\'s more', 'Continue', '↓']}
      />

      {/* === ACT 1: THE PROVOCATION === */}
      <IntroSection>
        <ScrollSection scrollLength={2}>
          {(progress) => <PanelYouAreInACult progress={progress} />}
        </ScrollSection>
      </IntroSection>

      <ScrollSection scrollLength={3}>
        {(progress) => <PanelBuyNowSacrament progress={progress} />}
      </ScrollSection>

      {/* === ACT 2: THE EVIDENCE === */}
      <ScrollSection scrollLength={4}>
        {(progress) => <PanelExtinctionData progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={4.5}>
        {(progress) => <PanelFourHorsemen progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={4}>
        {(progress) => <PanelTechnologyAccelerates progress={progress} />}
      </ScrollSection>

      {/* === ACT 3: THE NAMING === */}
      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelThisIsACult progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelTheInvisibleLeader progress={progress} />}
      </ScrollSection>

      {/* === ACT 4: THE ANATOMY === */}
      <ScrollSection scrollLength={4}>
        {(progress) => <PanelCultAnatomy progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3}>
        {(progress) => <PanelNoExit progress={progress} />}
      </ScrollSection>

      {/* === ACT 5: THE ESCALATION === */}
      <ScrollSection scrollLength={3}>
        {(progress) => <PanelNuclear progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3}>
        {(progress) => <PanelBioweapons progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelAiAcceleration progress={progress} />}
      </ScrollSection>

      {/* === ACT 6: THE FLIP === */}
      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelYouAreTheCultMember progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelNormalIsExtreme progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelNoMoralStanding progress={progress} />}
      </ScrollSection>

      {/* === ACT 7: THE MYTHOLOGY === */}
      <ScrollSection scrollLength={4}>
        {(progress) => <PanelMolochTheDemon progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelPossessedCivilization progress={progress} />}
      </ScrollSection>

      {/* === ACT 8: THE WAY OUT === */}
      <ScrollSection scrollLength={3}>
        {(progress) => <PanelWeEscaped progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelTheMonastery progress={progress} />}
      </ScrollSection>

      <ScrollSection scrollLength={3.5}>
        {(progress) => <PanelLeaveTheCult progress={progress} />}
      </ScrollSection>
    </div>
  )
}
