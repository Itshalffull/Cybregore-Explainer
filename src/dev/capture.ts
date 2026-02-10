import html2canvas from 'html2canvas'

/**
 * Capture a single panel DOM element as a PNG blob.
 * Uses html2canvas to render the element including CSS styling.
 */
export async function capturePanel(element: HTMLElement): Promise<Blob> {
  const canvas = await html2canvas(element, {
    backgroundColor: '#3B4540', // --color-deep-forest
    scale: 1,
    useCORS: true,
    logging: false,
    // Capture the full element even if partially off-screen
    scrollX: 0,
    scrollY: 0,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  })

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Failed to convert canvas to blob'))
      },
      'image/png',
    )
  })
}

/**
 * Capture screenshots of specific panel elements by their index.
 * Returns a Map of panel index → PNG blob.
 *
 * Panels that fail to capture (e.g. invisible, off-screen) are skipped
 * silently — the orchestrator prompt notes which screenshots are available.
 */
export async function capturePanels(
  panelIndices: number[],
  onProgress?: (current: number, total: number) => void,
): Promise<Map<number, Blob>> {
  const allPanels = document.querySelectorAll('section.panel')
  const results = new Map<number, Blob>()

  for (let i = 0; i < panelIndices.length; i++) {
    const idx = panelIndices[i]
    const el = allPanels[idx] as HTMLElement | undefined
    onProgress?.(i + 1, panelIndices.length)

    if (!el) continue

    try {
      const blob = await capturePanel(el)
      // Only keep non-trivial screenshots (> 5KB suggests actual content)
      if (blob.size > 5000) {
        results.set(idx, blob)
      }
    } catch {
      // Skip panels that fail to capture
    }
  }

  return results
}

/**
 * Download a blob as a file via a temporary link.
 */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * Download multiple files sequentially with a delay between each
 * to avoid browser download blocking.
 */
export async function downloadMultiple(
  files: { name: string; blob: Blob }[],
) {
  for (const file of files) {
    downloadBlob(file.blob, file.name)
    await new Promise((r) => setTimeout(r, 400))
  }
}
