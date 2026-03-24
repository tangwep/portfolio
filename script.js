const PHI = 1.618033988749895;
const GOLDEN_ANGLE = 137.5;
const BASE_RADIUS = 92;
const ZOOM_STEP = 0.1;

const layers = [
  {
    id: "engineering",
    title: "Engineering and Logic",
    blurb: "Structured thinking and technical craft.",
    details:
      "I design systems with clear architecture, maintainable code, and deliberate trade-offs. Precision matters as much as creativity."
  },
  {
    id: "worldbuilding",
    title: "World-Building and Narrative",
    blurb: "Ideas shaped into coherent universes.",
    details:
      "I connect themes, symbols, and narrative arcs into meaningful experiences. Every layer should communicate intent, not just aesthetics."
  },
  {
    id: "gamedev",
    title: "Game Dev and Creature Design",
    blurb: "Interactive systems and living concepts.",
    details:
      "I prototype mechanics, experiment with pacing, and build creatures as design systems. The goal is emotional impact through mechanics."
  },
  {
    id: "contact",
    title: "Contact and Presence",
    blurb: "Outer ring, direct connection.",
    details:
      "Reach out for collaboration, product engineering, or creative technical direction. This layer transitions from symbolism to action."
  }
];

const appState = {
  currentLayer: 0,
  spiralRotation: 0,
  zoomLevel: 1,
  mode: "spiral"
};

const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const modeToggle = document.getElementById("mode-toggle");
const spiralView = document.getElementById("spiral-view");
const standardView = document.getElementById("standard-view");
const spiralContainer = document.getElementById("spiral-container");
const contentCard = document.getElementById("content-card");

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
  }
}

function detectCapability() {
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);
  const cores = navigator.hardwareConcurrency || 1;
  const hasGPU = Boolean(window.WebGLRenderingContext);
  return isMobile || cores < 4 || !hasGPU ? "standard" : "spiral";
}

function getSpiralPosition(layerIndex) {
  const angleDeg = layerIndex * GOLDEN_ANGLE;
  const radius = BASE_RADIUS * Math.pow(PHI, layerIndex * 0.44);
  const angleRad = (angleDeg * Math.PI) / 180;
  const x = radius * Math.cos(angleRad);
  const y = radius * Math.sin(angleRad);

  return { x, y, angleDeg };
}

function buildSpiralLayers() {
  const fragment = document.createDocumentFragment();
  layers.forEach((layer, index) => {
    const el = document.createElement("button");
    const pos = getSpiralPosition(index + 1);

    el.type = "button";
    el.className = "spiral-layer";
    el.dataset.index = String(index);
    el.style.transform = `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) rotate(${-pos.angleDeg}deg)`;
    el.innerHTML = `<h3>${layer.title}</h3><p>${layer.blurb}</p>`;

    el.addEventListener("click", (event) => {
      event.stopPropagation();
      const targetIndex = Number(el.dataset.index) + 1;
      if (targetIndex > appState.currentLayer) {
        appState.currentLayer = targetIndex;
        applySpiralState();
      } else {
        showLayerContent(Math.max(0, targetIndex - 1));
      }
    });

    fragment.appendChild(el);
  });

  spiralContainer.innerHTML = "";
  spiralContainer.appendChild(fragment);
}

function showLayerContent(layerIndex) {
  if (layerIndex < 0 || layerIndex >= layers.length) {
    contentCard.classList.remove("visible");
    contentCard.innerHTML = "";
    return;
  }

  const layer = layers[layerIndex];
  contentCard.innerHTML = `<h2>${layer.title}</h2><p>${layer.details}</p>`;
  contentCard.classList.add("visible");
}

function applySpiralState() {
  const clamped = Math.max(0, Math.min(layers.length, appState.currentLayer));
  appState.currentLayer = clamped;
  appState.spiralRotation = -clamped * GOLDEN_ANGLE;
  appState.zoomLevel = 1 + clamped * ZOOM_STEP;

  spiralContainer.style.transform = `rotate(${appState.spiralRotation}deg) scale(${appState.zoomLevel})`;

  const nodes = spiralContainer.querySelectorAll(".spiral-layer");
  nodes.forEach((node, index) => {
    const isActive = index + 1 === clamped;
    node.classList.toggle("active", isActive);
    node.style.opacity = index + 1 <= clamped + 1 ? "1" : "0.72";
  });

  showLayerContent(clamped - 1);
}

function renderStandardView() {
  standardView.innerHTML = "";

  const intro = document.createElement("section");
  intro.className = "standard-section";
  intro.innerHTML = `
    <h2>About Me</h2>
    <p>I build technical systems and narrative-driven digital experiences with clarity, imagination, and structure.</p>
  `;
  standardView.appendChild(intro);

  layers.forEach((layer) => {
    const section = document.createElement("section");
    section.className = "standard-section";
    section.innerHTML = `<h2>${layer.title}</h2><p>${layer.details}</p>`;
    standardView.appendChild(section);
  });
}

function setMode(mode) {
  appState.mode = mode;
  const spiralActive = mode === "spiral";

  spiralView.style.display = spiralActive ? "block" : "none";
  standardView.classList.toggle("visible", !spiralActive);
  modeToggle.textContent = spiralActive ? "Switch to Standard" : "Switch to Spiral";
}

function initEvents() {
  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  modeToggle.addEventListener("click", () => {
    setMode(appState.mode === "spiral" ? "standard" : "spiral");
  });

  spiralView.addEventListener("click", () => {
    if (appState.currentLayer < layers.length) {
      appState.currentLayer += 1;
      applySpiralState();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && appState.mode === "spiral") {
      appState.currentLayer = Math.max(0, appState.currentLayer - 1);
      applySpiralState();
    }
  });
}

function init() {
  loadTheme();
  buildSpiralLayers();
  renderStandardView();
  initEvents();
  applySpiralState();
  setMode(detectCapability());
}

init();