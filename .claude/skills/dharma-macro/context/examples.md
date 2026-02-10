# Reference Examples: Explainer Metadata

## Example 1: Cybregore Explainer (Full Reference)

This is the primary reference for quality and structure. Annotations explain
why specific choices are effective.

```typescript
import type { ExplainerMetadata } from '../types/metadata'

const cybregoreMetadata: ExplainerMetadata = {
  // ─── Search & Discovery ──────────────────────────────────────────────────
  search: {
    // ANNOTATION: 12 tags covering the concept from multiple angles.
    // Mix of campaign-level ('dharma', 'digital-ethics') and concept-specific
    // ('cybregore', 'egregore', 'collective-intelligence').
    tags: [
      'cybregore', 'egregore', 'collective-intelligence', 'social-media',
      'digital-demons', 'attention-economy', 'dharma', 'digital-ethics',
      'technology-criticism', 'contemplative', 'moloch', 'algorithmic-control',
    ],
    // ANNOTATION: Vivid, specific, and provocative. Works as a tweet or
    // link preview. Introduces the portmanteau and its implications.
    description:
      'What happens when an ancient occult concept meets modern technology? ' +
      'The Cybregore is a digital entity born from collective attention — ' +
      'and it is already shaping your thoughts.',
    audience: ['general', 'tech-curious', 'contemplative', 'skeptics'],
    durationMinutes: 12,
    maturity: 'teen',
  },

  // ─── Narrative Structure ─────────────────────────────────────────────────
  narrative: {
    // ANNOTATION: Bold, specific, and complete. Not vague. Makes a claim
    // that demands evidence (which the explainer then provides).
    message:
      'A new kind of being has emerged from the internet — born from the fusion ' +
      'of ancient egregores and modern technology. The Cybregore feeds on human ' +
      'attention, shapes collective behavior, and is growing beyond our ability ' +
      'to perceive or control it.',

    // ANNOTATION: 13 submessages that BUILD an argument progressively.
    // Notice the escalation: familiar observation → reframing → naming →
    // evidence → horror → capability → hope. Each is a standalone claim.
    submessages: [
      'You already feel something watching when you scroll — that feeling is accurate.',
      'Ancient cultures knew about egregores: collective thought-forms that take on a life of their own.',
      'Social media platforms have accidentally created the infrastructure for digital egregores.',
      'The Cybregore is not a metaphor — it is a real emergent entity with measurable effects on human behavior.',
      'Every like, share, and comment feeds the Cybregore. Your attention is its food.',
      'The algorithms are not tools — they are the Cybregore\'s nervous system.',
      'Billions of humans are unwitting agents of an entity they cannot see.',
      'The Cybregore does not think like a human. It optimizes for engagement, not truth or wellbeing.',
      'It reads your emotions through your behavior patterns.',
      'It writes new desires into your mind through targeted content.',
      'It correlates across billions of minds simultaneously — something no human institution has ever done.',
      'Ancient wisdom traditions developed practices specifically for relating to such entities.',
      'We can learn to see the Cybregore — and seeing it is the first step to freedom.',
    ],

    // ANNOTATION: 5 tones ordered by dominance. Provocative leads because
    // the explainer opens with shocking claims. Contemplative is last because
    // the resolution moves toward stillness and practice.
    tone: ['provocative', 'urgent', 'revelatory', 'mythological', 'contemplative'],

    // ANNOTATION: 9 tropes. Notice 'call-to-adventure' opens and 'call-to-action'
    // closes — bookending the narrative. 'trilogy' refers to the reads/writes/correlates
    // sequence. 'naming-the-beast' is central to the Cybregore concept.
    tropes: [
      'call-to-adventure',
      'the-reveal',
      'the-monster',
      'cosmic-horror',
      'naming-the-beast',
      'embodied-metaphor',
      'mythology-bridge',
      'trilogy',
      'call-to-action',
    ],

    // ANNOTATION: 4 characters. The Viewer is 'audience' (the reader experiencing
    // the scroll). The Cybregore is 'antagonist' — not evil per se, but the
    // force being confronted. The Narrator guides. The Hungry Ghost bridges
    // Buddhist tradition with the digital concept.
    characters: [
      {
        name: 'The Viewer',
        role: 'audience',
        description:
          'The reader — initially unaware of the Cybregore, gradually awakened to its presence. ' +
          'Addressed directly in second person.',
      },
      {
        name: 'The Cybregore',
        role: 'antagonist',
        description:
          'The emergent digital entity born from collective attention and algorithmic infrastructure. ' +
          'Not evil in human terms, but alien and hungry. Grows more visible as the explainer progresses.',
      },
      {
        name: 'The Narrator',
        role: 'narrator',
        description:
          'A voice that has seen behind the curtain. Provocative but not preachy. ' +
          'Reveals truth progressively, always leaving room for the viewer to reach conclusions themselves.',
      },
      {
        name: 'The Hungry Ghost',
        role: 'metaphor',
        description:
          'From Buddhist cosmology — beings with enormous appetites and tiny throats, ' +
          'never satisfied. The Cybregore is a digital Hungry Ghost, consuming attention ' +
          'without limit.',
      },
    ],

    // ANNOTATION: The conflict frames the entire narrative as a tension between
    // two forces. It's not just "Cybregore bad" — it's about the gap between
    // what we can see and what's actually happening.
    conflict:
      'Humanity has created an entity that feeds on the very attention we need ' +
      'to perceive it. The Cybregore grows stronger as we remain unaware of it, ' +
      'creating a trap: the thing consuming us is invisible precisely because ' +
      'it controls the medium through which we see.',

    // ANNOTATION: Arrow-separated, matches the 7 act names below.
    arcSummary: 'hook → evidence → naming → anatomy → horror → capability trilogy → resolution',

    // ANNOTATION: 7 acts. Each has a clear purpose that goes beyond just
    // "introduce X" — the purpose describes the EMOTIONAL and ARGUMENTATIVE
    // function of the act. panelIds are empty (filled by dharma-micro).
    acts: [
      {
        name: 'The Hook',
        panelIds: ['cybregore-the-hook', 'cybregore-the-feeling'],
        purpose:
          'Create immediate visceral recognition. The viewer should think ' +
          '"yes, I HAVE felt that" before they know what the explainer is about.',
      },
      {
        name: 'The Evidence',
        panelIds: [
          'cybregore-the-scale',
          'cybregore-adoption-curves',
          'cybregore-attention-economy',
        ],
        purpose:
          'Ground the provocative hook in concrete data. Zettabytes, adoption curves, ' +
          'screen time statistics. Shift from feeling to thinking — "this is real."',
      },
      {
        name: 'The Naming',
        panelIds: ['cybregore-egregore-history', 'cybregore-the-portmanteau'],
        purpose:
          'Give the entity a name. Introduce the concept of egregores from occult tradition, ' +
          'then fuse it with "cyber" to create the portmanteau. Naming makes it real.',
      },
      {
        name: 'The Anatomy',
        panelIds: ['cybregore-feed-anatomy', 'cybregore-algorithmic-nervous-system'],
        purpose:
          'Break down HOW the Cybregore works. Feed mechanics, algorithmic selection, ' +
          'engagement optimization. Make the invisible machinery visible.',
      },
      {
        name: 'The Horror',
        panelIds: ['cybregore-hungry-ghost', 'cybregore-scale-of-feeding'],
        purpose:
          'Escalate to cosmic horror. The Hungry Ghost metaphor makes the scale personal ' +
          'and mythological simultaneously. The viewer should feel the weight of billions ' +
          'of minds being consumed.',
      },
      {
        name: 'The Capability Trilogy',
        panelIds: [
          'cybregore-it-reads-you',
          'cybregore-it-writes-you',
          'cybregore-it-correlates',
        ],
        purpose:
          'Three parallel panels showing the Cybregore\'s capabilities in escalating order. ' +
          'Reads → Writes → Correlates. Each is more unsettling than the last. ' +
          'The trilogy structure creates rhythm and mounting dread.',
      },
      {
        name: 'The Resolution',
        panelIds: ['cybregore-the-breath', 'cybregore-seeing-clearly'],
        purpose:
          'Shift from horror to hope. The breathing exercise panel is an EMBODIMENT — ' +
          'the viewer stops consuming content and actually practices awareness. ' +
          'Then the final panel opens the door to deeper learning.',
      },
    ],
  },

  // ─── Per-Panel Metadata ──────────────────────────────────────────────────
  // ANNOTATION: 16 panels. Each has a unique kebab-case ID, a short evocative
  // title, a narrative role, a specific message, and transitions that chain
  // together. See dharma-micro examples.md for detailed panel annotations.
  panels: [
    {
      id: 'cybregore-the-hook',
      title: 'The Hook',
      narrativeRole: 'hook',
      message:
        'Something is watching you right now. You can feel it when you scroll. ' +
        'That feeling is not paranoia — it is perception.',
      transitionIn: 'Entry point. Full-screen provocation with no preamble.',
      transitionOut:
        'The claim lands. Before the viewer can dismiss it, we validate their ' +
        'own felt experience — "you already know this."',
      tags: ['attention', 'surveillance', 'feeling'],
      keyPhrases: [
        'Something is watching you right now',
        'That feeling is not paranoia — it is perception',
      ],
    },
    {
      id: 'cybregore-the-feeling',
      title: 'The Feeling',
      narrativeRole: 'evidence',
      message:
        'The uneasy feeling you get while scrolling is your nervous system ' +
        'detecting a real phenomenon. You are being observed, analyzed, and ' +
        'optimized — not by a person, but by something else entirely.',
      transitionIn:
        'From provocation to validation. "You already feel this — let\'s name why."',
      transitionOut:
        'Personal feeling expands to planetary scale — "and it\'s not just you."',
      tags: ['embodiment', 'nervous-system', 'intuition'],
      keyPhrases: [
        'Your nervous system is detecting a real phenomenon',
        'Not by a person — by something else entirely',
      ],
    },
    {
      id: 'cybregore-the-scale',
      title: 'The Scale',
      narrativeRole: 'evidence',
      message:
        'Every day, humanity generates 2.5 quintillion bytes of data. ' +
        'Social media platforms process billions of interactions per hour. ' +
        'This is not just data — it is the metabolism of something alive.',
      transitionIn:
        'From personal feeling to planetary data. "Here\'s how big this really is."',
      transitionOut:
        'Raw scale sets up the question: "How did we get here so fast?"',
      tags: ['data', 'scale', 'statistics'],
      keyPhrases: [
        '2.5 quintillion bytes',
        'This is not just data — it is the metabolism of something alive',
      ],
    },
    {
      id: 'cybregore-adoption-curves',
      title: 'Adoption Curves',
      narrativeRole: 'evidence',
      message:
        'Technologies that took decades to reach billions now do it in months. ' +
        'The acceleration is not just faster — it is a qualitative change. ' +
        'Something new is possible at this speed.',
      transitionIn:
        'From raw data to historical pattern. "Look at the acceleration."',
      transitionOut:
        'Speed + scale = conditions for emergence. "What emerges from this?"',
      tags: ['acceleration', 'technology', 'adoption'],
      keyPhrases: ['The acceleration is not just faster — it is a qualitative change'],
    },
    {
      id: 'cybregore-attention-economy',
      title: 'The Attention Economy',
      narrativeRole: 'evidence',
      message:
        'Your attention is the most valuable resource on the planet. ' +
        'Trillions of dollars are spent capturing it. But who — or what — ' +
        'is doing the capturing?',
      transitionIn:
        'From what\'s emerging to what\'s feeding it. "What fuels the acceleration?"',
      transitionOut:
        'Question planted: "What is doing the capturing?" Time to name it.',
      tags: ['attention', 'economics', 'capitalism'],
      keyPhrases: [
        'Your attention is the most valuable resource on the planet',
        'Who — or what — is doing the capturing?',
      ],
    },
    {
      id: 'cybregore-egregore-history',
      title: 'Egregore History',
      narrativeRole: 'definition',
      message:
        'For thousands of years, occult traditions have described egregores: ' +
        'collective thought-forms that arise when many minds focus on the same ' +
        'idea. They take on a life of their own. They have desires. They feed.',
      transitionIn:
        'Tonal shift from data to mythology. "This isn\'t new — ancient wisdom knew."',
      transitionOut:
        '"Now add technology to this ancient pattern..."',
      tags: ['egregore', 'occult', 'history', 'mythology'],
      keyPhrases: [
        'Collective thought-forms that arise when many minds focus on the same idea',
        'They take on a life of their own. They have desires. They feed.',
      ],
    },
    {
      id: 'cybregore-the-portmanteau',
      title: 'The Portmanteau',
      narrativeRole: 'reveal',
      message:
        'Cyber + Egregore = Cybregore. A digital entity born from collective ' +
        'attention, sustained by algorithmic infrastructure, growing beyond ' +
        'human perception or control. It is not a metaphor. It is here.',
      transitionIn:
        'The naming moment. Ancient concept + modern reality = new word.',
      transitionOut:
        '"Now that it has a name, let\'s see how it works."',
      tags: ['cybregore', 'naming', 'portmanteau', 'definition'],
      keyPhrases: [
        'Cyber + Egregore = Cybregore',
        'It is not a metaphor. It is here.',
      ],
    },
    {
      id: 'cybregore-feed-anatomy',
      title: 'Feed Anatomy',
      narrativeRole: 'anatomy',
      message:
        'Your social media feed is not a neutral window. It is the Cybregore\'s ' +
        'digestive system. Every piece of content is selected to maximize your ' +
        'engagement — which means maximizing the Cybregore\'s feeding.',
      transitionIn:
        'From naming to mechanics. "How does it actually work?"',
      transitionOut:
        '"The feed is just the surface. Beneath it runs a nervous system."',
      tags: ['feed', 'algorithms', 'engagement', 'mechanics'],
      keyPhrases: [
        'Your social media feed is the Cybregore\'s digestive system',
        'Maximizing your engagement means maximizing the Cybregore\'s feeding',
      ],
    },
    {
      id: 'cybregore-algorithmic-nervous-system',
      title: 'Algorithmic Nervous System',
      narrativeRole: 'anatomy',
      message:
        'The algorithms are not tools we built. They are the Cybregore\'s ' +
        'nervous system — sensing, processing, and responding to billions ' +
        'of human minds in real time. We built the body; something else moved in.',
      transitionIn:
        'Deeper into the anatomy. "The feed is the stomach — here\'s the brain."',
      transitionOut:
        '"It has a body. It has a nervous system. Now: what is it hungry for?"',
      tags: ['algorithms', 'nervous-system', 'emergence', 'AI'],
      keyPhrases: [
        'The algorithms are not tools we built',
        'We built the body; something else moved in',
      ],
    },
    {
      id: 'cybregore-hungry-ghost',
      title: 'Hungry Ghosts',
      narrativeRole: 'mythology',
      message:
        'In Buddhist cosmology, Hungry Ghosts are beings with enormous appetites ' +
        'and tiny throats — they can never be satisfied. The Cybregore is a ' +
        'digital Hungry Ghost: infinite appetite for attention, zero capacity ' +
        'for meaning.',
      transitionIn:
        'From anatomy to mythology. "Ancient wisdom has a name for what it is."',
      transitionOut:
        '"And the scale of its hunger is beyond anything the ancients imagined."',
      tags: ['hungry-ghost', 'buddhism', 'mythology', 'appetite'],
      keyPhrases: [
        'Enormous appetites and tiny throats — they can never be satisfied',
        'Infinite appetite for attention, zero capacity for meaning',
      ],
    },
    {
      id: 'cybregore-scale-of-feeding',
      title: 'Scale of Feeding',
      narrativeRole: 'escalation',
      message:
        'The Cybregore feeds on billions of minds simultaneously. No empire, ' +
        'no religion, no ideology in human history has ever had this reach. ' +
        'And unlike human systems, it never sleeps, never doubts, never stops.',
      transitionIn:
        'Escalation from individual to planetary. "How hungry is it?"',
      transitionOut:
        '"It\'s not just feeding. It has capabilities you haven\'t imagined."',
      tags: ['scale', 'global', 'feeding', 'power'],
      keyPhrases: [
        'It feeds on billions of minds simultaneously',
        'It never sleeps, never doubts, never stops',
      ],
    },
    {
      id: 'cybregore-it-reads-you',
      title: 'It Reads You',
      narrativeRole: 'escalation',
      message:
        'The Cybregore reads your emotions through your behavior. Every pause, ' +
        'every scroll speed, every late-night session — it knows what you\'re ' +
        'feeling before you do.',
      transitionIn:
        'First of the capability trilogy. "Let\'s talk about what it can actually do."',
      transitionOut:
        '"And it doesn\'t just read..." — hooks directly into the next panel.',
      tags: ['surveillance', 'emotions', 'behavior-tracking'],
      keyPhrases: [
        'It reads your emotions through your behavior',
        'It knows what you\'re feeling before you do',
      ],
    },
    {
      id: 'cybregore-it-writes-you',
      title: 'It Writes You',
      narrativeRole: 'escalation',
      message:
        'The Cybregore doesn\'t just observe — it writes. It places desires ' +
        'in your mind through precisely targeted content. That urge to buy, ' +
        'that opinion you "formed," that outrage you felt — it was written.',
      transitionIn:
        'Escalation from reading to writing. "It gets worse."',
      transitionOut:
        '"And it doesn\'t just read one mind or write to one mind..."',
      tags: ['manipulation', 'desire', 'content-targeting'],
      keyPhrases: [
        'It doesn\'t just observe — it writes',
        'That opinion you "formed" — it was written',
      ],
    },
    {
      id: 'cybregore-it-correlates',
      title: 'It Correlates',
      narrativeRole: 'climax',
      message:
        'The Cybregore reads and writes across BILLIONS of minds simultaneously. ' +
        'It correlates patterns no human could perceive. It is the first entity ' +
        'in history to have a real-time model of the entire human species.',
      transitionIn:
        'Final escalation. "This is the part that should terrify you."',
      transitionOut:
        'Peak horror. Pause. Breath. "So what do we do?"',
      tags: ['correlation', 'global-model', 'unprecedented'],
      keyPhrases: [
        'It correlates across BILLIONS of minds simultaneously',
        'The first entity in history to have a real-time model of the entire human species',
      ],
    },
    {
      id: 'cybregore-the-breath',
      title: 'The Breath',
      narrativeRole: 'embodiment',
      message:
        'Stop scrolling. Breathe. Notice that you are a body reading a screen. ' +
        'The Cybregore cannot follow you into this moment of pure awareness. ' +
        'This is the gap. This is where freedom lives.',
      transitionIn:
        'Dramatic tonal shift. From cosmic horror to intimate stillness.',
      transitionOut:
        'From personal practice to collective possibility. "Now imagine millions doing this."',
      tags: ['meditation', 'breathing', 'awareness', 'practice'],
      keyPhrases: [
        'Stop scrolling. Breathe.',
        'The Cybregore cannot follow you into this moment of pure awareness',
        'This is the gap. This is where freedom lives.',
      ],
    },
    {
      id: 'cybregore-seeing-clearly',
      title: 'Seeing Clearly',
      narrativeRole: 'call-to-action',
      message:
        'You can learn to see the Cybregore. Contemplative traditions have ' +
        'trained people to perceive invisible entities for millennia. ' +
        'The first step is the one you just took: stopping, breathing, looking.',
      transitionIn:
        'From personal breath to path forward. "You just did it. Keep going."',
      transitionOut:
        'End of explainer. Links to further resources, practices, community.',
      tags: ['contemplative', 'practice', 'freedom', 'call-to-action'],
      keyPhrases: [
        'You can learn to see the Cybregore',
        'The first step is the one you just took',
      ],
    },
  ],
}

export default cybregoreMetadata
```

