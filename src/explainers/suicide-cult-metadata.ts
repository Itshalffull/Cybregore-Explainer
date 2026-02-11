import type { ExplainerMetadata } from '../types/metadata'

const suicideCultMetadata: ExplainerMetadata = {
  // ─── Search & Discovery ──────────────────────────────────────────────────
  search: {
    tags: [
      'suicide-cult',
      'extinction',
      'consumerism',
      'moloch',
      'nuclear',
      'AI',
      'bioweapons',
      'factory-farming',
      'climate',
      'monasticism',
      'dharma',
      'digital-ethics',
      'flip-it',
      'species-death',
    ],
    description:
      'A confrontational scroll-driven explainer that names modern civilization as a leaderless suicide cult — a system that systematically extinguishes life on Earth while building technologies capable of extinguishing humanity. Traces the evidence from species extinction to nuclear weapons to AI, names the Molochian process as the invisible cult leader, and presents the monastic path as the way out.',
    audience: ['general', 'skeptics', 'tech-curious', 'activists'],
    durationMinutes: 14,
    maturity: 'mature',
  },

  // ─── Narrative Structure ─────────────────────────────────────────────────
  narrative: {
    message:
      'You are a member of the most destructive cult in human history. It has no leader. It has no doctrine you can reject. It IS your lifestyle. Every time you click "Buy Now," you participate in a system that is systematically exterminating life on Earth — and building technologies that could exterminate humanity. You didn\'t join. You were born into it.',
    submessages: [
      'You belong to a cult — one so total you cannot see it.',
      'Every "Buy Now" click is a participation sacrament in the cult of destruction.',
      'Species extinction is accelerating exponentially — this is the cult\'s ritual.',
      'Habitat destruction, coastal dead zones, factory farming, coral death — the evidence is everywhere.',
      'Each level of technology — agriculture, industry, internet, AI — accelerates the killing.',
      'Nuclear weapons were the first technology that could kill all of us. They were not the last.',
      'Bioweapons and artificial intelligence extend the cult\'s capacity for total annihilation.',
      'The Molochian process is the invisible leader of this leaderless cult — a coordination failure elevated to civilizational principle.',
      'The "normal" lifestyle is the most extreme position on the planet.',
      'You think you are a free individual making choices. You are a cult member following invisible doctrine.',
      'Your moral views have no standing — they were formed inside the death cult.',
      'It is not unethical to call this a cult. It is unethical NOT to.',
      'The monastery is not retreat from reality — it is escape from the cult.',
      'We aren\'t in a cult. You are. We escaped. You didn\'t.',
    ],
    tone: [
      'confrontational',
      'provocative',
      'urgent',
      'revelatory',
      'analytical',
      'hopeful',
    ],
    tropes: [
      'the-reveal',
      'naming-the-beast',
      'mirror',
      'cosmic-horror',
      'the-monster',
      'trilogy',
      'mythology-bridge',
      'call-to-action',
    ],
    characters: [
      {
        name: 'The Viewer',
        role: 'audience',
        description:
          'The reader/scroller — addressed as "you." Gradually revealed to be a cult member who doesn\'t know they\'re in a cult. Their sense of normalcy IS the cult\'s greatest weapon.',
      },
      {
        name: 'The Suicide Cult',
        role: 'antagonist',
        description:
          'Modern civilization itself — not a conspiracy, not a secret society, but the entire system of production, consumption, and technological acceleration that is exterminating life. Leaderless, doctrineless, totalizing.',
      },
      {
        name: 'The Molochian Process',
        role: 'antagonist',
        description:
          'The invisible cult leader — the coordination failure that drives every participant to accelerate destruction even when no individual wants to. The demon that runs the cult without being seen.',
      },
      {
        name: 'The Narrator',
        role: 'narrator',
        description:
          'A voice that has escaped — confrontational, unsparing, but ultimately compassionate. Speaks as someone who sees the cult from outside and refuses to let the viewer remain asleep.',
      },
      {
        name: 'The Monastery',
        role: 'metaphor',
        description:
          'The counter-space — not a building but a way of being that refuses the cult\'s invisible doctrine. Represents the possibility of living outside the death machine.',
      },
    ],
    conflict:
      'The viewer lives inside a civilization that is systematically exterminating life on Earth and building technologies that could exterminate humanity — yet experiences this as "normal." The conflict is between the comforting illusion of normalcy and the horrifying recognition that your lifestyle is participation in a death cult with no leader, no doctrine, and no exit — except radical awakening.',
    arcSummary:
      'provocation → evidence → naming → anatomy → escalation → "Flip It" → mythology → the way out',
    acts: [
      {
        name: 'The Provocation',
        panelIds: [],
        purpose:
          'Shock the viewer with the raw claim: you are in a cult. No preamble, no softening. Create the cognitive dissonance that demands they keep scrolling.',
      },
      {
        name: 'The Evidence',
        panelIds: [],
        purpose:
          'Ground the provocation in undeniable data — species extinction, habitat destruction, factory farming, coral death. Make the claim concrete with numbers that cannot be argued away.',
      },
      {
        name: 'The Naming',
        panelIds: [],
        purpose:
          'Name the system as a cult — define what makes it a cult (no leader, no doctrine, total immersion) and name the Molochian process as the invisible leader.',
      },
      {
        name: 'The Anatomy',
        panelIds: [],
        purpose:
          'Dissect how the cult operates — the Buy Now sacrament, the escalation from nuclear to bio to AI, each technology level accelerating the killing.',
      },
      {
        name: 'The Escalation',
        panelIds: [],
        purpose:
          'Build through the trilogy of destruction technologies — nuclear weapons, bioweapons, AI — each one extending humanity\'s capacity for self-annihilation.',
      },
      {
        name: 'The Flip',
        panelIds: [],
        purpose:
          'Turn the mirror on the viewer. Multiple "Flip It" moments that invert their assumptions: you\'re the cult member, your normalcy is extremism, your moral views have no standing.',
      },
      {
        name: 'The Mythology',
        panelIds: [],
        purpose:
          'Elevate from the political to the mythological — frame the cult through the lens of demonic possession and the Molochian process as literal demon.',
      },
      {
        name: 'The Way Out',
        panelIds: [],
        purpose:
          'The monastery as escape from the cult. Not retreat — escape. Wisdom, practice, and the sacred as the only response to a civilization that is killing everything.',
      },
    ],
  },

  // ─── Per-Panel Metadata ──────────────────────────────────────────────────
  // Left empty for dharma-micro step
  panels: [],
}

export default suicideCultMetadata
