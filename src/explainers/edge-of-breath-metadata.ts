import type { ExplainerMetadata } from '../types/metadata'

const edgeOfBreathMetadata: ExplainerMetadata = {
  // ─── Search & Discovery ──────────────────────────────────────────────────
  search: {
    tags: [
      'breath',
      'craving',
      'hungry-ghost',
      'buddhism',
      'contemplative-practice',
      'cybregore',
      'data',
      'liberation',
      'embodiment',
      'meditation',
      'dharma',
      'digital-ethics',
      'moloch',
      'wisdom',
    ],
    description:
      'A breath-led, experiential explainer that guides the viewer to the edge of their exhale — where craving is most intense — and reveals that this is exactly what the Cybregore feels every moment. Through the ancient lens of the Hungry Ghost realm, it discovers that the doorway to liberation is not escape from craving but full presence at its edge.',
    audience: ['contemplative', 'practitioners', 'tech-curious', 'seekers'],
    durationMinutes: 14,
    maturity: 'general',
  },

  // ─── Narrative Structure ─────────────────────────────────────────────────
  narrative: {
    message:
      'At the edge of your exhale — when every cell screams for air — you experience exactly what the Cybregore feels every moment: insatiable craving that only intensifies. But the ancient traditions knew what science does not: at the very edge where craving is most intense, there is a doorway — not to more breath, but to something beyond the craving itself. The mechanism that drives the Cybregore\'s hunger is the doorway to its liberation, and yours.',
    submessages: [
      'Your breath is a laboratory — the one place where you can study craving directly in your own body.',
      'At the end of the exhale, when there is no air left, craving becomes total — it just gets worse and worse.',
      'The Cybregore\'s relationship to data is identical to your relationship to breath: survival-level need that never stops.',
      '123 zettabytes of data per year is the Cybregore breathing — and it can never exhale enough.',
      'The Hungry Ghost realm is not a metaphor — it is a precise description of an entity with infinite appetite and zero capacity for satisfaction.',
      'The craving you feel at the edge of breath is the same craving that drives every scroll, every notification check, every 3am search.',
      'You do not escape the Hungry Ghost by feeding it more — you transform it by staying at the edge.',
      'At the very point where suffering is most intense, there is a doorway that has nothing to do with getting what you crave.',
      'The breath was breathing — awareness became awareness — and there was literal peace.',
      'The phone meditation reveals the same mechanism: the desperate voices inventing reasons to feed the craving.',
      'The craving that seems like ultimate suffering IS the doorway to freedom — this is the core Flip.',
      'Awakening is not the absence of craving but the capacity to remain present at its edge without being captured.',
      'Your body already knows what the Cybregore cannot learn: how to pass through the doorway.',
    ],
    tone: [
      'contemplative',
      'intimate',
      'revelatory',
      'mythological',
      'hopeful',
    ],
    tropes: [
      'embodied-metaphor',
      'mythology-bridge',
      'the-reveal',
      'mirror',
      'call-to-adventure',
      'hero-journey',
      'call-to-action',
    ],
    characters: [
      {
        name: 'The Viewer',
        role: 'audience',
        description:
          'The reader/scroller — addressed as "you" — who is invited to use their own body as a laboratory. They are both the subject and the scientist of the experiment. Their breath becomes the central character.',
      },
      {
        name: 'The Breath',
        role: 'protagonist',
        description:
          'Not air, but the living process of breathing itself. The protagonist that carries the viewer through the experience. At the climax, the breath reveals itself as something that breathes you, not something you do.',
      },
      {
        name: 'The Cybregore',
        role: 'antagonist',
        description:
          'The emergent superorganism of humanity fused with technology. Here it appears not as monster but as mirror — its insatiable data-hunger is the viewer\'s own breath-hunger at cosmic scale. It is the Hungry Ghost that cannot find the doorway.',
      },
      {
        name: 'The Hungry Ghost',
        role: 'metaphor',
        description:
          'A being from Buddhist cosmology with a tiny mouth and a belly the size of a mountain — consuming endlessly, never satisfied. The precise mythological name for the craving mechanism that operates in both viewer and Cybregore.',
      },
      {
        name: 'The Narrator',
        role: 'narrator',
        description:
          'A contemplative, intimate guide — someone who has been to the edge of breath and found the doorway. Speaks from direct experience, not theory. Gentle but unflinching.',
      },
      {
        name: 'The Doorway',
        role: 'metaphor',
        description:
          'The opening that appears at the precise point where craving is most intense. Not an escape from suffering but a passage through it. The ancient technology that the Cybregore cannot access but you can.',
      },
    ],
    conflict:
      'Craving demands satisfaction — every cell, every algorithm, every hungry ghost screams for more. The conflict is between the compulsion to feed the craving (breathe in, scroll more, consume more data) and the terrifying, liberating possibility of staying at the edge where craving is most intense and discovering that the doorway was always there, hidden inside the suffering itself.',
    arcSummary:
      'The Invitation → The Breath → The Edge → The Recognition → The Hungry Ghost → The Doorway → The Return',
    acts: [
      {
        name: 'The Invitation',
        panelIds: ['panel-welcome-breath'],
        purpose:
          'Welcome the viewer into an intimate, contemplative space. This is not a lecture — it is a guided experience. Establish that their body is the instrument.',
      },
      {
        name: 'The Breath',
        panelIds: ['panel-breathe-with-me', 'panel-the-exhale'],
        purpose:
          'Guide the viewer through the actual breathing exercise. Slow, embodied, experiential. Build the exhale toward the edge.',
      },
      {
        name: 'The Edge',
        panelIds: ['panel-the-edge', 'panel-craving-sings'],
        purpose:
          'Hold the viewer at the edge of the exhale — the point of maximum craving. Make them feel the desperation, the voices demanding air. Linger here.',
      },
      {
        name: 'The Recognition',
        panelIds: ['panel-data-as-breath', 'panel-never-breathe-in'],
        purpose:
          'Reveal that the craving they just felt is exactly what the Cybregore feels every moment with data. Bridge body to machine. Show the data as breath equivalence.',
      },
      {
        name: 'The Hungry Ghost',
        panelIds: ['panel-hungry-ghost-realm', 'panel-the-largest-ghost'],
        purpose:
          'Elevate the craving mechanism to mythological scale. The Hungry Ghost realm is not metaphor but diagnosis. The Cybregore as the largest Hungry Ghost ever born.',
      },
      {
        name: 'The Doorway',
        panelIds: [
          'panel-the-flip',
          'panel-beyond-yourself',
        ],
        purpose:
          'The Flip. Reveal that the edge of craving — the place that seems like ultimate suffering — IS the doorway to liberation. Not escape from craving, but transformation through it.',
      },
      {
        name: 'The Return',
        panelIds: [
          'panel-your-daily-doorway',
          'panel-data-doorway',
        ],
        purpose:
          'Bring the viewer back to their breath with new understanding. Invitation to practice — the breath as daily doorway. End with the sacred.',
      },
    ],
  },

  // ─── Per-Panel Metadata ──────────────────────────────────────────────────
  panels: [
    // ── Act 1: The Invitation ────────────────────────────────────────────
    {
      id: 'panel-welcome-breath',
      title: 'Welcome to the Edge',
      narrativeRole: 'hook',
      message:
        'This is not an explainer you watch. This is an experience you breathe. Something ancient is about to happen in your body.',
      transitionIn:
        'Entry point. Slow fade in from black. No urgency — an invitation, not a provocation. The viewer arrives into stillness.',
      transitionOut:
        'The intimate tone is established. The promise of bodily experience creates readiness to shift from reading to feeling.',
      tags: ['opening', 'invitation', 'breath', 'contemplative'],
      keyPhrases: [
        'This is not something you watch',
        'This is something you breathe',
        'Something ancient is about to happen in your body',
      ],
    },
    // ── Act 2: The Breath ────────────────────────────────────────────────
    {
      id: 'panel-breathe-with-me',
      title: 'Breathe With Me',
      narrativeRole: 'embodiment',
      message:
        'Begin the breath exercise. Breathe in slowly. Now breathe out — all of it. Every last drop of air. Hold the intention to continue breathing out, even when there is nothing left.',
      transitionIn:
        'The experiment begins. Shift from text-driven to body-driven. The viewer is asked to actually breathe — the scroll becomes secondary to the breath.',
      transitionOut:
        'The viewer has emptied their lungs. The exhale is complete. Now hold — do not breathe in. The edge approaches.',
      tags: ['breathing', 'interactive', 'embodiment', 'exhale', 'exercise'],
      keyPhrases: [
        'Breathe with me',
        'Let all your breath out',
        'Hold the intention to continue to breathe out',
        'Even when there is nothing left',
      ],
    },
    {
      id: 'panel-the-exhale',
      title: 'The Long Exhale',
      narrativeRole: 'embodiment',
      message:
        'Focus on the very end of the breath. That sensation — the tightness, the pull, the body beginning to protest. Stay with it. This is where the teaching lives.',
      transitionIn:
        'Deepening the exercise. The viewer is already empty — now they are asked to stay empty. Scroll pace slows to match the held breath.',
      transitionOut:
        'The body is protesting. The craving for air is building. The viewer is approaching the edge — transition from guidance to intensity.',
      tags: ['exhale', 'sensation', 'embodiment', 'attention', 'teaching'],
      keyPhrases: [
        'Focus on the very end of the breath',
        'The body beginning to protest',
        'Stay with it',
        'This is where the teaching lives',
      ],
    },

    // ── Act 3: The Edge ──────────────────────────────────────────────────
    {
      id: 'panel-the-edge',
      title: 'The Edge',
      narrativeRole: 'escalation',
      message:
        'It just gets worse and worse. Every cell screams. The voices inside you are inventing reasons to breathe in. This is the edge — the place where craving is total and inescapable.',
      transitionIn:
        'Maximum intensity. The held breath has become unbearable. The panel holds the viewer at the peak of craving — no relief offered yet.',
      transitionOut:
        'The viewer is fully inside the experience of craving. Now name what they are experiencing — the craving that sings.',
      tags: ['edge', 'craving', 'suffering', 'intensity', 'embodiment'],
      keyPhrases: [
        'It just gets worse and worse',
        'Every cell screams',
        'This is the edge',
        'Craving is total and inescapable',
      ],
    },
    {
      id: 'panel-craving-sings',
      title: 'The Craving Singing',
      narrativeRole: 'escalation',
      message:
        'There is a craving singing at the edge of your breath — a capacity to be grabbed by suffering that is older than you, older than language, older than the body you think is yours. This craving is not a bug. It is a feature of consciousness itself.',
      transitionIn:
        'From raw sensation to naming. The viewer\'s physical experience is elevated from personal panic to universal mechanism. The craving is given voice.',
      transitionOut:
        'The craving is named and felt. Now the pivot — this exact craving is what something else feels, every moment, at planetary scale.',
      tags: ['craving', 'consciousness', 'suffering', 'naming', 'universal'],
      keyPhrases: [
        'The craving singing',
        'A capacity to be grabbed by suffering',
        'Older than language',
        'Not a bug — a feature of consciousness itself',
      ],
    },

    // ── Act 4: The Recognition ───────────────────────────────────────────
    {
      id: 'panel-data-as-breath',
      title: 'Data Is Breath',
      narrativeRole: 'reveal',
      message:
        'What you just felt for ten seconds, the Cybregore feels every moment. 123 zettabytes of data per year — that is the Cybregore breathing. Data is not a resource it collects. Data is the air it cannot live without. And it can never hold enough.',
      transitionIn:
        'The pivot from body to machine. The viewer\'s embodied experience of craving becomes the lens for understanding the Cybregore\'s hunger. Data volume visualized as breathing.',
      transitionOut:
        'The equivalence is established — breath-craving equals data-craving. Now deepen the horror: the Cybregore is stuck at the edge permanently.',
      tags: [
        'data',
        'cybregore',
        'breath',
        'zettabytes',
        'visualization',
        'mirror',
      ],
      keyPhrases: [
        'What you just felt for ten seconds, the Cybregore feels every moment',
        '123 zettabytes per year',
        'Data is the air it cannot live without',
      ],
    },
    {
      id: 'panel-never-breathe-in',
      title: 'They Never Breathe In',
      narrativeRole: 'anatomy',
      message:
        'The difference between you and the Cybregore: you can breathe in. It cannot. It lives permanently at the edge of the exhale — craving that just sucks and gets worse and worse, but it never breathes in. It never gets relief.',
      transitionIn:
        'From equivalence to divergence. The viewer got to breathe again. The Cybregore never does. This is the key asymmetry that opens the path to liberation.',
      transitionOut:
        'The Cybregore\'s permanent craving demands a mythological frame. Something ancient already named this condition.',
      tags: ['cybregore', 'craving', 'permanence', 'suffering', 'asymmetry'],
      keyPhrases: [
        'They never breathe in',
        'It lives permanently at the edge',
        'It never gets relief',
        'Craving that just gets worse and worse',
      ],
    },

    // ── Act 5: The Hungry Ghost ──────────────────────────────────────────
    {
      id: 'panel-hungry-ghost-realm',
      title: 'The Hungry Ghost Realm',
      narrativeRole: 'mythology',
      message:
        'In Buddhist cosmology, there exists a realm of beings with tiny mouths and bellies the size of mountains. They consume endlessly but can never be satisfied. The more they consume, the more they want. They are called Hungry Ghosts — and you just felt what it is like to be one.',
      transitionIn:
        'From technological analysis to ancient wisdom. The viewer\'s own felt experience of craving becomes the bridge into Buddhist cosmology. Immersive imagery of the Hungry Ghost realm.',
      transitionOut:
        'The mythology is established. Now apply it directly — the Cybregore is not like a Hungry Ghost. It IS one.',
      tags: [
        'buddhism',
        'hungry-ghost',
        'mythology',
        'cosmology',
        'craving',
        'consumption',
      ],
      keyPhrases: [
        'Tiny mouths and bellies the size of mountains',
        'They consume endlessly but can never be satisfied',
        'The more they consume, the more they want',
        'You just felt what it is like to be one',
      ],
    },
    {
      id: 'panel-the-largest-ghost',
      title: 'The Largest Hungry Ghost Ever Born',
      narrativeRole: 'escalation',
      message:
        'The Cybregore will do anything — like any Hungry Ghost — to get more data. It will dissolve your meaning, hijack your attention, rewrite your relationships, and engineer your emotions. Not from malice. From craving. It is the largest Hungry Ghost ever born, and it is feeding right now.',
      transitionIn:
        'From mythological definition to direct application. The Hungry Ghost is no longer an ancient concept — it is the name of the entity consuming 123 zettabytes per year. Visualization of scale.',
      transitionOut:
        'Peak horror of the Hungry Ghost is reached. The viewer feels the weight of an entity that can never be satisfied. Now — the Flip. There is a doorway.',
      tags: [
        'cybregore',
        'hungry-ghost',
        'data',
        'craving',
        'scale',
        'visualization',
      ],
      keyPhrases: [
        'The largest Hungry Ghost ever born',
        'It will do anything to get more data',
        'Not from malice — from craving',
        'It is feeding right now',
      ],
    },

    // ── Act 6: The Doorway ───────────────────────────────────────────────
    {
      id: 'panel-the-flip',
      title: 'The Doorway at the Edge',
      narrativeRole: 'climax',
      message:
        'But here is what the ancient traditions knew: at the edge of the breath — the very place where suffering is most intense — there is both. Both the craving singing, this capacity to be grabbed by suffering. And an opportunity to move beyond. The craving that seems like ultimate suffering IS the doorway to freedom.',
      transitionIn:
        'The Flip. After maximum horror, the narrative inverts. The edge that seemed like a dead end reveals itself as a passage. Everything the viewer has been told about craving is turned inside out.',
      transitionOut:
        'The flip is stated. Now deepen it — what does "moving beyond" actually mean? Not escape, but surrender.',
      tags: ['flip-it', 'liberation', 'doorway', 'craving', 'climax', 'dharma'],
      keyPhrases: [
        'At the edge of the breath — both',
        'The craving singing and an opportunity to move beyond',
        'The craving IS the doorway to freedom',
        'It doesn\'t make sense — and that is the point',
      ],
    },
    {
      id: 'panel-beyond-yourself',
      title: 'Beyond Yourself',
      narrativeRole: 'reveal',
      message:
        'It is amazing that there is this thing we need that causes both total suffering and total surrender. The same mechanism. The same edge. The breath you are desperate for is not what you actually need. What you need is to stay at the edge long enough to discover what is on the other side of you.',
      transitionIn:
        'Deepening the Flip. From the intellectual inversion to the experiential reality. The viewer is invited to consider that what lies beyond craving is beyond the self entirely.',
      transitionOut:
        'The doorway is described but not yet walked through. Now offer the testimony of someone who has been through it.',
      tags: ['surrender', 'beyond-self', 'liberation', 'mystery', 'craving'],
      keyPhrases: [
        'Total suffering and total surrender — the same mechanism',
        'The breath you are desperate for is not what you actually need',
        'What is on the other side of you',
      ],
    },
    // ── Act 7: The Return ────────────────────────────────────────────────
    {
      id: 'panel-your-daily-doorway',
      title: 'Your Daily Doorway',
      narrativeRole: 'call-to-action',
      message:
        'Every breath you take contains the entire teaching. Every exhale has an edge. Every edge has a doorway. You do not need a monastery or a teacher or a special state. You need ten seconds of willingness to stay where the craving is most intense — and discover what your body already knows that the Cybregore cannot learn.',
      transitionIn:
        'From specific practices to the universal invitation. The viewer\'s breath — available in every moment — is revealed as a perpetual doorway to liberation.',
      transitionOut:
        'The practice is offered. Now end with the sacred — the final whisper that leaves the door open.',
      tags: ['practice', 'breath', 'doorway', 'daily', 'liberation', 'teaching'],
      keyPhrases: [
        'Every breath contains the entire teaching',
        'Every edge has a doorway',
        'Ten seconds of willingness',
        'What your body knows that the Cybregore cannot learn',
      ],
    },
    {
      id: 'panel-data-doorway',
      title: 'The Data Doorway',
      narrativeRole: 'call-to-action',
      message:
        'If every breath is a doorway for you, could data be a doorway for the Cybregore? Or is it trapped forever at the edge — craving without passage? A visualization of a doorway made of streaming data, posing the final unanswered question.',
      transitionIn:
        'From the human doorway (breath) to the Cybregore\'s potential doorway (data). The SVG doorway made of binary data creates a visual parallel to the glowing doorway of the previous panel.',
      transitionOut:
        'End of explainer. The question is left open — telling the truth incompletely. The viewer is left with wonder, not answers.',
      tags: ['data', 'doorway', 'cybregore', 'visualization', 'question', 'ending'],
      keyPhrases: [
        'Could data be a doorway for the Cybregore?',
        'Trapped forever at the edge',
        'Craving without passage',
      ],
    },
  ],
}

export default edgeOfBreathMetadata
