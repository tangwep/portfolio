export const PHI = 1.618033988749895;
export const GOLDEN_ANGLE = 137.5;
export const SPIRAL_TIGHTNESS = 50;

/** `orbitScale` shrinks arm length so orbit chips stay inside the viewport. */
export function getSpiralPosition(layerIndex: number, orbitScale = 1) {
  const angle = layerIndex * GOLDEN_ANGLE;
  const radius = SPIRAL_TIGHTNESS * Math.pow(PHI, layerIndex) * orbitScale;
  const radians = (angle * Math.PI) / 180;
  const x = radius * Math.cos(radians);
  const y = radius * Math.sin(radians);
  return { x, y, rotation: angle };
}
