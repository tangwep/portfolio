import { motion } from "framer-motion";

type SpiralOrbitChipProps = {
  x: number;
  y: number;
  rotation: number;
  parentRotationDeg: number;
  label: string;
  intro: boolean;
  active: boolean;
};

/**
 * Small label on the rotating spiral orbit. Counter-rotates so text stays upright;
 * the main portfolio content lives in a separate, viewport-centered column.
 */
function SpiralOrbitChip({
  x,
  y,
  rotation,
  parentRotationDeg,
  label,
  intro,
  active,
}: SpiralOrbitChipProps) {
  const uprightDeg = -(parentRotationDeg + rotation);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ transformOrigin: "center center" }}
      initial={false}
      animate={{
        opacity: intro ? 0.48 : active ? 1 : 0.34,
        scale: active ? 1.05 : 1,
        x,
        y,
        rotate: rotation,
      }}
      transition={{ type: "spring", stiffness: 80, damping: 21, mass: 0.85 }}
    >
      <motion.div
        className="flex max-w-[10rem] flex-col items-center"
        animate={{ rotate: uprightDeg }}
        transition={{ type: "spring", stiffness: 95, damping: 22, mass: 0.82 }}
        style={{ transformOrigin: "center center" }}
      >
        <div className="rounded-lg bg-zinc-900/50 px-2.5 py-1.5 text-center shadow-sm ring-1 ring-zinc-600/35 backdrop-blur-sm">
          <p className="text-[10px] uppercase leading-tight tracking-[0.16em] text-zinc-400 sm:text-[11px]">
            {label}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SpiralOrbitChip;
