# PanelMeta Field Reference

## TypeScript Interface

```typescript
type PanelNarrativeRole =
  | 'hook' | 'evidence' | 'transition' | 'definition' | 'reveal'
  | 'anatomy' | 'escalation' | 'embodiment' | 'mythology'
  | 'climax' | 'resolution' | 'call-to-action'

interface PanelMeta {
  id: string                        // Unique panel identifier
  title: string                     // Human-readable name
  narrativeRole: PanelNarrativeRole // Role in the arc
  message: string                   // Key message this panel delivers
  transitionIn: string              // How it follows the previous panel
  transitionOut: string             // How it sets up the next panel
  tags?: string[]                   // Panel-specific tags
  keyPhrases?: string[]             // Important quotes/phrases
}
```

## Field-by-Field Guidance

### id: string
- kebab-case, unique across the entire explainer
- Convention: descriptive name, not numbered
- Good: `'language-demon-the-hook'`, `'language-demon-phoneme-invasion'`
- Bad: `'panel-1'`, `'panel-2'`

### title: string
- Short (1-4 words), evocative, not a full sentence
- Good: `'The Hook'`, `'Hungry Ghosts'`, `'It Reads You'`
- Bad: `'Introduction to the concept of language as demon'`

### narrativeRole: PanelNarrativeRole
- Must be from the allowed set
- **'hook'**: Opening provocation (typically 1 per explainer, first panel)
- **'evidence'**: Concrete data or examples that build credibility
- **'transition'**: Shifts between major sections (emotional bridge)
- **'definition'**: Explains a key concept or term
- **'reveal'**: Dramatic unveiling of the central idea
- **'anatomy'**: Breaking down the structure/components of something
- **'escalation'**: Ratcheting up tension, stakes, or scope
- **'embodiment'**: Making the concept felt (not just understood)
- **'mythology'**: Connecting to ancient/spiritual/mythological framing
- **'climax'**: Peak moment of the narrative
- **'resolution'**: Processing the climax, pivoting toward hope
- **'call-to-action'**: Final panel — what should the viewer DO?

### message: string
- 1-2 sentences stating what this panel SAYS to the viewer
- Must be specific and bold
- Bad: `"This panel introduces the concept of X"`
- Good: `"Language is not a tool you use — it is a being that uses you. It rewired your brain, controls your inner monologue, and you cannot escape it."`

### transitionIn: string
- Describes the emotional/logical connection FROM the previous panel
- For the first panel: `"Entry point. Full-screen provocation with no preamble."`
- Good: `"From intellectual understanding to visceral experience — 'but why? let's feel it.'"`
- Bad: `"Follows previous panel."`

### transitionOut: string
- Describes how this panel SETS UP the next one
- For the last panel: `"End of explainer. CTA opens external path."`
- Good: `"'And it doesn't just read...' — hooks directly into the next panel."`
- Bad: `"Leads to next panel."`

### tags?: string[]
- 2-5 tags specific to THIS panel's content
- Supplements explainer-level tags, don't repeat them

### keyPhrases?: string[]
- 1-4 memorable lines that SHOULD APPEAR in the final panel
- These are the quotable moments — what someone would screenshot
- Should match the campaign tone (bold, provocative, true)
- Good: `["Language is an evil spirit", "You cannot escape it"]`
- Bad: `["Language is interesting", "Think about language"]`

## PanelNarrativeRole Distribution Guidelines

A typical 12-18 panel explainer might use roles like this:

| Role | Typical Count | Notes |
|------|--------------|-------|
| hook | 1 | Always first |
| evidence | 2-4 | Builds credibility early |
| definition | 1-2 | Names key concepts |
| reveal | 1-2 | Central "aha" moments |
| anatomy | 1-3 | Breaking things down |
| escalation | 2-4 | Building tension |
| transition | 1-2 | Between major tonal shifts |
| mythology | 1-2 | Ancient/spiritual framing |
| embodiment | 1-2 | Experiential moments |
| climax | 1 | Peak of the narrative |
| resolution | 1 | Processing the climax |
| call-to-action | 1 | Always last |
