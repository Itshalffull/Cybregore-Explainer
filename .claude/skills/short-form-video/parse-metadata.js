/**
 * Shared metadata parser and writer for explainer pipeline scripts.
 * Robust bracket-depth parsing that correctly handles nested arrays/objects
 * in TypeScript metadata files. Also supports writing fields back to metadata.
 *
 * Used by: create-short-video.js, create-voiceover.js, claude-bridge.ts
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

// ── Metadata file location ─────────────────────────────────────────────────

/**
 * Find the metadata file path for a given explainer slug.
 * @param {string} slug
 * @param {string} projectRoot
 * @returns {string|null} Absolute path or null if not found
 */
export function findMetadataPath(slug, projectRoot) {
  const patterns = [
    path.join(projectRoot, 'src', 'explainers', `${slug}-metadata.ts`),
    path.join(projectRoot, 'src', 'explainers', slug, 'metadata.ts'),
  ];

  for (const metaPath of patterns) {
    if (fs.existsSync(metaPath)) return metaPath;
  }

  return null;
}

// ── Metadata write-back ────────────────────────────────────────────────────

/**
 * Update a specific string field on a panel object within a TypeScript metadata file.
 * Finds the panel by its `id` field, then inserts or replaces the target field.
 * Uses backtick template literals for values containing apostrophes or newlines.
 *
 * @param {string} metadataPath - Absolute path to the metadata .ts file
 * @param {string} panelId - The panel's id value to locate
 * @param {string} fieldName - Field to update (e.g., 'voiceover')
 * @param {string} fieldValue - New string value for the field
 * @returns {boolean} Whether the update was successful
 */
export function updatePanelField(metadataPath, panelId, fieldName, fieldValue) {
  const content = fs.readFileSync(metadataPath, 'utf8');

  // Find the panels array in the file
  const panelsRe = /panels\s*:\s*\[/;
  const panelsMatch = content.match(panelsRe);
  if (!panelsMatch) return false;

  const panelsStartIdx = panelsMatch.index + panelsMatch[0].length;

  // Find the specific panel by its id within the panels array
  // We need to find `id: 'panelId'` or `id: "panelId"` and then locate
  // the enclosing { ... } for that panel object
  const idPatterns = [
    `id: '${panelId}'`,
    `id: "${panelId}"`,
    `id: \`${panelId}\``,
  ];

  let panelIdIdx = -1;
  for (const pat of idPatterns) {
    const idx = content.indexOf(pat, panelsStartIdx);
    if (idx !== -1) {
      panelIdIdx = idx;
      break;
    }
  }

  if (panelIdIdx === -1) return false;

  // Walk backward from the id to find the opening { of this panel object
  let panelOpenIdx = -1;
  let depth = 0;
  for (let i = panelIdIdx - 1; i >= panelsStartIdx; i--) {
    if (content[i] === '}') depth++;
    else if (content[i] === '{') {
      if (depth === 0) {
        panelOpenIdx = i;
        break;
      }
      depth--;
    }
  }

  if (panelOpenIdx === -1) return false;

  // Walk forward from the opening { to find the matching closing }
  let panelCloseIdx = -1;
  depth = 1;
  for (let i = panelOpenIdx + 1; i < content.length; i++) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') {
      depth--;
      if (depth === 0) {
        panelCloseIdx = i;
        break;
      }
    }
  }

  if (panelCloseIdx === -1) return false;

  const panelStr = content.slice(panelOpenIdx, panelCloseIdx + 1);

  // Format the value — use backticks if it contains apostrophes or newlines
  const needsBackticks = fieldValue.includes("'") || fieldValue.includes('\n');
  const escapedValue = needsBackticks
    ? '`' + fieldValue.replace(/`/g, '\\`').replace(/\${/g, '\\${') + '`'
    : "'" + fieldValue.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";

  // Detect indentation from existing fields in this panel
  const indentMatch = panelStr.match(/\n(\s+)\w+\s*:/);
  const indent = indentMatch ? indentMatch[1] : '    ';

  const fieldLine = `${indent}${fieldName}: ${escapedValue},`;

  // Check if the field already exists in this panel
  const fieldRe = new RegExp(
    `(\\n\\s*)${fieldName}\\s*:\\s*(?:'[\\s\\S]*?'|"[\\s\\S]*?"|` + '`[\\s\\S]*?`' + `)\\s*,?`
  );
  const fieldMatch = panelStr.match(fieldRe);

  let newPanelStr;
  if (fieldMatch) {
    // Replace existing field
    newPanelStr = panelStr.replace(fieldRe, '\n' + fieldLine);
  } else {
    // Insert before the closing } — find the last real content line
    const closingBraceIdx = panelStr.lastIndexOf('}');
    // Find the position just before the closing brace (after the last field's comma/newline)
    const beforeClose = panelStr.slice(0, closingBraceIdx);
    // Ensure there's a comma on the previous line if needed
    const trimmedBefore = beforeClose.trimEnd();
    const needsComma = trimmedBefore.length > 0 &&
      !trimmedBefore.endsWith(',') &&
      !trimmedBefore.endsWith('{');

    const commaFix = needsComma ? ',' : '';
    // Find where the last content ends to insert after it
    const lastContentEnd = beforeClose.length;
    newPanelStr =
      beforeClose.slice(0, trimmedBefore.length) +
      commaFix +
      '\n' + fieldLine + '\n' +
      panelStr.slice(closingBraceIdx);
  }

  // Replace the panel in the full file content
  const newContent =
    content.slice(0, panelOpenIdx) +
    newPanelStr +
    content.slice(panelCloseIdx + 1);

  fs.writeFileSync(metadataPath, newContent, 'utf8');
  return true;
}

/**
 * Load a single panel's metadata by ID.
 * @param {string} slug
 * @param {string} projectRoot
 * @param {string} panelId
 * @returns {object|null} Panel metadata or null
 */
export function loadPanelById(slug, projectRoot, panelId) {
  const panels = loadMetadataPanels(slug, projectRoot);
  return panels.find(p => p.id === panelId) || null;
}

/**
 * Extract the narrative message (thesis) from a metadata file.
 * @param {string} slug
 * @param {string} projectRoot
 * @returns {string|null}
 */
export function loadExplainerMessage(slug, projectRoot) {
  const metaPath = findMetadataPath(slug, projectRoot);
  if (!metaPath) return null;

  const content = fs.readFileSync(metaPath, 'utf8');

  // Look for narrative.message or message field at the top level
  const narrativeBlock = extractBracketBlock(content.replace(/\[/g, '⟦').replace('narrative', 'narrative').replace(/⟦/g, '['), 'narrative');

  // Simpler: just find `message:` outside of the panels array
  const panelsIdx = content.search(/panels\s*:\s*\[/);
  const beforePanels = panelsIdx !== -1 ? content.slice(0, panelsIdx) : content;

  const msgMatch = beforePanels.match(/message\s*:\s*['"`]([\s\S]*?)['"`]\s*(?:,|\})/);
  return msgMatch ? msgMatch[1].replace(/\\n/g, '\n').replace(/\\'/g, "'") : null;
}
