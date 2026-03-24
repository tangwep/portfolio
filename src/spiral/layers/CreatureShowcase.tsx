import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Creature, CreatureShowcaseData } from "../../shared/content";

type Props = { data: CreatureShowcaseData };

function StatsPanel({ creature, onClose }: { creature: Creature; onClose: () => void }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12 }}
      className="rounded-lg border border-orange-500/25 bg-zinc-950/95 p-3 text-sm shadow-lg"
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-base font-semibold text-zinc-100">{creature.name}</h4>
          <p className="mt-1 font-mono text-xs text-orange-300/90">{creature.hp} HP</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded border border-zinc-600 px-2 py-0.5 text-[10px] text-zinc-300 hover:bg-zinc-800"
        >
          Close
        </button>
      </div>
      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-amber-200/90">
        {creature.ability}
      </p>
      <p className="mt-1 leading-relaxed text-zinc-300">{creature.lore}</p>
    </motion.aside>
  );
}

function CreatureShowcase({ data }: Props) {
  const [selected, setSelected] = useState<Creature | null>(null);

  return (
    <div
      className="w-full overflow-visible rounded-xl bg-zinc-900/35 p-3 ring-1 ring-zinc-700/35 backdrop-blur-sm sm:p-4"
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <p className="mb-3 text-sm leading-snug text-zinc-400">{data.headline}</p>

      <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {data.creatures.map((c) => (
            <motion.button
              key={c.id}
              type="button"
              layout
              onClick={() => setSelected(c)}
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex min-h-[140px] flex-col overflow-hidden rounded-xl border border-zinc-700 bg-gradient-to-br ${c.gradient} p-3 text-left shadow-md ring-2 ring-transparent hover:ring-amber-400/40`}
            >
              <motion.div
                className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl"
                animate={{ opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative text-[10px] uppercase tracking-[0.2em] text-zinc-200/80">
                {c.id.replace(/-/g, " ")}
              </span>
              <span className="relative mt-2 text-sm font-semibold text-white">
                {c.name}
              </span>
              <span className="relative mt-auto text-[10px] text-white/80">
                {c.ability}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="min-h-[120px]">
          <AnimatePresence mode="wait">
            {selected ? (
              <StatsPanel
                key={selected.id}
                creature={selected}
                onClose={() => setSelected(null)}
              />
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-lg border border-dashed border-zinc-700 bg-zinc-900/40 p-4 text-xs text-zinc-500"
              >
                Select a silhouette to inspect stats, abilities, and design
                notes — hover for motion reads.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default CreatureShowcase;
