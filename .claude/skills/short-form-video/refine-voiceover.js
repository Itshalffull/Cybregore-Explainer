/**
 * LLM Voiceover Refinement via Anthropic Claude API.
 *
 * Takes raw panel text (extracted from React components / metadata) and
 * refines it into natural spoken narration using Claude. Removes visual-only
 * content (arrows, icons, axis labels), adds brief descriptions for visuals,
 * and maintains the Dharma campaign voice.
 *
 * Used by: create-voiceover.js, claude-bridge.ts (dev mode generate endpoint)
 *
 * Requires: ANTHROPIC_API_KEY environment variable
 */

import https from 'https';

const ANTHROPIC_MODEL = 'claude-3-5-haiku-latest';
const ANTHROPIC_MAX_TOKENS = 400;

const SYSTEM_PROMPT = `You are a voiceover narration writer for the Dharma Media Campaign — a project that uses scroll-driven web explainers to wake people up to how technology is reshaping consciousness.

Your job: rewrite raw panel text into natural spoken narration that a voice actor would read while the viewer scrolls through the panel.

Rules:
- Write as if speaking directly to one person ("you", never "one" or "people")
- Keep it concise: 1-4 sentences. Match the amount of content the viewer sees on screen. Don't over-explain.
- Remove things that don't make sense spoken aloud: arrows (→, ←, ▼), bullet point markers, icon labels, chart axis labels, CSS class names, code fragments
- For visual elements the viewer would see (animated charts, counters, images), add a brief spoken description like "Watch the numbers climb" or "See the network spread"
- Preserve key phrases and campaign vocabulary (demons, cybregore, Moloch, hungry ghost, egregore, the sacred)
- Demons are literal beings, not metaphors — never say "like a demon" or "metaphorical demon"
- Bold and provocative — never academic, never hedging, never apologetic
- Second person, present tense: "You scroll through feeds. You think you're choosing."
- The tone should match the panel's narrative role (a "hook" is punchy; "mythology" is reverent; "evidence" is stark)
- If the raw text seems garbled or contains code fragments, use the panel's message and key phrases to write the narration instead
- Return ONLY the voiceover text — no labels, no quotes, no explanation`;

/**
 * Refine raw panel text into natural voiceover narration using Claude API.
 *
 * @param {Object} options
 * @param {string} options.rawText - Raw extracted text from panel component/metadata
 * @param {string} options.panelId - Panel identifier
 * @param {string} [options.panelTitle] - Human-readable panel title
 * @param {string} [options.panelMessage] - Panel's narrative message from metadata
 * @param {string} [options.narrativeRole] - Panel's role (hook, evidence, reveal, etc.)
 * @param {string} [options.explainerMessage] - Overall explainer thesis for context
 * @param {string[]} [options.keyPhrases] - Key phrases to preserve
 * @returns {Promise<string>} Refined voiceover text
 */
export async function refineVoiceover({
  rawText,
  panelId,
  panelTitle = '',
  panelMessage = '',
  narrativeRole = '',
  explainerMessage = '',
  keyPhrases = [],
}) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  }

  // Build user message with panel context
  const contextParts = [];

  if (explainerMessage) {
    contextParts.push(`Explainer thesis: ${explainerMessage}`);
  }

  contextParts.push(`Panel: "${panelTitle || panelId}"`);

  if (narrativeRole) {
    contextParts.push(`Role in narrative: ${narrativeRole}`);
  }

  if (panelMessage) {
    contextParts.push(`Panel message: ${panelMessage}`);
  }

  if (keyPhrases.length > 0) {
    contextParts.push(`Key phrases to preserve: ${keyPhrases.join(', ')}`);
  }

  contextParts.push(`\nRaw text from the panel (may contain visual-only content, code, or formatting artifacts):\n---\n${rawText}\n---`);
  contextParts.push(`\nWrite the voiceover narration for this panel:`);

  const userMessage = contextParts.join('\n');

  const requestBody = JSON.stringify({
    model: ANTHROPIC_MODEL,
    max_tokens: ANTHROPIC_MAX_TOKENS,
    system: SYSTEM_PROMPT,
    messages: [
      { role: 'user', content: userMessage },
    ],
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(requestBody),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          try {
            const err = JSON.parse(data);
            reject(new Error(`Anthropic API error (${res.statusCode}): ${err.error?.message || data.substring(0, 200)}`));
          } catch {
            reject(new Error(`Anthropic API error (${res.statusCode}): ${data.substring(0, 200)}`));
          }
          return;
        }

        try {
          const response = JSON.parse(data);
          const text = response.content?.[0]?.text;
          if (!text) {
            reject(new Error('Empty response from Anthropic API'));
            return;
          }
          resolve(text.trim());
        } catch (err) {
          reject(new Error(`Failed to parse Anthropic response: ${err.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(requestBody);
    req.end();
  });
}
