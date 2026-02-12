/**
 * Browser-side client for the Claude Code bridge.
 *
 * Uses fetch() + ReadableStream to consume SSE events from the Vite
 * dev server middleware at /api/claude/*.
 */

import type { TaskManifest, ClaudeSessionEvent } from './types'

export interface ScreenshotPayload {
  filename: string
  base64: string
}

export interface SubmitOptions {
  manifest: TaskManifest
  prompt: string
  screenshots?: ScreenshotPayload[]
  branchPrefix?: string
  onEvent: (event: ClaudeSessionEvent) => void
}

/**
 * Submit a task manifest to the local Claude Code process.
 * Returns a promise that resolves when the session ends.
 * The caller receives real-time events via `onEvent`.
 */
export async function submitToClaude(opts: SubmitOptions): Promise<void> {
  const { manifest, prompt, screenshots, branchPrefix, onEvent } = opts

  const res = await fetch('/api/claude/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ manifest, prompt, screenshots, branchPrefix }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || `HTTP ${res.status}`)
  }

  if (!res.body) throw new Error('No response body (SSE stream expected)')

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })

    // Parse SSE frames: "event: <type>\ndata: <json>\n\n"
    const frames = buffer.split('\n\n')
    buffer = frames.pop() || '' // keep incomplete frame

    for (const frame of frames) {
      if (!frame.trim()) continue

      let eventType = 'message'
      let dataStr = ''

      for (const line of frame.split('\n')) {
        if (line.startsWith('event: ')) {
          eventType = line.slice(7).trim()
        } else if (line.startsWith('data: ')) {
          dataStr += line.slice(6)
        }
      }

      if (!dataStr) continue

      try {
        const data = JSON.parse(dataStr)
        onEvent({ type: eventType, data })
      } catch {
        onEvent({ type: eventType, data: { text: dataStr } })
      }
    }
  }
}

/** Cancel a running Claude session. */
export async function cancelClaude(): Promise<{ cancelled: boolean }> {
  const res = await fetch('/api/claude/cancel', { method: 'POST' })
  return res.json()
}

/** Check if a Claude session is currently running. */
export async function getClaudeStatus(): Promise<{
  running: boolean
  branch: string | null
}> {
  const res = await fetch('/api/claude/status')
  return res.json()
}

/**
 * Convert a Blob to a base64 string (without the data-url prefix).
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      // Strip "data:<mime>;base64," prefix
      resolve(result.split(',')[1] || '')
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
