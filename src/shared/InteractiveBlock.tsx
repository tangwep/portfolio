import type { SpiralItem } from "./content";
import CodePlayground from "../spiral/layers/CodePlayground";
import WorldMap from "../spiral/layers/WorldMap";
import CreatureShowcase from "../spiral/layers/CreatureShowcase";
import TextCard from "../spiral/layers/TextCard";

type InteractiveBlockProps = {
  item: SpiralItem;
};

/**
 * Renders the interactive experience for a spiral item — same component tree in
 * spiral (inside LayerShell) and standard (inside StandardLayerSection).
 */
function InteractiveBlock({ item }: InteractiveBlockProps) {
  switch (item.componentType) {
    case "code-playground":
      return <CodePlayground data={item.data} />;
    case "world-map":
      return <WorldMap data={item.data} />;
    case "creature-showcase":
      return <CreatureShowcase data={item.data} />;
    case "text-card":
      return <TextCard data={item.data} />;
  }
}

export default InteractiveBlock;
