import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import type { WorldMapData, WorldRegion } from "../../shared/content";

type Props = { data: WorldMapData };

function LorePanel({
  region,
  onClose,
}: {
  region: WorldRegion;
  onClose: () => void;
}) {
  return (
    <div
      className="relative z-10 max-h-[min(50dvh,24rem)] overflow-y-auto rounded-lg border border-amber-500/30 bg-zinc-950/95 p-3 text-sm shadow-lg sm:text-[0.95rem]"
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-semibold text-amber-200">
          {region.name}
          {region.secret ? (
            <span className="ml-2 text-[10px] font-normal text-amber-400/80">
              concealed thread
            </span>
          ) : null}
        </h4>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded border border-zinc-600 px-2 py-0.5 text-[10px] text-zinc-300 hover:bg-zinc-800"
        >
          Close
        </button>
      </div>
      <p className="mt-2 leading-relaxed text-zinc-300">{region.lore}</p>
    </div>
  );
}

function WorldMap({ data }: Props) {
  const [selected, setSelected] = useState<WorldRegion | null>(null);

  return (
    <div
      className="relative w-full overflow-visible rounded-xl bg-zinc-900/35 p-3 ring-1 ring-zinc-700/35 backdrop-blur-sm sm:p-4"
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-2xl text-sm leading-snug text-zinc-400">{data.headline}</p>
        <p className="shrink-0 text-[10px] uppercase tracking-wider text-zinc-500">
          Wheel zoom · drag pan
        </p>
      </div>

      <div className="h-[min(48vh,400px)] w-full sm:h-[420px]">
        <TransformWrapper
          initialScale={1}
          minScale={0.65}
          maxScale={3}
          wheel={{ step: 0.12 }}
          doubleClick={{ disabled: true }}
        >
          <TransformComponent
            wrapperClass="!w-full !h-full"
            contentClass="!w-full !h-full flex items-center justify-center"
          >
            <svg
              viewBox="0 0 100 60"
              className="h-full max-h-[380px] w-full max-w-[640px] select-none"
              role="img"
              aria-label="Fictional world map"
            >
              <defs>
                <radialGradient id="land" cx="40%" cy="35%" r="70%">
                  <stop offset="0%" stopColor="#3f3f46" />
                  <stop offset="100%" stopColor="#18181b" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="0.6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect width="100" height="60" fill="url(#land)" rx="2" />
              {/* Decorative fractures */}
              <path
                d="M 0 38 Q 25 32 50 40 T 100 36"
                fill="none"
                stroke="rgba(250,204,21,0.08)"
                strokeWidth="0.4"
              />
              <path
                d="M 20 0 Q 40 20 35 60"
                fill="none"
                stroke="rgba(139,92,246,0.12)"
                strokeWidth="0.35"
              />

              {data.regions.map((r) => {
                const [x, y, w, h] = r.rect;
                return (
                  <rect
                    key={r.id}
                    x={x}
                    y={y}
                    width={w}
                    height={h}
                    rx={r.secret ? 0.8 : 1.2}
                    fill={
                      r.secret
                        ? "rgba(251,191,36,0.12)"
                        : "rgba(167,139,250,0.22)"
                    }
                    stroke={
                      r.secret
                        ? "rgba(251,191,36,0.45)"
                        : "rgba(196,181,253,0.55)"
                    }
                    strokeWidth={r.secret ? 0.25 : 0.35}
                    strokeDasharray={r.secret ? "1.2 1" : undefined}
                    className="cursor-pointer transition-all hover:fill-violet-500/35 hover:stroke-amber-200/60"
                    onClick={() => setSelected(r)}
                  />
                );
              })}
            </svg>
          </TransformComponent>
        </TransformWrapper>
      </div>

      {selected ? (
        <div className="mt-3">
          <LorePanel region={selected} onClose={() => setSelected(null)} />
        </div>
      ) : null}
    </div>
  );
}

export default WorldMap;
