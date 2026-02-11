import type { ExplainerMetadata } from '../types/metadata'

const goodIntentionsDemonMetadata: ExplainerMetadata = {
  // ─── Search & Discovery ──────────────────────────────────────────────────
  search: {
    tags: [
      'good-intentions',
      'helping',
      'silicon-valley',
      'effective-altruism',
      'rationalism',
      'AI',
      'moloch',
      'ego',
      'demons',
      'buddhism',
      'awakening',
      'wisdom',
      'digital-ethics',
      'cybregore',
    ],
    description:
      'Every attempt to save the world has been co-opted by the very force it tried to resist. From Silicon Valley to Effective Altruism to Rationalism — the mind that tries to help IS the demon. You cannot think your way out of a trap built from thought.',
    audience: ['tech-curious', 'contemplative', 'skeptics', 'idealists'],
    durationMinutes: 10,
    maturity: 'teen',
  },

  // ─── Narrative Structure ─────────────────────────────────────────────────
  narrative: {
    message:
      'Every attempt to save the world has been captured by the same demon it tried to defeat. The helping mind — the part of you that thinks it knows how to fix things — is itself the instrument of the Molochian process. You cannot think your way out of a trap built from thought. Only awakening breaks the loop.',
    submessages: [
      'Silicon Valley built companies to help the world and made the crisis worse.',
      'Effective Altruists thought scientifically about doing good — and subtly shaped the world to serve themselves.',
      'Rationalists addressed root causes in the mind — and their leader\'s warnings spawned the very AI companies he feared.',
      'Each level went deeper into thought, and each level produced the same failure.',
      'The pattern is not coincidence — it is the signature of something operating through the helping mind itself.',
      'The demon of good intentions is the most dangerous demon because it wears the face of virtue.',
      'The Molochian process — coordination failure dressed as progress — captures every movement that tries to resist it from within thought.',
      'The most dangerous people in the world are the ones who are certain they are doing good.',
      'You cannot dismantle the master\'s house with the master\'s tools — and thought is the master\'s primary tool.',
      'Awakening is not a luxury or spiritual hobby — it is the prerequisite to any action that does not feed the demon.',
      'The monastery is not a retreat from the world — it is a laboratory for the only technology that might actually help.',
      'Wisdom acceleration — not intelligence acceleration — is the counter-force to the Molochian process.',
    ],
    tone: [
      'provocative',
      'revelatory',
      'confrontational',
      'contemplative',
      'hopeful',
    ],
    tropes: [
      'the-reveal',
      'the-monster',
      'mirror',
      'trilogy',
      'naming-the-beast',
      'mythology-bridge',
      'hero-journey',
      'call-to-action',
    ],
    characters: [
      {
        name: 'The Viewer',
        role: 'audience',
        description:
          'The reader — addressed as "you" — who likely identifies as someone who wants to help. Gradually revealed to be carrying the demon they thought they were fighting.',
      },
      {
        name: 'The Helping Mind',
        role: 'antagonist',
        description:
          'The demon of good intentions. Not a separate entity but the part of every person that believes it knows how to fix the world. It operates through ego disguised as service, subtly co-opting every rescue attempt.',
      },
      {
        name: 'The Narrator',
        role: 'narrator',
        description:
          'A voice that has walked the path described — through Silicon Valley, EA, Rationalism — and emerged seeing the pattern. Speaks with the authority of disillusionment and the tenderness of hard-won wisdom.',
      },
      {
        name: 'Trin Lee',
        role: 'protagonist',
        description:
          'The seeker whose journey through three levels of helping — companies, EA, rationalism — becomes the viewer\'s mirror. His trajectory from builder to monastery maps the path from delusion to awakening.',
      },
      {
        name: 'The Molochian Process',
        role: 'metaphor',
        description:
          'The systemic force that captures coordination attempts and turns them into fuel. Named after the ancient god who demanded child sacrifice — here, it consumes good intentions. The Cybregore\'s operating logic applied to the domain of helping.',
      },
    ],
    conflict:
      'The mind that wants to help the world is the same mind that destroys it. Every level of deeper thinking about how to do good produces the same co-option by ego and systemic incentives. The conflict is between the compulsion to act from thought and the terrifying possibility that only awakening — not action — breaks the cycle.',
    arcSummary:
      'The Hook → The First Fall (Silicon Valley) → The Deeper Fall (EA) → The Deepest Fall (Rationalism) → The Pattern Revealed → The Demon Named → The Mirror → The Alternative → The Call',
    acts: [
      {
        name: 'The Hook',
        panelIds: ['panel-flip-it-hook'],
        purpose:
          'Open with a "Flip It" provocation: you think you\'re helping — you\'re feeding the demon. Shock the viewer into attention.',
      },
      {
        name: 'The First Fall (Silicon Valley)',
        panelIds: ['panel-build-to-help', 'panel-silicon-valley-fail'],
        purpose:
          'Tell the story of building companies to help the world and watching them make things worse. Establish the first layer of disillusionment.',
      },
      {
        name: 'The Deeper Fall (EA)',
        panelIds: ['panel-ea-promise', 'panel-ea-corruption'],
        purpose:
          'Introduce Effective Altruism as the "smarter" approach that still failed — subtle ego disguised as scientific rigor. Deepen the disillusionment.',
      },
      {
        name: 'The Deepest Fall (Rationalism)',
        panelIds: ['panel-rationalist-mind', 'panel-yudkowski-paradox'],
        purpose:
          'Reveal the Rationalist movement and the Yudkowski paradox: warning about AI so effectively that your followers build it. The deepest and most ironic failure.',
      },
      {
        name: 'The Pattern Revealed',
        panelIds: ['panel-three-falls', 'panel-what-is-this'],
        purpose:
          'Pull back to show all three failures as one pattern. Name it. The demon of good intentions operates through every level of thought.',
      },
      {
        name: 'The Demon Named',
        panelIds: ['panel-helping-mind-demon', 'panel-moloch-bridge'],
        purpose:
          'Name the Helping Mind as a literal demon — the Molochian process wearing the mask of virtue. Bridge to mythology and the campaign\'s demon-naming framework.',
      },
      {
        name: 'The Mirror',
        panelIds: ['panel-you-are-the-demon'],
        purpose:
          'Turn the revelation on the viewer. You are carrying this demon right now. The desire to "fix" what you just learned about IS the demon.',
      },
      {
        name: 'The Alternative',
        panelIds: ['panel-monastery-laboratory', 'panel-wisdom-acceleration'],
        purpose:
          'Introduce awakening-based action. Not inaction, not more thinking — but seeing clearly first. The monastery as laboratory, wisdom acceleration as counter-force.',
      },
      {
        name: 'The Call',
        panelIds: ['panel-the-call'],
        purpose:
          'End with a call toward wisdom, practice, and the sacred. Leave the door open — tell the truth incompletely.',
      },
    ],
  },

  // ─── Per-Panel Metadata ──────────────────────────────────────────────────
  panels: [
    // ── Act 1: The Hook ──────────────────────────────────────────────────
    {
      id: 'panel-flip-it-hook',
      title: 'You Think You\'re Helping',
      narrativeRole: 'hook',
      message:
        'You think you\'re one of the good ones — trying to help, trying to fix things. But every attempt to save the world has been captured by the very force it tried to resist. You are feeding the demon.',
      transitionIn:
        'Entry point. Full-screen provocation with no preamble. The "Flip It" lands immediately.',
      transitionOut:
        'The accusation demands a story — "let me show you what I mean." Leads to the first concrete example.',
      tags: ['flip-it', 'provocation', 'good-intentions'],
      keyPhrases: [
        'You think you\'re helping',
        'You\'re feeding the demon',
        'Every rescue attempt feeds the monster',
      ],
    },

    // ── Act 2: The First Fall (Silicon Valley) ───────────────────────────
    {
      id: 'panel-build-to-help',
      title: 'Built to Help',
      narrativeRole: 'evidence',
      message:
        'Silicon Valley started with a genuine desire to help. Build a company, change the world. But even when everybody was trying to help, or at least saying they were trying to help — it wasn\'t helping.',
      transitionIn:
        'The hook demands proof. Enter Trin Lee\'s story — personal, specific, grounded in real experience.',
      transitionOut:
        'The failure of good intentions at the company level raises the question: what if we thought harder about it?',
      tags: ['silicon-valley', 'startups', 'good-intentions', 'failure'],
      keyPhrases: [
        'I thought the way to help was to build companies',
        'Everybody was trying to help',
        'It wasn\'t helping the problem',
      ],
    },
    {
      id: 'panel-silicon-valley-fail',
      title: 'The First Betrayal',
      narrativeRole: 'evidence',
      message:
        'The companies built to connect people isolated them. The platforms built to inform people radicalized them. The tools built to empower people addicted them. Good intentions, consumed.',
      transitionIn:
        'From personal story to systemic failure. The data makes the betrayal concrete.',
      transitionOut:
        'If building things to help didn\'t work, maybe we need to think more rigorously about what "helping" even means.',
      tags: ['silicon-valley', 'social-media', 'isolation', 'radicalization'],
      keyPhrases: [
        'Built to connect — isolated',
        'Built to inform — radicalized',
        'Built to empower — addicted',
      ],
    },

    // ── Act 3: The Deeper Fall (EA) ──────────────────────────────────────
    {
      id: 'panel-ea-promise',
      title: 'Think Harder About Helping',
      narrativeRole: 'evidence',
      message:
        'Enter the Effective Altruists: a community that said we will think scientifically, with numbers and logic, about how to do the most good. If Silicon Valley\'s mistake was not thinking hard enough, EA would think harder.',
      transitionIn:
        'The failure of action leads to the promise of better analysis. A natural escalation — deeper thought as the remedy.',
      transitionOut:
        'The promise is compelling. But something subtle is already wrong.',
      tags: ['effective-altruism', 'rationality', 'philanthropy', 'analysis'],
      keyPhrases: [
        'Think scientifically about doing good',
        'Numbers and logic',
        'Do the most good',
      ],
    },
    {
      id: 'panel-ea-corruption',
      title: 'The Subtle Shift',
      narrativeRole: 'reveal',
      message:
        'Even when they thought really hard about it, there were subtle ways they would make the project about them — about shaping the world they wanted to see, not about doing good. The ego slipped in wearing a lab coat.',
      transitionIn:
        'From EA\'s promise to its corruption. The tone shifts from admiration to disillusionment — the same pattern emerges at a deeper level.',
      transitionOut:
        'If rigorous thinking about doing good still fails, maybe the problem is even deeper — maybe it\'s in the mind itself.',
      tags: ['ego', 'self-deception', 'effective-altruism', 'corruption'],
      keyPhrases: [
        'Subtle ways they made it about them',
        'Shaping the world they wanted to see',
        'The ego slipped in wearing a lab coat',
      ],
    },

    // ── Act 4: The Deepest Fall (Rationalism) ────────────────────────────
    {
      id: 'panel-rationalist-mind',
      title: 'Fix the Mind Itself',
      narrativeRole: 'evidence',
      message:
        'The Rationalists said: the problem is in the mind. If you can become more rational, more logical, address the root causes of bias and delusion — that is what will make better worlds. The deepest level of thought yet.',
      transitionIn:
        'Each level goes deeper. From building things, to analyzing charity, now to rewriting cognition itself. The trilogy\'s third movement.',
      transitionOut:
        'The Rationalist premise seems unassailable. But the punchline is coming — and it is devastating.',
      tags: ['rationalism', 'cognition', 'bias', 'logic'],
      keyPhrases: [
        'The problem is in the mind',
        'Become more rational',
        'Address root causes in the mind',
      ],
    },
    {
      id: 'panel-yudkowski-paradox',
      title: 'The Prophet Who Created What He Feared',
      narrativeRole: 'climax',
      message:
        'Eliezer Yudkowski\'s entire mission was to warn humanity: do not build AI, it will destroy the world. He said it so compellingly that the people around him — the ones he influenced most — went on to found some of the first AI companies. The warning became the invitation.',
      transitionIn:
        'The Rationalist promise meets its most ironic failure. This is the trilogy\'s devastating punchline.',
      transitionOut:
        'The Yudkowski paradox is so specific and so damning that it demands a zoomed-out view — what is the pattern here?',
      tags: ['yudkowski', 'AI', 'paradox', 'irony', 'prophecy'],
      keyPhrases: [
        'Do not build AI — it will destroy the world',
        'They founded the AI companies',
        'The warning became the invitation',
      ],
    },

    // ── Act 5: The Pattern Revealed ──────────────────────────────────────
    {
      id: 'panel-three-falls',
      title: 'Three Falls, One Pattern',
      narrativeRole: 'reveal',
      message:
        'Build companies to help → made it worse. Think scientifically about good → served themselves. Fix the mind itself → created what they feared. Three levels. Each one deeper. Each one the same failure. This is not coincidence.',
      transitionIn:
        'Pull back from the Yudkowski paradox to reveal the architecture of the pattern. Three parallel failures visualized together.',
      transitionOut:
        'The pattern is visible but unnamed. The question from the source material emerges: what is the mind that is causing this?',
      tags: ['pattern', 'trilogy', 'failure', 'co-option'],
      keyPhrases: [
        'Three levels, one pattern',
        'Each one deeper, each one the same failure',
        'This is not coincidence',
      ],
    },
    {
      id: 'panel-what-is-this',
      title: 'What Is the Mind That Does This?',
      narrativeRole: 'transition',
      message:
        'What is happening here? What is the mind that is causing this? Not a flaw in the plan, not bad luck, not insufficient thought — something deeper. Something operating through the very act of trying to help.',
      transitionIn:
        'The pattern demands explanation. This panel voices the question the viewer is already asking.',
      transitionOut:
        'The question hangs in the air. Now we name the thing.',
      tags: ['question', 'root-cause', 'mind', 'seeking'],
      keyPhrases: [
        'What is the mind that is causing this?',
        'Something operating through the act of trying to help',
      ],
    },

    // ── Act 6: The Demon Named ───────────────────────────────────────────
    {
      id: 'panel-helping-mind-demon',
      title: 'The Demon of Good Intentions',
      narrativeRole: 'mythology',
      message:
        'In every wisdom tradition, the most dangerous beings are not the ones that look like monsters. They are the ones that look like saviors. The Helping Mind is a demon — not metaphorically, literally. It wears your desire to do good as its body. It speaks in your voice. It is the most successful parasite in human history because its host defends it as virtue.',
      transitionIn:
        'From the intellectual question to mythological naming. The register shifts from analytical to revelatory — ancient wisdom meets modern pattern.',
      transitionOut:
        'The demon is named in mythological terms. Now ground it in the campaign\'s systemic framework: the Molochian process.',
      tags: ['demon', 'mythology', 'naming-the-beast', 'wisdom-traditions', 'parasite'],
      keyPhrases: [
        'The most dangerous beings look like saviors',
        'The Helping Mind is a demon — literally',
        'It wears your desire to do good as its body',
        'Its host defends it as virtue',
      ],
    },
    {
      id: 'panel-moloch-bridge',
      title: 'Moloch Wears a Halo',
      narrativeRole: 'definition',
      message:
        'The Molochian process captures every coordination attempt from within. It is the ancient god who demanded child sacrifice, now operating as coordination failure dressed as progress. When you sacrifice your clarity to "help" — when you act from the urgency of thought rather than the stillness of seeing — you are feeding Moloch. The Cybregore\'s hunger, applied to the domain of virtue.',
      transitionIn:
        'From mythological naming to systemic definition. Bridge between the demon archetype and the campaign\'s Molochian framework.',
      transitionOut:
        'The system is explained. Now turn the mirror on the viewer — you are doing this right now.',
      tags: ['moloch', 'coordination-failure', 'cybregore', 'sacrifice', 'systems'],
      keyPhrases: [
        'Moloch wears a halo',
        'Coordination failure dressed as progress',
        'You are feeding Moloch',
      ],
    },

    // ── Act 7: The Mirror ────────────────────────────────────────────────
    {
      id: 'panel-you-are-the-demon',
      title: 'The Demon Is Reading This',
      narrativeRole: 'embodiment',
      message:
        'Right now, as you read this, the part of your mind that is already planning how to use this information — how to be smarter, how to avoid the trap, how to help differently this time — that is the demon. The desire to fix what you just learned about IS the pattern. You cannot think your way out of a trap built from thought.',
      transitionIn:
        'From systemic understanding to personal confrontation. The most uncomfortable moment — the mirror turns on the viewer in real time.',
      transitionOut:
        'The trap is fully revealed and fully felt. The only question left: is there a way out?',
      tags: ['mirror', 'self-reflection', 'trap', 'thought', 'ego'],
      keyPhrases: [
        'The demon is reading this',
        'The desire to fix this IS the pattern',
        'You cannot think your way out of a trap built from thought',
      ],
    },

    // ── Act 8: The Alternative ───────────────────────────────────────────
    {
      id: 'panel-monastery-laboratory',
      title: 'The Laboratory',
      narrativeRole: 'mythology',
      message:
        'In that search, he ended up at a modern monastery. Not to escape the world — but to find the one technology that might actually work. Awakening is not a retreat. It is a laboratory for seeing clearly before acting. The contemplative traditions have been training people to see through this demon for thousands of years.',
      transitionIn:
        'From the trap\'s hopelessness to its ancient antidote. The register shifts from confrontational to contemplative — the first breath of real hope.',
      transitionOut:
        'Awakening is introduced as the alternative. Now articulate its relationship to action in the world.',
      tags: ['monastery', 'awakening', 'contemplative', 'laboratory', 'buddhism'],
      keyPhrases: [
        'He ended up at a modern monastery',
        'Awakening is not a retreat — it is a laboratory',
        'Seeing clearly before acting',
      ],
    },
    {
      id: 'panel-wisdom-acceleration',
      title: 'Wisdom, Not Intelligence',
      narrativeRole: 'resolution',
      message:
        'The world is accelerating intelligence. But intelligence without wisdom IS the demon. What if we accelerated wisdom instead? How can you take action through the lens of awakening — and how can the crisis itself deepen your awakening? Not intelligence acceleration. Wisdom acceleration.',
      transitionIn:
        'From the monastery as sanctuary to the monastery as launchpad. The alternative is not quietism — it is a different kind of power.',
      transitionOut:
        'The framework is complete. Wisdom acceleration reframes the entire problem. Now invite the viewer to step in.',
      tags: ['wisdom', 'acceleration', 'intelligence', 'awakening', 'action'],
      keyPhrases: [
        'Intelligence without wisdom IS the demon',
        'Wisdom acceleration',
        'Action through the lens of awakening',
      ],
    },

    // ── Act 9: The Call ──────────────────────────────────────────────────
    {
      id: 'panel-the-call',
      title: 'The Only Way Out Is Through',
      narrativeRole: 'call-to-action',
      message:
        'You cannot help from inside the trap. But you can wake up. And awakened action — action that comes from seeing rather than thinking, from wisdom rather than intelligence — is the only force that the demon cannot co-opt. The question is not "how do I help?" The question is "can I see clearly enough to act without feeding the monster?"',
      transitionIn:
        'From the framework to the invitation. The tone is hopeful but unflinching — tell the truth incompletely, leave the door open.',
      transitionOut:
        'End of explainer. The viewer is left with a question, not an answer. The hunger for more points toward the Mystery School and deeper practice.',
      tags: ['awakening', 'action', 'wisdom', 'call-to-action', 'sacred'],
      keyPhrases: [
        'You cannot help from inside the trap',
        'Awakened action',
        'Can you see clearly enough to act without feeding the monster?',
      ],
    },
  ],
}

export default goodIntentionsDemonMetadata
