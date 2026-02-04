import ExplainerRouter from './components/ExplainerRouter'
import JumpBreadcrumbs from './components/JumpBreadcrumbs'
import CybregoreExplainer from './explainers/CybregoreExplainer'
import cybregoreMetadata from './explainers/cybregore-metadata'

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
        },
        // Stub example — metadata only, no content yet:
        // 'meaning-makers': {
        //   title: 'Meaning Makers',
        //   metadata: meaningMakersMetadata,
        // },
      }}
    >
      <JumpBreadcrumbs />
    </ExplainerRouter>
  )
}

export default App
