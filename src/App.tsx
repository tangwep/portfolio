import { useState } from "react";
import SpiralPortfolio from "./spiral/SpiralPortfolio.tsx";
import StandardPortfolio from "./standard/StandardPortfolio.tsx";

type Mode = "spiral" | "standard";

function detectCapability(): Mode {
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);
  const cores = navigator.hardwareConcurrency || 1;
  const hasGPU = typeof window.WebGLRenderingContext !== "undefined";
  return isMobile || cores < 4 || !hasGPU ? "standard" : "spiral";
}

function App() {
  const [mode, setMode] = useState<Mode>(() => detectCapability());

  return (
    <main className="min-h-screen overflow-x-clip bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <h1 className="text-sm uppercase tracking-[0.25em] text-zinc-300">
          Rabin Kattel
        </h1>
        <button
          type="button"
          onClick={() =>
            setMode((current) => (current === "spiral" ? "standard" : "spiral"))
          }
          className="rounded border border-zinc-700 px-3 py-1.5 text-sm text-zinc-100 transition hover:bg-zinc-800"
        >
          Switch to {mode === "spiral" ? "Standard" : "Spiral"}
        </button>
      </div>
      {mode === "spiral" ? <SpiralPortfolio /> : <StandardPortfolio />}
    </main>
  );
}

export default App;
