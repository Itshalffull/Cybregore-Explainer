import ExplainerRouter from './components/ExplainerRouter'
import JumpBreadcrumbs from './components/JumpBreadcrumbs'
import CybregoreExplainer from './explainers/CybregoreExplainer'
import cybregoreMetadata from './explainers/cybregore-metadata'

/**
 * App root — wraps all explainers in the ExplainerRouter.
 *
 * To add a new explainer:
 * 1. Create a component in src/explainers/YourExplainer.tsx
 * 2. Add it to the explainers object below
 * 3. Use <JumpLink to="your-id" label="..." /> in any panel to link to it
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
        // To add more explainers:
        // 'meaning-makers': {
        //   title: 'Meaning Makers',
        //   content: <MeaningMakersExplainer />,
        // },
      }}
    >
      <JumpBreadcrumbs />
    </ExplainerRouter>
  )
}

export default App
