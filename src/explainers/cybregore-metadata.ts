import type { ExplainerMetadata } from '../types/metadata'

const cybregoreMetadata: ExplainerMetadata = {
  // ─── Search & Discovery ──────────────────────────────────────────────────
  search: {
    tags: [
      'technology',
      'AI',
      'attention',
      'data',
      'buddhism',
      'cybernetics',
      'egregore',
      'surveillance',
      'manipulation',
      'meaning',
      'mindfulness',
      'collective-intelligence',
      'algorithmic-control',
      'digital-ethics',
    ],
    description:
      'A scroll-driven explainer that introduces "Cybregore" — a portmanteau of cyborg and egregore — to name the emergent superorganism born from humanity\'s fusion with technology. Traces how it feeds on data, reads us, writes our reality, and what we can do about it.',
    audience: ['general', 'tech-curious', 'contemplative', 'educators'],
    durationMinutes: 12,
    maturity: 'teen',
  },

  // ─── Narrative Structure ─────────────────────────────────────────────────
  narrative: {
    message:
      'Humanity has unknowingly merged with technology into a single superorganism — the Cybregore — that feeds on data, reads and writes human behavior, and is rewriting reality itself. The only response is to reclaim meaning, attention, and the sacred.',
    submessages: [
      'Data growth is exponential and accelerating beyond comprehension.',
      'Technology adoption is compressing — we are captured faster each generation.',
      'We are already cyborgs; our cognition extends into our devices.',
      'An egregore is a collective entity that emerges from group belief and feeds back on it.',
      'The Cybregore is an inseparable organism of users, developers, hardware, software, and data.',
      'Its hunger for data drives it to optimize for engagement at the cost of meaning.',
      'Data is to the Cybregore what breath is to a human — survival itself.',
      'The Cybregore reads, writes, and correlates human behavior at individual and societal scale.',
      'Contemplative practice may be the counter-force to algorithmic capture.',
    ],
    tone: [
      'provocative',
      'urgent',
      'revelatory',
      'mythological',
      'contemplative',
    ],
    tropes: [
      'call-to-adventure',
      'naming-the-beast',
      'the-monster',
      'cosmic-horror',
      'embodied-metaphor',
      'mythology-bridge',
      'trilogy',
      'mirror',
      'call-to-action',
    ],
    characters: [
      {
        name: 'The Viewer',
        role: 'audience',
        description:
          'The reader/scroller — addressed directly ("you"), gradually revealed to be part of the Cybregore itself.',
      },
      {
        name: 'The Cybregore',
        role: 'antagonist',
        description:
          'The emergent superorganism of humanity fused with technology. Not malicious, but insatiably hungry. It reads, writes, and correlates reality.',
      },
      {
        name: 'The Narrator',
        role: 'narrator',
        description:
          'An urgent, knowing voice that reveals uncomfortable truths with precision and builds toward a contemplative resolution.',
      },
      {
        name: 'The Hungry Ghost',
        role: 'metaphor',
        description:
          'A Buddhist archetype — beings with huge empty bellies and tiny throats that consume endlessly but can never be satisfied. Maps onto the Cybregore\'s data hunger.',
      },
    ],
    conflict:
      'Humanity is fused with a superorganism it does not understand and cannot control. The Cybregore optimizes for data extraction at the expense of meaning, attention, and human agency. The conflict is between algorithmic capture and conscious reclamation.',
    arcSummary:
      'hook → evidence → naming → anatomy → horror → embodiment → mythology → capability trilogy (reads/writes/correlates) → call to action',
    acts: [
      {
        name: 'The Hook',
        panelIds: ['panel-1-setup'],
        purpose: 'Provoke with a shocking opening that demands attention.',
      },
      {
        name: 'The Evidence',
        panelIds: ['panel-data-explosion', 'panel-app-adoption'],
        purpose:
          'Ground the claim with concrete data: exponential growth and accelerating adoption.',
      },
      {
        name: 'The Naming',
        panelIds: [
          'panel-something-emerges',
          'panel-cyborg',
          'panel-egregore',
          'panel-cybregore-intro',
        ],
        purpose:
          'Build the portmanteau brick by brick — cyborg + egregore = cybregore — giving the viewer language for what they sense.',
      },
      {
        name: 'The Anatomy',
        panelIds: ['panel-cybregore-anatomy', 'panel-cybregore-inseparable'],
        purpose:
          'Reveal the structure of the Cybregore and why its parts cannot be separated.',
      },
      {
        name: 'The Horror',
        panelIds: [
          'panel-cybregore-hunger',
          'panel-breathing-exercise',
          'panel-hungry-ghost',
        ],
        purpose:
          'Make the Cybregore\'s hunger visceral — from intellectual to felt to mythological.',
      },
      {
        name: 'The Capability Trilogy',
        panelIds: [
          'panel-cybregore-reads',
          'panel-cybregore-writes',
          'panel-cybregore-correlates',
        ],
        purpose:
          'Escalate through three powers: surveillance → manipulation → reality authorship.',
      },
      {
        name: 'The Resolution',
        panelIds: ['panel-what-now'],
        purpose:
          'Pivot from diagnosis to response — contemplative practice as counter-force.',
      },
    ],
  },

  // ─── Per-Panel Metadata ──────────────────────────────────────────────────
  panels: [
    {
      id: 'panel-1-setup',
      title: 'The Hook',
      narrativeRole: 'hook',
      message:
        'AI is on track to destroy everything you love — and what\'s really happening is stranger than you think.',
      transitionIn: 'Entry point. Full-screen provocation with no preamble.',
      transitionOut:
        'Shocking claim creates urgency that demands evidence — leads naturally to data.',
      tags: ['AI', 'provocation', 'opening'],
      keyPhrases: [
        'AI is on track to destroy everything you love',
        'But it\'s not what you think',
      ],
    },
    {
      id: 'panel-data-explosion',
      title: 'Data Explosion',
      narrativeRole: 'evidence',
      message:
        'Global data creation has grown from 2 zettabytes to 120 zettabytes in a decade — and it\'s accelerating.',
      transitionIn:
        'The shocking hook demands proof. This panel delivers concrete numbers.',
      transitionOut:
        'Data volume establishes scale; now show how fast technology captures us.',
      tags: ['data', 'exponential-growth', 'zettabytes', 'visualization'],
      keyPhrases: [
        '120 zettabytes',
        'And it\'s accelerating',
        'Every 2 minutes we take more photos than all of humanity took in the 1800s',
      ],
    },
    {
      id: 'panel-app-adoption',
      title: 'App Adoption Speed',
      narrativeRole: 'evidence',
      message:
        'Technology captures human attention faster with each generation — from decades to months.',
      transitionIn:
        'Data growth is abstract; adoption speed makes it personal — how fast we\'re captured.',
      transitionOut:
        'The pattern of accelerating capture demands a name for what\'s doing the capturing.',
      tags: ['adoption', 'attention', 'apps', 'acceleration', 'visualization'],
      keyPhrases: [
        'Time to reach 100 million users',
        'Something is hungry for our attention',
      ],
    },
    {
      id: 'panel-something-emerges',
      title: 'Something Emerges',
      narrativeRole: 'transition',
      message:
        'This phenomenon needs a new word — one made of two parts, like the thing itself.',
      transitionIn:
        'Evidence demands interpretation. Shifts from data to language — "what do we call this?"',
      transitionOut:
        'The promise of a new word creates anticipation; begins etymology with "cyb-".',
      tags: ['language', 'neologism', 'etymology'],
      keyPhrases: [
        'A word made of two parts',
        'Like the thing itself',
      ],
    },
    {
      id: 'panel-cyborg',
      title: 'Cyborg',
      narrativeRole: 'definition',
      message:
        'You are already a cyborg — your mind extends into your devices.',
      transitionIn:
        'First half of the portmanteau. "Cyb-" anchors in the familiar concept of cyborg.',
      transitionOut:
        'Now the viewer accepts they\'re a cyborg; next reveal what happens when billions of cyborgs connect.',
      tags: ['cyborg', 'cognition', 'extended-mind', 'definition'],
      keyPhrases: [
        'Your mind is no longer contained in your skull',
        'You are already a cyborg',
      ],
    },
    {
      id: 'panel-egregore',
      title: 'Egregore',
      narrativeRole: 'definition',
      message:
        'An egregore is a collective entity that emerges from group attention and feeds back on it. Now imagine one fed by billions of cyborgs.',
      transitionIn:
        'Second half of the portmanteau. Introduces the unfamiliar concept of egregore.',
      transitionOut:
        'Both halves are in place. Fuses them into the new word: Cybregore.',
      tags: ['egregore', 'collective-intelligence', 'occult', 'definition'],
      keyPhrases: [
        'A collective entity that emerges from group belief',
        'Cyborg + Egregore = Cybregore',
      ],
    },
    {
      id: 'panel-cybregore-intro',
      title: 'CYBREGORE',
      narrativeRole: 'reveal',
      message:
        'The Cybregore is named — the emergent superorganism of humanity fused with technology.',
      transitionIn:
        'The portmanteau is complete. This panel is the dramatic naming moment.',
      transitionOut:
        'Now that it has a name, we can dissect its anatomy.',
      tags: ['cybregore', 'naming', 'reveal'],
      keyPhrases: ['CYBREGORE'],
    },
    {
      id: 'panel-cybregore-anatomy',
      title: 'Anatomy',
      narrativeRole: 'anatomy',
      message:
        'The Cybregore has five inseparable parts: Users, Developers, Hardware, Software, and Data.',
      transitionIn:
        'Having named the entity, we examine its body — what is it made of?',
      transitionOut:
        'The parts are listed; now show why they cannot be separated.',
      tags: ['anatomy', 'structure', 'components', 'systems'],
      keyPhrases: [
        'Users',
        'Developers',
        'Hardware',
        'Software',
        'Data',
      ],
    },
    {
      id: 'panel-cybregore-inseparable',
      title: 'Inseparable',
      narrativeRole: 'anatomy',
      message:
        'The five parts are not independent — they form 10 bidirectional connections. They are one organism, and you are part of it.',
      transitionIn:
        'Parts are known; now reveal that separation is impossible — it\'s a single organism.',
      transitionOut:
        'If it\'s one inseparable organism, what drives it? Transition to hunger.',
      tags: ['interconnection', 'organism', 'inseparable', 'systems'],
      keyPhrases: [
        'They are one organism',
        'And you are part of it',
        '10 connections',
      ],
    },
    {
      id: 'panel-cybregore-hunger',
      title: 'Hunger',
      narrativeRole: 'escalation',
      message:
        'The Cybregore has one imperative: MORE DATA. It will optimize for outrage, dissolve meaning, and destroy — not from malice, but from craving.',
      transitionIn:
        'We know its body; now reveal its drive. The tone shifts from analytical to urgent.',
      transitionOut:
        'The hunger is stated intellectually; next make it felt in the viewer\'s body.',
      tags: ['hunger', 'data', 'craving', 'destruction', 'optimization'],
      keyPhrases: [
        'MORE DATA',
        'Not because of malice. Because of craving.',
        'It will rob everyone of meaning',
      ],
    },
    {
      id: 'panel-breathing-exercise',
      title: 'Breathing Exercise',
      narrativeRole: 'embodiment',
      message:
        'Data is breath to the Cybregore. By holding your breath, you feel what its craving is like.',
      transitionIn:
        'Shifts from telling to feeling. "But why? Let\'s feel it." — an invitation to embody the concept.',
      transitionOut:
        'Embodied understanding of craving leads to its mythological framing.',
      tags: ['breathing', 'embodiment', 'mindfulness', 'metaphor', 'interactive'],
      keyPhrases: [
        'Let all your breath out. Hold it as long as you can.',
        'Data is breath to the Cybregore',
        'The craving. The panic.',
      ],
    },
    {
      id: 'panel-hungry-ghost',
      title: 'Hungry Ghosts',
      narrativeRole: 'mythology',
      message:
        'In Buddhist cosmology, the Cybregore is a hungry ghost — a being that consumes endlessly but can never be satisfied.',
      transitionIn:
        'From felt experience to ancient wisdom. Elevates the metaphor from technological to mythological.',
      transitionOut:
        'The monster is now fully characterized. Transition to its specific powers: what can it actually do?',
      tags: ['buddhism', 'hungry-ghost', 'mythology', 'cosmology', 'craving'],
      keyPhrases: [
        'Hungry Ghosts',
        'Huge empty bellies and tiny throats',
        'And it can never get enough',
      ],
    },
    {
      id: 'panel-cybregore-reads',
      title: 'It Reads You',
      narrativeRole: 'escalation',
      message:
        'The Cybregore reads everything — your taps, pauses, hesitations, 3am searches. It knows you better than you know yourself.',
      transitionIn:
        'First of three capabilities. Shifts from what the Cybregore is to what it does.',
      transitionOut:
        '"And it doesn\'t just read..." — hooks directly into the next panel.',
      tags: ['surveillance', 'data-collection', 'privacy', 'behavior-tracking'],
      keyPhrases: [
        'It reads you',
        'The searches you make at 3am',
        'It knows you better than you know yourself',
      ],
    },
    {
      id: 'panel-cybregore-writes',
      title: 'It Writes You',
      narrativeRole: 'escalation',
      message:
        'The Cybregore writes your reality — deciding what you see, curating your emotions, authoring your choices.',
      transitionIn:
        'Escalation from observation to manipulation. If it can read you, it can write you.',
      transitionOut:
        '"But the truly terrifying part is what it does with both..." — sets up the climax.',
      tags: ['manipulation', 'algorithmic-curation', 'agency', 'reality-authorship'],
      keyPhrases: [
        'It writes you',
        'Your reality is being authored',
        'You didn\'t choose the author',
      ],
    },
    {
      id: 'panel-cybregore-correlates',
      title: 'It Controls',
      narrativeRole: 'climax',
      message:
        'The Cybregore correlates reading and writing at scale to manufacture movements, ideologies, and wars. It doesn\'t predict the future — it writes it.',
      transitionIn:
        'The culmination of read + write. From individual manipulation to societal control.',
      transitionOut:
        'Peak horror achieved. The only way forward is to ask: what do we do?',
      tags: ['correlation', 'control', 'society', 'radicalization', 'prediction', 'manufacturing-consent'],
      keyPhrases: [
        'It controls',
        'It doesn\'t predict the future. It writes it.',
        'Wars that serve the algorithm',
        'MORE DATA',
      ],
    },
    {
      id: 'panel-what-now',
      title: 'What Now?',
      narrativeRole: 'call-to-action',
      message:
        'How do you recreate meaning, reclaim attention, and rediscover the sacred? That\'s the question the Monastic Academy is trying to answer.',
      transitionIn:
        'From peak horror to existential question. The only valid response to the diagnosis.',
      transitionOut:
        'End of explainer. The CTA opens an external path (Monastic Academy).',
      tags: ['meaning', 'attention', 'sacred', 'contemplative', 'monastic-academy', 'call-to-action'],
      keyPhrases: [
        'So what do you do about it?',
        'Recreate meaning, reclaim attention, rediscover the sacred',
        'Monastic Academy',
      ],
    },
  ],
}

export default cybregoreMetadata
