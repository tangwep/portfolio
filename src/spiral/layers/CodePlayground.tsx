import { useCallback, useEffect, useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import type { CodePlaygroundData } from "../../shared/content";
import {
  bubbleSortSteps,
  insertionSortSteps,
  randomBars,
  type SortStep,
} from "./sorting";

type Algo = "bubble" | "insertion";

const CODE: Record<Algo, string> = {
  bubble: `function bubbleSort(a) {
  const n = a.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return a;
}`,
  insertion: `function insertionSort(a) {
  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = key;
  }
  return a;
}`,
};

function buildSteps(algo: Algo, values: number[]): SortStep[] {
  return algo === "bubble" ? bubbleSortSteps(values) : insertionSortSteps(values);
}

type Props = { data: CodePlaygroundData };

function CodePlayground({ data }: Props) {
  const [algo, setAlgo] = useState<Algo>("bubble");
  const [values, setValues] = useState(() => randomBars(12));
  const [speedMs, setSpeedMs] = useState(42);
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const steps = useMemo(() => buildSteps(algo, values), [algo, values]);
  const current = steps[Math.min(stepIndex, steps.length - 1)];

  const reset = useCallback(() => {
    setStepIndex(0);
    setPlaying(false);
  }, []);

  const shuffle = useCallback(() => {
    setValues(randomBars(12));
    setStepIndex(0);
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;

    if (stepIndex >= steps.length - 1) {
      const doneTimer = window.setTimeout(() => setPlaying(false), 0);
      return () => window.clearTimeout(doneTimer);
    }

    const t = window.setTimeout(() => {
      setStepIndex((i) => Math.min(i + 1, steps.length - 1));
    }, speedMs);
    return () => window.clearTimeout(t);
  }, [playing, stepIndex, steps.length, speedMs]);

  const maxVal = Math.max(...current.values, 1);

  return (
    <div
      className="flex w-full flex-col gap-4 overflow-visible rounded-xl bg-zinc-900/35 p-3 ring-1 ring-zinc-700/35 backdrop-blur-sm sm:flex-row sm:gap-4 sm:p-4"
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="text-sm leading-snug text-zinc-400">{data.headline}</p>
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-[10px] uppercase tracking-wider text-zinc-500">
            Algorithm
            <select
              value={algo}
              onChange={(e) => {
                setAlgo(e.target.value as Algo);
                setStepIndex(0);
                setPlaying(false);
              }}
              className="ml-1 rounded border border-zinc-600 bg-zinc-900 px-2 py-1 text-xs text-zinc-100"
            >
              <option value="bubble">Bubble sort</option>
              <option value="insertion">Insertion sort</option>
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              reset();
              setPlaying(true);
            }}
            className="rounded bg-violet-600 px-3 py-1 text-xs font-medium text-white hover:bg-violet-500"
          >
            Run
          </button>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="rounded border border-zinc-600 px-2 py-1 text-xs text-zinc-200 hover:bg-zinc-800"
          >
            {playing ? "Pause" : "Resume"}
          </button>
          <button
            type="button"
            onClick={shuffle}
            className="rounded border border-zinc-600 px-2 py-1 text-xs text-zinc-200 hover:bg-zinc-800"
          >
            Shuffle
          </button>
          <label className="flex items-center gap-1 text-[10px] text-zinc-500">
            Speed
            <input
              type="range"
              min={12}
              max={160}
              value={180 - speedMs}
              onChange={(e) => setSpeedMs(180 - Number(e.target.value))}
              className="w-20"
            />
          </label>
        </div>
        <div className="min-h-[200px] overflow-x-auto rounded-lg border border-zinc-700/60 bg-zinc-950/40">
          <Editor
            height="220px"
            theme="vs-dark"
            language="javascript"
            path={`sort-${algo}.js`}
            value={CODE[algo]}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 12,
              scrollBeyondLastLine: false,
              wordWrap: "on",
              lineNumbers: "off",
              folding: false,
              glyphMargin: false,
            }}
          />
        </div>
      </div>

      <div className="flex min-h-[240px] flex-1 flex-col gap-2">
        <div className="text-[10px] uppercase tracking-wider text-zinc-500">
          Bars ({current.values.length} items) — step {stepIndex + 1} /{" "}
          {steps.length}
        </div>
        <div className="flex min-h-[200px] flex-1 items-end gap-[3px] rounded-lg border border-zinc-700/60 bg-zinc-900/40 px-2 pb-2 pt-8 sm:min-h-[220px]">
          {current.values.map((v: number, i: number) => {
            const h = (v / maxVal) * 100;
            const cmp = current.compare;
            const hot =
              cmp &&
              (i === cmp[0] || i === cmp[1]);
            return (
              <motion.div
                key={i}
                className={`flex-1 rounded-t ${hot ? "bg-amber-400" : "bg-violet-500/90"}`}
                initial={false}
                animate={{ height: `${Math.max(8, h)}%` }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            );
          })}
        </div>
        <p className="text-xs leading-relaxed text-zinc-500">
          Highlighted bars show the active comparison window; swaps read as motion
          across the tape.
        </p>
      </div>
    </div>
  );
}

export default CodePlayground;
