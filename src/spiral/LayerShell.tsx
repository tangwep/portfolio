import type { ReactNode } from "react";
import { splitBlurb } from "../shared/splitBlurb";

type LayerShellProps = {
  title: string;
  blurb: string;
  children: ReactNode;
};

function LayerShell({ title, blurb, children }: LayerShellProps) {
  const paragraphs = splitBlurb(blurb);

  return (
    <div className="w-full max-w-2xl space-y-6 sm:max-w-3xl">
      <header className="space-y-2">
        <h2 className="text-balance text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
          {title}
        </h2>
        <div className="space-y-3 text-pretty text-sm leading-relaxed text-zinc-300 sm:text-[0.95rem] sm:leading-[1.65]">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </header>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export default LayerShell;
