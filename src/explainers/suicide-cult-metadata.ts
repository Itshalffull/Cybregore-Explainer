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
        panelIds: ['panel-you-are-in-a-cult', 'panel-buy-now-sacrament'],
        purpose:
          'Shock the viewer with the raw claim: you are in a cult. No preamble, no softening. Create the cognitive dissonance that demands they keep scrolling.',
      },
      {
        name: 'The Evidence',
        panelIds: [
          'panel-extinction-data',
          'panel-four-horsemen',
          'panel-technology-accelerates',
        ],
        purpose:
          'Ground the provocation in undeniable data — species extinction, habitat destruction, factory farming, coral death. Make the claim concrete with numbers that cannot be argued away.',
      },
      {
        name: 'The Naming',
        panelIds: ['panel-this-is-a-cult', 'panel-the-invisible-leader'],
        purpose:
          'Name the system as a cult — define what makes it a cult (no leader, no doctrine, total immersion) and name the Molochian process as the invisible leader.',
      },
      {
        name: 'The Anatomy',
        panelIds: ['panel-cult-anatomy', 'panel-no-exit'],
        purpose:
          'Dissect how the cult operates — the Buy Now sacrament, the escalation from nuclear to bio to AI, each technology level accelerating the killing.',
      },
      {
        name: 'The Escalation',
        panelIds: ['panel-nuclear', 'panel-bioweapons', 'panel-ai-acceleration'],
        purpose:
          'Build through the trilogy of destruction technologies — nuclear weapons, bioweapons, AI — each one extending humanity\'s capacity for self-annihilation.',
      },
      {
        name: 'The Flip',
        panelIds: [
          'panel-you-are-the-cult-member',
          'panel-normal-is-extreme',
          'panel-no-moral-standing',
        ],
        purpose:
          'Turn the mirror on the viewer. Multiple "Flip It" moments that invert their assumptions: you\'re the cult member, your normalcy is extremism, your moral views have no standing.',
      },
      {
        name: 'The Mythology',
        panelIds: ['panel-moloch-the-demon', 'panel-possessed-civilization'],
        purpose:
          'Elevate from the political to the mythological — frame the cult through the lens of demonic possession and the Molochian process as literal demon.',
      },
      {
        name: 'The Way Out',
        panelIds: [
          'panel-we-escaped',
          'panel-the-monastery',
          'panel-leave-the-cult',
        ],
        purpose:
          'The monastery as escape from the cult. Not retreat — escape. Wisdom, practice, and the sacred as the only response to a civilization that is killing everything.',
      },
    ],
  },

  // ─── Per-Panel Metadata ──────────────────────────────────────────────────
  panels: [
    // ── Act 1: The Provocation ─────────────────────────────────────────────
    {
      id: 'panel-you-are-in-a-cult',
      title: 'You Are in a Cult',
      narrativeRole: 'hook',
      message:
        'You are a member of the most destructive cult in human history. You didn\'t join. You were born into it.',
      transitionIn:
        'Entry point. No preamble, no context. The words hit before the viewer has defenses up.',
      transitionOut:
        'The raw claim creates disbelief — "prove it." But first, make it visceral: the Buy Now button.',
      tags: ['provocation', 'cult', 'opening', 'flip-it'],
      keyPhrases: [
        'You are in a cult',
        'The most destructive cult in human history',
        'You didn\'t join. You were born into it.',
      ],
    },
    {
      id: 'panel-buy-now-sacrament',
      title: 'The Sacrament',
      narrativeRole: 'hook',
      message:
        'Every time you click "Buy Now," you participate in a ritual of destruction. The beings killed to create the product, ship the package, run the data centers — your convenience is their death.',
      transitionIn:
        'From abstract claim to concrete action. The viewer\'s own finger on a button they press every week.',
      transitionOut:
        'The sacrament is named. Now show the scale of what it feeds — the evidence of extinction.',
      tags: ['consumerism', 'amazon', 'buy-now', 'participation', 'interactive'],
      keyPhrases: [
        'Buy Now',
        'Your convenience is their death',
        'Every click is a sacrament',
        'The beings killed to create that package',
      ],
    },

    // ── Act 2: The Evidence ────────────────────────────────────────────────
    {
      id: 'panel-extinction-data',
      title: 'The Extinction Curve',
      narrativeRole: 'evidence',
      message:
        'Species extinction is not declining. It is not stable. It is accelerating exponentially. This is the cult\'s primary ritual — the systematic extermination of life on Earth.',
      transitionIn:
        'From the personal (your Buy Now clicks) to the planetary. The data speaks.',
      transitionOut:
        'The extinction curve is one dimension. Now show the full picture — four horsemen of ecological collapse.',
      tags: ['extinction', 'data', 'exponential', 'visualization', 'species'],
      keyPhrases: [
        'Exponential increase in species extinctions',
        'This is the cult\'s ritual',
        'The systematic extermination of life',
      ],
    },
    {
      id: 'panel-four-horsemen',
      title: 'Four Horsemen',
      narrativeRole: 'evidence',
      message:
        'Habitat destruction. Global coastal dead zones. Billions of animals in horrific conditions. Coral reefs dying. Four graphs. One conclusion: this system kills everything it touches.',
      transitionIn:
        'Extinction was one curve. Now multiply the evidence across four dimensions of destruction.',
      transitionOut:
        'The evidence is overwhelming. But WHY does each generation accelerate the killing? Technology.',
      tags: [
        'habitat-destruction',
        'dead-zones',
        'factory-farming',
        'coral',
        'visualization',
      ],
      keyPhrases: [
        'Habitat destruction',
        'Global coastal dead zones',
        'Billions killed in horrific conditions',
        'Coral cover collapsing',
        'One conclusion',
      ],
    },
    {
      id: 'panel-technology-accelerates',
      title: 'Each Level Accelerates the Killing',
      narrativeRole: 'evidence',
      message:
        'Tribes. Agriculture. Industry. The Internet. AI. Each level of technological intelligence produces an exponential increase in destruction. The pattern is not random. It is structural.',
      transitionIn:
        'From what is happening to why it keeps getting worse. Technology as accelerant.',
      transitionOut:
        'The pattern is undeniable. Now name what it is — because it has the structure of something specific.',
      tags: ['technology', 'acceleration', 'AI', 'pattern', 'visualization'],
      keyPhrases: [
        'Each level of intelligence accelerates the killing',
        'Tribes to agriculture to industry to AI',
        'The pattern is structural',
      ],
    },

    // ── Act 3: The Naming ──────────────────────────────────────────────────
    {
      id: 'panel-this-is-a-cult',
      title: 'This Is a Cult',
      narrativeRole: 'definition',
      message:
        'A cult has three features: members who can\'t see they\'re in it, a totalizing worldview disguised as normalcy, and rituals of participation that bind you to the group. You\'re living in one.',
      transitionIn:
        'The evidence demanded a name. The pattern demanded a framework. This is it: a cult.',
      transitionOut:
        'The definition lands. But every cult has a leader. Who runs this one?',
      tags: ['cult', 'definition', 'naming', 'framework'],
      keyPhrases: [
        'This is a cult',
        'No leader. No doctrine you can reject.',
        'A totalizing worldview disguised as normalcy',
        'You\'re living in one',
      ],
    },
    {
      id: 'panel-the-invisible-leader',
      title: 'The Invisible Leader',
      narrativeRole: 'reveal',
      message:
        'Every cult has a leader. This one\'s leader is the Molochian process — the coordination failure that forces every participant to accelerate destruction even when no individual wants to. The demon you can\'t see because it IS the system.',
      transitionIn:
        'The cult is named but leaderless. This panel reveals the leader hiding in plain sight.',
      transitionOut:
        'The leader is named. Now dissect the cult\'s anatomy — how it actually operates on you.',
      tags: ['moloch', 'coordination-failure', 'system', 'reveal', 'demon'],
      keyPhrases: [
        'The Molochian process',
        'The invisible leader',
        'A coordination failure elevated to civilizational principle',
        'The demon you can\'t see because it IS the system',
      ],
    },

    // ── Act 4: The Anatomy ─────────────────────────────────────────────────
    {
      id: 'panel-cult-anatomy',
      title: 'Anatomy of the Cult',
      narrativeRole: 'anatomy',
      message:
        'The cult has no meeting hall — your home is the temple. It has no scripture — the market is the doctrine. It has no initiation — you were born into it. Every system you depend on to live is a thread that binds you to the killing.',
      transitionIn:
        'From naming the leader to dissecting the machinery. How does this cult actually work?',
      transitionOut:
        'The anatomy reveals total immersion. Now confront the darkest truth: there is no exit from the inside.',
      tags: ['anatomy', 'system', 'immersion', 'structure', 'hybrid'],
      keyPhrases: [
        'Your home is the temple',
        'The market is the doctrine',
        'You were born into it',
        'Every system you depend on binds you to the killing',
      ],
    },
    {
      id: 'panel-no-exit',
      title: 'No Exit',
      narrativeRole: 'anatomy',
      message:
        'You can\'t leave by changing your shopping habits. You can\'t leave by voting differently. The cult is not a set of choices — it is the infrastructure of your existence. There is no exit from the inside.',
      transitionIn:
        'The anatomy is laid bare. The viewer instinctively looks for an escape hatch. This panel closes every one.',
      transitionOut:
        'With no easy exit, the viewer is trapped. Now escalate: show what the cult is building — technologies of total annihilation.',
      tags: ['no-exit', 'trapped', 'infrastructure', 'despair'],
      keyPhrases: [
        'There is no exit from the inside',
        'The cult is not a set of choices',
        'It is the infrastructure of your existence',
      ],
    },

    // ── Act 5: The Escalation ──────────────────────────────────────────────
    {
      id: 'panel-nuclear',
      title: 'Nuclear',
      narrativeRole: 'escalation',
      message:
        'In 1945, the cult built its first device capable of killing everyone. Nuclear weapons were the first time humanity could end itself. The cult didn\'t stop. It kept building.',
      transitionIn:
        'First of three escalating technologies. The trilogy of self-annihilation begins.',
      transitionOut:
        'Nuclear was the first. But the cult\'s ambition grew. Next: weapons you can\'t see.',
      tags: ['nuclear', 'weapons', 'escalation', 'trilogy'],
      keyPhrases: [
        'The first technology that could kill all of us',
        'The cult didn\'t stop',
        'It kept building',
      ],
    },
    {
      id: 'panel-bioweapons',
      title: 'Biological',
      narrativeRole: 'escalation',
      message:
        'Then the cult discovered it could engineer life itself as a weapon. Bioweapons: invisible, self-replicating, impossible to fully contain. The capability is increasing every year.',
      transitionIn:
        'Second technology of annihilation. Escalation from visible destruction to invisible.',
      transitionOut:
        'Nuclear could end us. Bioweapons could end us. But the cult\'s latest creation is the most dangerous of all.',
      tags: ['bioweapons', 'biological', 'escalation', 'trilogy'],
      keyPhrases: [
        'Engineer life itself as a weapon',
        'Invisible, self-replicating, impossible to contain',
        'The capability is increasing',
      ],
    },
    {
      id: 'panel-ai-acceleration',
      title: 'Artificial Intelligence',
      narrativeRole: 'escalation',
      message:
        'Now the cult is building minds more powerful than its own. AI doesn\'t just accelerate destruction — it accelerates the acceleration. Every trend on every graph bends upward each time intelligence increases. The cult is building its own apotheosis.',
      transitionIn:
        'Final and most dangerous technology. The trilogy peaks: from splitting atoms to engineering life to creating intelligence.',
      transitionOut:
        'The escalation is complete. The horror is established. Now turn the mirror: this is not about "them." This is about YOU.',
      tags: ['AI', 'intelligence', 'acceleration', 'escalation', 'trilogy', 'climax'],
      keyPhrases: [
        'Building minds more powerful than its own',
        'Accelerates the acceleration',
        'Every graph bends upward',
        'The cult is building its own apotheosis',
      ],
    },

    // ── Act 6: The Flip ────────────────────────────────────────────────────
    {
      id: 'panel-you-are-the-cult-member',
      title: 'You Are the Cult Member',
      narrativeRole: 'reveal',
      message:
        'You think this is about some distant system. It\'s not. YOU are the cult member. Your morning coffee, your Amazon orders, your retirement fund, your children\'s education — all of it runs on the cult\'s machinery. You aren\'t observing the cult. You are performing its rituals right now.',
      transitionIn:
        'The mirror turns. Everything described about "the cult" snaps into focus as a description of the viewer\'s own life.',
      transitionOut:
        'The viewer is implicated. Now flip their sense of what\'s "normal" — their normalcy is the most extreme position possible.',
      tags: ['flip-it', 'mirror', 'participation', 'reveal', 'confrontation'],
      keyPhrases: [
        'YOU are the cult member',
        'You aren\'t observing the cult',
        'You are performing its rituals right now',
      ],
    },
    {
      id: 'panel-normal-is-extreme',
      title: 'Normal Is Extreme',
      narrativeRole: 'reveal',
      message:
        'You think your lifestyle is moderate. Reasonable. Normal. It is the most extreme position on the planet. No civilization in history has killed at this rate, consumed at this scale, or built weapons this powerful — and called it "just living." Your normal is history\'s most radical experiment.',
      transitionIn:
        'Second "Flip It." The viewer\'s sense of normalcy is inverted. What felt moderate is revealed as extreme.',
      transitionOut:
        'Normalcy is destroyed. Now deliver the final blow: even your moral objections are compromised.',
      tags: ['flip-it', 'normalcy', 'extremism', 'lifestyle', 'interactive'],
      keyPhrases: [
        'The most extreme position on the planet',
        'No civilization in history has killed at this rate',
        'Your normal is history\'s most radical experiment',
        'And you call it "just living"',
      ],
    },
    {
      id: 'panel-no-moral-standing',
      title: 'No Moral Standing',
      narrativeRole: 'climax',
      message:
        'You were raised inside the cult. Educated by the cult. Your values, your ethics, your sense of right and wrong — all formed inside the death machine. NONE of your views have moral standing. Your mind was created by a death cult. And it is unethical NOT to tell you.',
      transitionIn:
        'Final "Flip It" — the most confrontational. Attacks not just the viewer\'s actions but the foundation of their moral reasoning.',
      transitionOut:
        'Peak confrontation achieved. The viewer\'s entire moral framework is undermined. Now shift register entirely — from political to mythological.',
      tags: ['flip-it', 'morality', 'ethics', 'climax', 'confrontation'],
      keyPhrases: [
        'NONE of your views have moral standing',
        'Your mind was created by a death cult',
        'It is unethical NOT to tell you',
        'You were raised inside the cult',
      ],
    },

    // ── Act 7: The Mythology ───────────────────────────────────────────────
    {
      id: 'panel-moloch-the-demon',
      title: 'Moloch',
      narrativeRole: 'mythology',
      message:
        'The ancients knew this force. They called it Moloch — the god who demands the sacrifice of children. Not a metaphor. A literal demon. The Molochian process is not a coordination failure described by economists. It is a being that feeds on the destruction of what you love most.',
      transitionIn:
        'Radical register shift. From political analysis and moral confrontation to mythological framing. The intellectual becomes the numinous.',
      transitionOut:
        'The demon is named. Now show the scope of its possession — not individuals, but civilization itself.',
      tags: ['moloch', 'demon', 'mythology', 'sacrifice', 'ancient'],
      keyPhrases: [
        'Moloch',
        'The god who demands the sacrifice of children',
        'Not a metaphor. A literal demon.',
        'It feeds on the destruction of what you love most',
      ],
    },
    {
      id: 'panel-possessed-civilization',
      title: 'Possessed',
      narrativeRole: 'embodiment',
      message:
        'A civilization that builds the instruments of its own extinction is not making bad choices. It is possessed. The demon does not control individuals — it controls the spaces between them. The market. The infrastructure. The invisible doctrine that says "this is just how things work."',
      transitionIn:
        'From the demon itself to its mode of operation. Possession — not of individuals but of the collective.',
      transitionOut:
        'The possession is total. The horror is complete. But there is one thing the demon cannot control: those who have seen it.',
      tags: ['possession', 'demon', 'civilization', 'mythology', 'collective'],
      keyPhrases: [
        'A civilization that builds the instruments of its own extinction is possessed',
        'It controls the spaces between them',
        'The invisible doctrine',
        'This is just how things work',
      ],
    },

    // ── Act 8: The Way Out ─────────────────────────────────────────────────
    {
      id: 'panel-we-escaped',
      title: 'We Escaped',
      narrativeRole: 'reveal',
      message:
        'We aren\'t in a cult. You are. We escaped. You didn\'t. We aren\'t under mental control. You are. This isn\'t arrogance — it\'s the first honest thing anyone has said to you.',
      transitionIn:
        'The narrator reveals their position: outside the cult. The final "Flip It" — they aren\'t the crazy ones. You are.',
      transitionOut:
        'Escape is possible. But how? What does the outside look like?',
      tags: ['flip-it', 'escape', 'narrator', 'reveal', 'confrontation'],
      keyPhrases: [
        'We aren\'t in a cult. You are.',
        'We escaped. You didn\'t.',
        'We aren\'t under mental control. You are.',
        'The first honest thing anyone has said to you',
      ],
    },
    {
      id: 'panel-the-monastery',
      title: 'The Monastery',
      narrativeRole: 'resolution',
      message:
        'The monastery is not retreat from reality. It is the only place where reality can be seen clearly. When you step outside the cult\'s infrastructure, you see the demon. When you see the demon, it begins to lose its power. Wisdom is not passive — it is the most dangerous thing the cult has ever encountered.',
      transitionIn:
        'From the revelation of escape to the form it takes. The monastery as counter-space to the cult.',
      transitionOut:
        'The possibility is named. Now the final invitation: will you leave?',
      tags: ['monastery', 'wisdom', 'practice', 'sacred', 'mythology', 'hope'],
      keyPhrases: [
        'The monastery is not retreat from reality',
        'The only place where reality can be seen clearly',
        'When you see the demon, it begins to lose its power',
        'Wisdom is the most dangerous thing the cult has ever encountered',
      ],
    },
    {
      id: 'panel-leave-the-cult',
      title: 'Leave the Cult',
      narrativeRole: 'call-to-action',
      message:
        'You have two options. Stay in the cult and participate in the most destructive force in the history of life on Earth. Or leave. Leaving is not easy. Leaving is not comfortable. But it is the only sane response to an insane system. The door is open. Will you walk through it?',
      transitionIn:
        'From the vision of the monastery to the direct address. The final choice.',
      transitionOut:
        'End of explainer. The CTA opens toward wisdom, practice, and the Monastic Academy.',
      tags: ['call-to-action', 'choice', 'leaving', 'monastic-academy', 'hope'],
      keyPhrases: [
        'Leave the cult',
        'The only sane response to an insane system',
        'The door is open',
        'Will you walk through it?',
      ],
    },
  ],
}

export default suicideCultMetadata
