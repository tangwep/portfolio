import content, { portfolioMeta } from "../shared/content";
import StandardLayerSection from "./StandardLayerSection";

/**
 * Linear portfolio: iterates `content.spiral` — add entries there to keep spiral + standard in sync.
 */
function StandardPortfolio() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mx-auto max-w-3xl border-b border-zinc-800/60 pb-10">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          {portfolioMeta.displayName}
        </h1>
        <p className="mt-3 text-lg font-medium text-zinc-200 sm:text-xl">
          {portfolioMeta.tagline}
        </p>
        <p className="mt-5 max-w-prose text-pretty text-[0.95rem] leading-[1.75] text-zinc-300 sm:text-base">
          {portfolioMeta.intro}
        </p>
      </header>

      <div className="mt-4">
        {content.spiral.map((item) => (
          <StandardLayerSection key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default StandardPortfolio;
