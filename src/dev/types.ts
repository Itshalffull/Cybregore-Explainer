/** Actions that can be applied to an existing panel */
export interface PanelActions {
  delete: boolean
  background: boolean
}

/** A dev note attached to an existing panel */
export interface DevPanelNote {
  panelId: string
  panelIndex: number
  note: string
  actions: PanelActions
  /** Whether this panel already has a background (detected from DOM) */
  hasExistingBackground: boolean
  /** Description/prompt for the background (prepopulated if existing) */
  backgroundPrompt: string
}

/** A request to insert a new panel at a specific position */
export interface DevInsert {
  afterIndex: number
  panelType: 'text' | 'visualization' | 'interactive' | 'mythology' | 'hybrid'
  note: string
}

/** A single task for the orchestrator to dispatch */
export interface OrchestratorTask {
  skill: string
  panelId: string
  action:
    | 'delete'
    | 'add-background'
    | 'regenerate-background'
    | 'create'
    | 'edit-notes'
  notes: string
  panelType?: string
  position?: { afterIndex: number }
  /** Index of the panel in the DOM, used to link to screenshots */
  panelIndex?: number
  /** Background prompt/description for background tasks */
  backgroundPrompt?: string
}

/** The full manifest exported for the orchestrator */
export interface TaskManifest {
  explainerId: string
  explainerSlug: string
  timestamp: string
  tasks: OrchestratorTask[]
}

// ── Claude Code session types ───────────────────────────────────────────

/** A single SSE event from the Claude bridge. */
export interface ClaudeSessionEvent {
  type: string
  data: Record<string, unknown>
}

/** Phases the Claude session moves through. */
export type ClaudeSessionPhase =
  | 'idle'
  | 'capturing'
  | 'submitting'
  | 'running'
  | 'done'
  | 'error'
  | 'cancelled'

/** Accumulated state for a running (or completed) Claude session. */
export interface ClaudeSessionState {
  phase: ClaudeSessionPhase
  /** Human-readable status line shown in the UI */
  statusMessage: string
  /** Git branch created for this session */
  branch: string | null
  /** Messages collected from the Claude stream */
  log: ClaudeSessionEvent[]
  /** Exit code from the Claude process (null while running) */
  exitCode: number | null
}
