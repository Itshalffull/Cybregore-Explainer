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
      })
      // Skip other actions if deleting
      continue
    }

    if (note.actions.regenerate) {
      tasks.push({
        skill: 'dharma-panel-text', // Will be refined by orchestrator based on panel type
        panelId: note.panelId,
        action: 'regenerate',
        notes:
          note.note || `Regenerate panel ${note.panelId} with improvements`,
      })
    }

    if (note.actions.addBackground) {
      tasks.push({
        skill: 'create-panel-background',
        panelId: note.panelId,
        action: 'add-background',
        notes:
          note.note ||
          `Generate an animated video background for panel ${note.panelId}`,
      })
    }

    // If only notes (no checkboxes), create an edit task
    if (
      hasNote &&
      !note.actions.delete &&
      !note.actions.regenerate &&
      !note.actions.addBackground
    ) {
      tasks.push({
        skill: 'dharma-panel-text', // Will be refined by orchestrator
        panelId: note.panelId,
        action: 'edit-notes',
        notes: note.note,
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
 */
export function buildOrchestratorPrompt(manifest: TaskManifest): string {
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
    lines.push('')
  }

  lines.push('---')
  lines.push(
    'For each task, spawn a Task agent with the appropriate skill invocation.',
  )
  lines.push(
    'Pass the panel ID, explainer slug, and notes as context to each agent.',
  )
  lines.push(
    'After all tasks complete, run /dharma-test-browser to validate the changes.',
  )

  return lines.join('\n')
}
