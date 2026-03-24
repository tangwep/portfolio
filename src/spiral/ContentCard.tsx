import type { SpiralItem } from "../shared/content";
import LayerShell from "./LayerShell";
import InteractiveBlock from "../shared/InteractiveBlock";

type ContentCardProps = {
  item: SpiralItem;
  active: boolean;
};

function ContentCard({ item, active }: ContentCardProps) {
  if (!active) return null;

  return (
    <LayerShell title={item.title} blurb={item.portfolioBlurb}>
      <InteractiveBlock item={item} />
    </LayerShell>
  );
}

export default ContentCard;
