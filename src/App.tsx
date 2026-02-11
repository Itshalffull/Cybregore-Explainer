import ExplainerRouter from './components/ExplainerRouter'
import JumpBreadcrumbs from './components/JumpBreadcrumbs'
import CybregoreExplainer from './explainers/CybregoreExplainer'
import cybregoreMetadata from './explainers/cybregore-metadata'
import ExampleExplainer from './explainers/ExampleExplainer'
import exampleMetadata from './explainers/example-metadata'
import GoodIntentionsDemonExplainer from './explainers/GoodIntentionsDemonExplainer'
import goodIntentionsDemonMetadata from './explainers/good-intentions-demon-metadata'
import SuicideCultExplainer from './explainers/SuicideCultExplainer'
import suicideCultMetadata from './explainers/suicide-cult-metadata'
import EdgeOfBreathExplainer from './explainers/EdgeOfBreathExplainer'
import edgeOfBreathMetadata from './explainers/edge-of-breath-metadata'

/**
 * App root — wraps all explainers in the ExplainerRouter.
 *
 * To add a new explainer:
 * 1. Create a component in src/explainers/YourExplainer.tsx
 * 2. Create metadata in src/explainers/your-metadata.ts
 * 3. Add it to the explainers object below
 * 4. Use <JumpLink to="your-id" label="..." /> in any panel to link to it
 *
 * Stubs: Register metadata without content to plan future explainers.
 * Stubs are invisible to users, logged in dev console, and available
 * via useStubExplainers(). They go live the moment you add content.
 */
function App() {
  return (
    <ExplainerRouter
      defaultExplainer="cybregore"
      explainers={{
        cybregore: {
          title: 'Cybregore',
          content: <CybregoreExplainer />,
          metadata: cybregoreMetadata,
          preloadSrcs: [
            '/assets/images/intro-ominous-768w.webp',
            '/assets/videos/intro-ominous-loop-mobile.mp4',
          ],
        },
        'example-egregore': {
          title: 'Egregore Deep Dive',
          content: <ExampleExplainer />,
          metadata: exampleMetadata,
        },
        'good-intentions-demon': {
          title: 'The Good Intentions Demon',
          content: <GoodIntentionsDemonExplainer />,
          metadata: goodIntentionsDemonMetadata,
        },
        'suicide-cult': {
          title: 'The Suicide Cult',
          content: <SuicideCultExplainer />,
          metadata: suicideCultMetadata,
        },
        'edge-of-breath': {
          title: 'The Edge of Breath',
          content: <EdgeOfBreathExplainer />,
          metadata: edgeOfBreathMetadata,
        },
      }}
    >
      <JumpBreadcrumbs />
    </ExplainerRouter>
  )
}

export default App
