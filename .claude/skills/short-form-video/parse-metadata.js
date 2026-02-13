/**
 * Shared metadata parser for explainer pipeline scripts.
 * Robust bracket-depth parsing that correctly handles nested arrays/objects
 * in TypeScript metadata files.
 *
 * Used by: create-short-video.js, create-voiceover.js
 */

import fs from 'fs';
import path from 'path';

/**
 * Load and parse explainer metadata from the standard file locations.
 * @param {string} slug - The explainer slug
 * @param {string} projectRoot - Absolute path to project root
 * @returns {Array<{id: string, title: string|null, message: string|null, voiceover: string|null, keyPhrases: string[]}>}
 */
export function loadMetadataPanels(slug, projectRoot) {
  const patterns = [
    path.join(projectRoot, 'src', 'explainers', `${slug}-metadata.ts`),
    path.join(projectRoot, 'src', 'explainers', slug, 'metadata.ts'),
  ];

  for (const metaPath of patterns) {
    if (fs.existsSync(metaPath)) {
      console.log(`Metadata: ${metaPath}`);
      const content = fs.readFileSync(metaPath, 'utf8');
      return parseMetadataPanels(content);
    }
  }

  console.error(`Error: Could not find metadata for "${slug}".`);
  console.error('Searched:', patterns.join('\n  '));
  process.exit(1);
}

/**
 * Parse panels from metadata file content using bracket-depth tracking.
 */
export function parseMetadataPanels(content) {
  const panels = [];
  const panelsBlock = extractBracketBlock(content, 'panels');
  if (!panelsBlock) {
    console.error('Error: No panels array found in metadata.');
    process.exit(1);
  }

  const panelStrings = extractTopLevelObjects(panelsBlock);

  for (const s of panelStrings) {
    const id = extractMetaField(s, 'id');
    const title = extractMetaField(s, 'title');
    const message = extractMetaField(s, 'message');
    const voiceover = extractMetaField(s, 'voiceover');
    const keyPhrases = extractMetaArrayField(s, 'keyPhrases');

    if (id) panels.push({ id, title, message, voiceover, keyPhrases });
  }

  return panels;
}

/**
 * Find `key: [...]` in source and return the content between the outer brackets,
 * correctly handling nested brackets at any depth.
 */
export function extractBracketBlock(source, key) {
  const re = new RegExp(`${key}\\s*:\\s*\\[`);
  const m = source.match(re);
  if (!m) return null;

  let depth = 1;
  const startIdx = m.index + m[0].length;
  for (let i = startIdx; i < source.length; i++) {
    if (source[i] === '[') depth++;
    else if (source[i] === ']') depth--;
    if (depth === 0) return source.slice(startIdx, i);
  }
  return null;
}

/**
 * Extract all top-level `{ ... }` objects from a string, handling nested braces.
 */
export function extractTopLevelObjects(str) {
  const objects = [];
  let i = 0;
  while (i < str.length) {
    if (str[i] === '{') {
      let depth = 1;
      const start = i;
      i++;
      while (i < str.length && depth > 0) {
        if (str[i] === '{') depth++;
        else if (str[i] === '}') depth--;
        i++;
      }
      objects.push(str.slice(start, i));
    } else {
      i++;
    }
  }
  return objects;
}

/**
 * Extract a string field value from an object literal string.
 */
export function extractMetaField(str, fieldName) {
  const re = new RegExp(`${fieldName}\\s*:\\s*['"\`]([\\s\\S]*?)['"\`]\\s*(?:,|\\})`);
  const m = str.match(re);
  return m ? m[1].replace(/\\n/g, '\n').replace(/\\'/g, "'") : null;
}

/**
 * Extract an array of strings field from an object literal string.
 */
export function extractMetaArrayField(str, fieldName) {
  const re = new RegExp(`${fieldName}\\s*:\\s*\\[([^\\]]*?)\\]`);
  const m = str.match(re);
  if (!m) return [];
  return m[1].split(',').map(s => s.trim().replace(/^['"`]|['"`]$/g, '')).filter(Boolean);
}
