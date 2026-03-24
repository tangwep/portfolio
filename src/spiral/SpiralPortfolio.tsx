import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CicadaCenter from "./CicadaCenter";
import SpiralOrbitChip from "./SpiralOrbitChip";
import ContentCard from "./ContentCard";
import content from "../shared/content";
import { getSpiralPosition } from "../shared/constants";

/** Keeps orbit arms inside the decorative circle without clipping at viewport edges. */
const ORBIT_SCALE = 0.62;

function SpiralPortfolio() {
  /** 0 = cicada intro; 1..spiral.length = focused layer index = depth - 1 */
  const [depth, setDepth] = useState(0);
  const spiralIndex = depth > 0 ? depth - 1 : -1;
  const parentRotationDeg =
    -(spiralIndex < 0 ? 0 : spiralIndex) * 137.5;

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDepth((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  const activeItem = spiralIndex >= 0 ? content.spiral[spiralIndex] : null;

  return (
    <section
      className="relative w-full min-h-[calc(100dvh-5rem)] overflow-x-clip overflow-y-auto pb-20 pt-2 sm:pb-24"
      onClick={() =>
        setDepth((prev) => Math.min(content.spiral.length, prev + 1))
      }
    >
      <p className="pointer-events-none absolute left-3 top-2 z-50 max-w-[min(100%-1.5rem,28rem)] text-xs uppercase tracking-[0.2em] text-zinc-300 drop-shadow-[0_1px_8px_rgba(0,0,0,0.75)] sm:left-6">
        {depth === 0
          ? "Click to enter the spiral"
          : "Click to advance · ESC to go back"}
      </p>

      {/* Rotating orbit (labels only; counter-rotated per chip). Main content is centered below. */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[46%] z-0 h-[min(78vmin,720px)] w-[min(78vmin,720px)] -translate-x-1/2 -translate-y-1/2"
        style={{ transformOrigin: "50% 50%" }}
        animate={{
          rotate: parentRotationDeg,
          scale: 1 + (spiralIndex < 0 ? 0 : spiralIndex) * 0.045,
        }}
        transition={{ type: "spring", stiffness: 68, damping: 22, mass: 0.9 }}
      >
        <div className="relative h-full w-full">
          {content.spiral.map((item, i) => {
            const { x, y, rotation } = getSpiralPosition(i + 1, ORBIT_SCALE);
            return (
              <SpiralOrbitChip
                key={item.id}
                x={x}
                y={y}
                rotation={rotation}
                parentRotationDeg={parentRotationDeg}
                label={item.title}
                intro={depth === 0}
                active={spiralIndex === i}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Viewport-centered column: cicada or full layer (never offset — no clipping). */}
      <div className="relative z-20 mx-auto flex min-h-[calc(100dvh-6rem)] w-full max-w-3xl flex-col items-center justify-center px-4 py-10 sm:max-w-[42rem] sm:px-6 sm:py-14">
        <AnimatePresence mode="wait">
          {depth === 0 ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
              className="pointer-events-none flex w-full flex-col items-center"
            >
              <CicadaCenter />
            </motion.div>
          ) : activeItem ? (
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: [0.22, 0.61, 0.36, 1] }}
              className="w-full pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <ContentCard item={activeItem} active />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default SpiralPortfolio;
