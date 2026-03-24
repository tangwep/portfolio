import type { SpiralItem } from "../shared/content";
import { splitBlurb } from "../shared/splitBlurb";
import InteractiveBlock from "../shared/InteractiveBlock";

type Props = {
  item: SpiralItem;
};

/**
 * One portfolio section — same blurb + interactive block as the spiral view
 * (LayerShell + InteractiveBlock), with standard-page typography.
 */
function StandardLayerSection({ item }: Props) {
  const paragraphs = splitBlurb(item.portfolioBlurb);

  return (
    <article className="border-b border-zinc-800/60 py-10 last:border-b-0 last:pb-4">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-3">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            {item.title}
          </h2>
          <div className="space-y-4 text-pretty text-[0.95rem] leading-[1.7] text-zinc-300 sm:text-base sm:leading-[1.75]">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </header>
        <div className="pt-2">
          <InteractiveBlock item={item} />
        </div>
      </div>
    </article>
  );
}

export default StandardLayerSection;
