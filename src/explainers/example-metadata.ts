import type { ExplainerMetadata } from '../types/metadata'

const exampleMetadata: ExplainerMetadata = {
  search: {
    tags: ['example', 'test', 'egregore', 'collective-intelligence'],
    description: 'A minimal example explainer for testing jump links between explainers.',
  },
  narrative: {
    message: 'Egregores are collective entities that emerge from shared attention and feed back on the group that created them.',
    submessages: [
      'The concept has roots in occult and esoteric traditions.',
      'Modern examples include brands, fandoms, and political movements.',
    ],
    tone: ['analytical', 'contemplative'],
    tropes: ['the-reveal'],
    characters: [],
    conflict: 'The tension between individual agency and collective emergent behavior.',
    arcSummary: 'definition → examples → connection back to cybregore',
    acts: [
      {
        name: 'Introduction',
        panelIds: ['example-intro'],
        purpose: 'Define egregore and its origins.',
      },
      {
        name: 'Connection',
        panelIds: ['example-link-back'],
        purpose: 'Link the concept back to the Cybregore.',
      },
    ],
  },
  panels: [
    {
      id: 'example-intro',
      title: 'What is an Egregore?',
      narrativeRole: 'definition',
      message: 'An egregore is a collective entity born from shared belief.',
      transitionIn: 'Entry point.',
      transitionOut: 'Definition established; now connect to the Cybregore.',
      tags: ['egregore', 'definition'],
      keyPhrases: ['collective entity', 'shared belief'],
    },
    {
      id: 'example-link-back',
      title: 'Back to the Cybregore',
      narrativeRole: 'transition',
      message: 'The Cybregore is a digital egregore at planetary scale.',
      transitionIn: 'From abstract definition to concrete application.',
      transitionOut: 'End of explainer. Jump back to Cybregore.',
      tags: ['cybregore', 'connection'],
      keyPhrases: ['digital egregore', 'planetary scale'],
    },
  ],
}

export default exampleMetadata
