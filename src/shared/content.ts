/**
 * Single source of truth for both spiral and standard portfolios.
 *
 * To add a layer: append a new object to `spiral` with `id`, `title`,
 * `portfolioBlurb`, `componentType`, and `data` matching that type.
 * Spiral orbit and standard sections both iterate `content.spiral`.
 */
export const portfolioMeta = {
  displayName: "Rabin Kattel",
  tagline: "Technical systems & narrative-driven experiences",
  intro:
    "I design and build software with attention to architecture, clarity, and the stories interfaces tell. Below is the same substance in linear form—matching what you will find inside the spiral experience.",
};

export type CodePlaygroundData = {
  headline: string;
};

export type WorldRegion = {
  id: string;
  name: string;
  rect: [number, number, number, number];
  lore: string;
  secret?: boolean;
};

export type WorldMapData = {
  headline: string;
  regions: WorldRegion[];
};

export type Creature = {
  id: string;
  name: string;
  hp: number;
  ability: string;
  lore: string;
  gradient: string;
};

export type CreatureShowcaseData = {
  headline: string;
  creatures: Creature[];
};

export type TextCardData = {
  body: string;
  links?: { label: string; href: string }[];
};

/** Readable copy for standard + spiral (single source of truth). */
type SpiralItemBase = {
  id: string;
  title: string;
  portfolioBlurb: string;
};

export type SpiralItem =
  | (SpiralItemBase & {
      componentType: "code-playground";
      data: CodePlaygroundData;
    })
  | (SpiralItemBase & {
      componentType: "world-map";
      data: WorldMapData;
    })
  | (SpiralItemBase & {
      componentType: "creature-showcase";
      data: CreatureShowcaseData;
    })
  | (SpiralItemBase & {
      componentType: "text-card";
      data: TextCardData;
    });

const content: { spiral: SpiralItem[] } = {
  spiral: [
    {
      id: "engineering",
      title: "Engineering & logic",
      portfolioBlurb:
        "I care about correctness, maintainability, and systems that stay intelligible as they grow. I work across the full stack, from data models and APIs to interaction details—always asking what will still make sense to the next reader of the code.\n\nThe interactive panel below is a live slice of that mindset: algorithms as tangible motion, not just bullet points.",
      componentType: "code-playground",
      data: {
        headline:
          "Watch bubble and insertion sort move through the same dataset. Shuffle, change speed, and line up the code with what you see.",
      },
    },
    {
      id: "worldbuilding",
      title: "World-building & narrative",
      portfolioBlurb:
        "I treat worlds as systems: geography, history, and tone have to cohere under pressure the same way software does. Maps, timelines, and codexes are design documents—constraints that make stories richer instead of narrower.\n\nExplore the regions below the way you would a design bible: each place holds a fragment of a larger continuity.",
      componentType: "world-map",
      data: {
        headline:
          "Pan and zoom. Tap a region to open a codex entry. The hidden tile rewards curiosity—same as any well-rooted setting.",
        regions: [
          {
            id: "grey-expanse",
            name: "The Grey Expanse",
            rect: [8, 12, 26, 28],
            lore:
              "A monochrome desert where memory corrodes into dust storms. Travelers hear voices from cities that never existed.",
          },
          {
            id: "rootsea",
            name: "Rootsea Verge",
            rect: [38, 8, 30, 34],
            lore:
              "Tidal forests drink salt and exhale bioluminescent spores. Ships navigate by fungal lighthouses that dream in chorus.",
          },
          {
            id: "iron-coil",
            name: "Iron Coil",
            rect: [12, 48, 28, 38],
            lore:
              "Nomad forges drag magnetic rails across obsidian flats. Every settlement is a temporary equation solved in steel.",
          },
          {
            id: "hollow",
            name: "Hollow Choir",
            rect: [48, 46, 38, 40],
            lore:
              "Sinkhole cathedrals amplify grief into harmony. The clergy records mass in sheet music carved into stone ribs.",
          },
          {
            id: "sunscar",
            name: "Sunscar Mesa",
            rect: [72, 18, 22, 28],
            lore:
              "Bleached cliffs remember a war fought upside-down. Locals refuse to describe the sky; cartographers use silence as contour lines.",
          },
          {
            id: "echo",
            name: "Echo Debt",
            rect: [84, 76, 12, 14],
            lore:
              "You found a lacuna — a promise the world forgot it made. Nothing here is marked on any chart.",
            secret: true,
          },
        ],
      },
    },
    {
      id: "gamedev",
      title: "Game dev & creature design",
      portfolioBlurb:
        "Game work, for me, is clarity under constraints: readable silhouettes, legible mechanics, and progression that players can reason about. Creatures and encounters are part of that language—each one a small system with hooks for strategy and story.\n\nThe silhouettes below mirror how I pitch internally: motion first, then numbers, then lore—always in service of play.",
      componentType: "creature-showcase",
      data: {
        headline:
          "Hover for motion reads. Open a card for stats, ability, and design intent.",
        creatures: [
          {
            id: "void-wraith",
            name: "Void Wraith",
            hp: 840,
            ability: "Phase Shift",
            lore:
              "Collapses hitboxes when stressed, trading damage for positional reads.",
            gradient: "from-violet-600/80 to-fuchsia-900/90",
          },
          {
            id: "stone-golem",
            name: "Ash Golem",
            hp: 1280,
            ability: "Seismic Stock",
            lore:
              "Builds temporary cover from rubble; rewards players who kite in figure-eights.",
            gradient: "from-amber-700/80 to-stone-900/95",
          },
          {
            id: "ember-coil",
            name: "Ember Coil",
            hp: 620,
            ability: "Inferno Loop",
            lore:
              "Heat scales with movement speed — idle to recover, sprint to burst.",
            gradient: "from-orange-500/85 to-rose-950/90",
          },
        ],
      },
    },
    {
      id: "contact",
      title: "Contact",
      portfolioBlurb:
        "Whether you prefer a spiral or a straight line, the goal is the same: clear collaboration and work that holds up in production. Reach out for engineering, narrative tooling, prototypes, or anything that needs both imagination and rigor.\n\nUse the links below or reply from whichever channel you already trust.",
      componentType: "text-card",
      data: {
        body: "",
        links: [
          { label: "Email", href: "mailto:hello@example.com" },
          { label: "GitHub", href: "https://github.com" },
        ],
      },
    },
  ],
};

export default content;
