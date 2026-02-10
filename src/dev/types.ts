/** Actions that can be applied to an existing panel */
export interface PanelActions {
  delete: boolean
  regenerate: boolean
  addBackground: boolean
}

/** A dev note attached to an existing panel */
export interface DevPanelNote {
  panelId: string
  panelIndex: number
  note: string
  actions: PanelActions
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
  action: 'delete' | 'regenerate' | 'add-background' | 'create' | 'edit-notes'
  notes: string
  panelType?: string
  position?: { afterIndex: number }
}

/** The full manifest exported for the orchestrator */
export interface TaskManifest {
  explainerId: string
  explainerSlug: string
  timestamp: string
  tasks: OrchestratorTask[]
}
