import type { DevPanelNote, DevInsert, OrchestratorTask, TaskManifest } from './types'

/**
 * Maps a panel type to the appropriate /dharma-panel-* skill.
 */
function panelTypeToSkill(panelType: string): string {
  const map: Record<string, string> = {
    text: 'dharma-panel-text',
    visualization: 'dharma-panel-visualization',
    interactive: 'dharma-panel-interactive',
    mythology: 'dharma-panel-mythology',
    hybrid: 'dharma-panel-hybrid',
  }
  return map[panelType] ?? 'dharma-panel-text'
}

/**
 * Builds the task manifest from dev mode state.
 * Each note/action becomes one or more orchestrator tasks
 * routed to the correct skill.
 */
export function buildTaskManifest(
  explainerId: string,
  panelNotes: Map<number, DevPanelNote>,
  inserts: DevInsert[],
): TaskManifest {
  const tasks: OrchestratorTask[] = []

  // Process panel notes and actions
  for (const [, note] of panelNotes) {
    const hasNote = note.note.trim().length > 0

    if (note.actions.delete) {
      tasks.push({
        skill: 'dharma-micro',
        panelId: note.panelId,
        action: 'delete',
        notes: note.note || `Delete panel ${note.panelId}`,
        panelIndex: note.panelIndex,
      })
      // Skip other actions if deleting
      continue
    }

    // Edit task from notes (always emitted when there are notes,
    // even if background is also checked — they're separate skills)
    if (hasNote) {
      tasks.push({
        skill: 'dharma-panel-text', // Will be refined by orchestrator
        panelId: note.panelId,
        action: 'edit-notes',
        notes: note.note,
        panelIndex: note.panelIndex,
      })
    }

    // Background task (add or regenerate depending on whether one exists)
    if (note.actions.background) {
      const bgAction = note.hasExistingBackground
        ? 'regenerate-background'
        : 'add-background'
      const defaultNotes = note.hasExistingBackground
        ? `Regenerate the animated video background for panel ${note.panelId}`
        : `Generate an animated video background for panel ${note.panelId}`
      tasks.push({
        skill: 'create-panel-background',
        panelId: note.panelId,
        action: bgAction,
        notes: note.backgroundPrompt.trim() || defaultNotes,
        backgroundPrompt: note.backgroundPrompt.trim() || undefined,
        panelIndex: note.panelIndex,
      })
    }
  }

  // Process insert requests
  for (const insert of inserts) {
    if (!insert.note.trim()) continue
    tasks.push({
      skill: panelTypeToSkill(insert.panelType),
      panelId: `new-panel-after-${insert.afterIndex}`,
      action: 'create',
      notes: insert.note,
      panelType: insert.panelType,
      position: { afterIndex: insert.afterIndex },
    })
  }

  return {
    explainerId,
    explainerSlug: explainerId,
    timestamp: new Date().toISOString(),
    tasks,
  }
}

/**
 * Generates a prompt for a Claude Code orchestrator agent that will
 * distribute the tasks to sub-agents using the appropriate skills.
 *
 * @param screenshotFiles Map of panel index → downloaded screenshot filename.
 *   When provided, each task block includes a reference so the agent can
 *   view the current visual state of the panel before making changes.
 */
export function buildOrchestratorPrompt(
  manifest: TaskManifest,
  screenshotFiles?: Map<number, string>,
): string {
  if (manifest.tasks.length === 0) {
    return 'No tasks to process.'
  }

  const lines: string[] = [
    `# Dev Mode Task Manifest — ${manifest.explainerSlug}`,
    `Generated: ${manifest.timestamp}`,
    `Total tasks: ${manifest.tasks.length}`,
    '',
    'Distribute the following tasks to sub-agents. Each task specifies the skill to use.',
    'Launch independent tasks in parallel where possible.',
    '',
  ]

  if (screenshotFiles && screenshotFiles.size > 0) {
    lines.push(
      '> **Screenshots included.** Each task references a screenshot of the',
    )
    lines.push(
      '> panel\'s current visual state. Use the Read tool to view the image',
    )
    lines.push(
      '> file before starting work so you understand what the panel looks like.',
    )
    lines.push('')
  }

  for (let i = 0; i < manifest.tasks.length; i++) {
    const task = manifest.tasks[i]
    lines.push(`## Task ${i + 1}: ${task.action} — ${task.panelId}`)
    lines.push(`- **Skill:** /${task.skill}`)
    lines.push(`- **Action:** ${task.action}`)
    if (task.panelType) lines.push(`- **Panel type:** ${task.panelType}`)
    if (task.position)
      lines.push(
        `- **Position:** Insert after panel index ${task.position.afterIndex}`,
      )
    lines.push(`- **Notes:** ${task.notes}`)
    if (task.backgroundPrompt)
      lines.push(`- **Background prompt:** ${task.backgroundPrompt}`)

    // Find screenshot for this task's panel index
    if (screenshotFiles) {
      const panelIndex = task.panelIndex
      if (panelIndex !== undefined && screenshotFiles.has(panelIndex)) {
        lines.push(
          `- **Screenshot:** \`${screenshotFiles.get(panelIndex)}\` — view this file to see the panel's current appearance`,
        )
      }
    }

    lines.push('')
  }

  lines.push('---')
  lines.push(
    'For each task, spawn a Task agent with the appropriate skill invocation.',
  )
  lines.push(
    'Pass the panel ID, explainer slug, and notes as context to each agent.',
  )
  if (screenshotFiles && screenshotFiles.size > 0) {
    lines.push(
      'Pass the screenshot file path to each agent so it can view the current panel state.',
    )
  }
  lines.push(
    'After all tasks complete, run /dharma-test-browser to validate the changes.',
  )

  return lines.join('\n')
}