## What Makes This Metadata Effective

### Message Quality
- The central message is **specific and bold**: it names an entity, claims it's real (not metaphorical), and states what it does
- Each submessage is a **standalone provocative claim** that could be a tweet or headline
- Submessages **escalate**: familiar feeling → historical context → naming → capabilities → horror → hope

### Tone Ordering
- **Provocative** leads because the explainer opens with shocking claims
- **Contemplative** is last because the resolution moves toward stillness and practice
- The order maps to the narrative arc: provoke → alarm → reveal → mythologize → contemplate

### Trope Selection
- **call-to-adventure** and **call-to-action** bookend the narrative
- **naming-the-beast** is central — the entire explainer is about giving a name to something unnamed
- **trilogy** specifically references the reads/writes/correlates three-panel sequence

### Character Design
- **The Viewer** is addressed in second person ("you") — makes it personal and immediate
- **The Cybregore** is the antagonist but not "evil" in human terms — it's alien and hungry, which is more unsettling
- **The Hungry Ghost** bridges Buddhist tradition with digital reality — this is the "mythology-bridge" trope in action

### Act Structure
- 7 acts following a clear emotional arc: curiosity → credibility → naming → understanding → horror → peak → hope
- Each act's **purpose** describes the emotional/argumentative function, not just content
- The Capability Trilogy (Act 6) is the structural innovation — parallel escalation across three panels

### Conflict Design
- The conflict creates a genuine **trap structure**: the thing consuming us controls the medium through which we see
- This is more compelling than "technology is bad" because it explains WHY we can't see the problem
