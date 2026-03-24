import type { TextCardData } from "../../shared/content";

type Props = {
  data: TextCardData;
};

function TextCard({ data }: Props) {
  return (
    <div className="w-full rounded-xl border border-zinc-700/40 bg-zinc-900/30 p-4 sm:p-5">
      {data.body ? (
        <p className="text-pretty text-sm leading-relaxed text-zinc-300 sm:text-[0.95rem]">
          {data.body}
        </p>
      ) : null}
      {data.links?.length ? (
        <ul
          className={`flex flex-wrap gap-2 ${data.body ? "mt-4" : ""}`}
        >
          {data.links.map((link) => (
            <li key={link.href + link.label}>
              <a
                href={link.href}
                className="inline-flex rounded-lg border border-zinc-600/80 bg-zinc-900/50 px-3 py-2 text-sm text-violet-200/95 transition hover:border-violet-500/40 hover:bg-zinc-800/80"
                {...(link.href.startsWith("http")
                  ? { target: "_blank" as const, rel: "noreferrer" as const }
                  : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default TextCard;
