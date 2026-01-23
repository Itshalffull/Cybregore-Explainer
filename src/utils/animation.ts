/**
 * Linear interpolation with clamping
 * Maps a progress value within a range to an output range
 */
export function lerp(progress: number, start: number, end: number, outputStart: number, outputEnd: number): number {
  if (progress <= start) return outputStart
  if (progress >= end) return outputEnd
  const t = (progress - start) / (end - start)
  return outputStart + t * (outputEnd - outputStart)
}

/**
 * Multi-point linear interpolation
 * Takes arrays of input and output values and interpolates between them
 */
export function lerpMulti(progress: number, inputs: number[], outputs: number[]): number {
  if (inputs.length !== outputs.length || inputs.length < 2) {
    throw new Error('inputs and outputs must have the same length and at least 2 values')
  }

  if (progress <= inputs[0]) return outputs[0]
  if (progress >= inputs[inputs.length - 1]) return outputs[outputs.length - 1]

  // Find the segment we're in
  for (let i = 0; i < inputs.length - 1; i++) {
    if (progress >= inputs[i] && progress <= inputs[i + 1]) {
      const t = (progress - inputs[i]) / (inputs[i + 1] - inputs[i])
      return outputs[i] + t * (outputs[i + 1] - outputs[i])
    }
  }

  return outputs[outputs.length - 1]
}
