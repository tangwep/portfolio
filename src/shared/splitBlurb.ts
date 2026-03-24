/** Split portfolio copy on blank lines — shared by spiral LayerShell and standard sections. */
export function splitBlurb(blurb: string): string[] {
  return blurb
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}
