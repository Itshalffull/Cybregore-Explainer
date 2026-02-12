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
