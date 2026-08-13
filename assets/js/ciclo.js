/* ==========================================================================
   Ciclo de Evidencia — visualización SVG interactiva de la portada.
   Ocho nodos organizados como fases lunares (siguiendo el motivo del
   isotipo de la Fundación), cada uno anclado en un hallazgo o herramienta
   generada por la investigación del Population Council en Guatemala sobre
   Abriendo Oportunidades.

   NOTA PARA QUIEN EDITE CONTENIDO: los textos y enlaces de CICLO_DATA son
   un primer borrador armado a partir de publicaciones públicas de
   knowledgecommons.popcouncil.org y popcouncil.org. Revísalos, corrige
   títulos/autores exactos y sustituye los enlaces por los PDFs propios
   de la Fundación cuando estén disponibles.
   ========================================================================== */

const CICLO_DATA = [
  {
    phase: "Luna nueva",
    category: "Barrera",
    color: "coral",
    label: "Nacer en desigualdad",
    title: "Nacer en desigualdad",
    body:
      "En el altiplano occidental de Guatemala, las niñas indígenas heredan las brechas más profundas del país: menos años de escolaridad, mayor pobreza y discriminación étnica y de género desde el nacimiento. Entender ese punto de partida fue la base para diseñar Abriendo Oportunidades.",
    source: {
      label: "Population Council — Investigación de país, Guatemala",
      url: "https://popcouncil.org/country/guatemala/",
    },
  },
  {
    phase: "Luna creciente",
    category: "Evidencia",
    color: "blue",
    label: "Voces indígenas",
    title: "Escuchar a las adolescentes indígenas",
    body:
      "El estudio cualitativo “Voices of vulnerable and underserved adolescents in Guatemala”, con Alejandra Colom entre sus investigadoras, recogió los testimonios de adolescentes mayas de 12 a 19 años y mostró cómo la pobreza, el idioma y el género limitan sus decisiones sobre educación, salud y matrimonio.",
    source: {
      label: "Colom, A. et al. — Population Council Knowledge Commons",
      url: "https://knowledgecommons.popcouncil.org/departments_sbsr-pgy/1332/",
    },
  },
  {
    phase: "Cuarto creciente",
    category: "Barrera",
    color: "coral",
    label: "Matrimonio infantil",
    title: "El matrimonio infantil trunca futuros",
    body:
      "Guatemala tiene una de las tasas de matrimonio infantil más altas de América Latina: cerca de 3 de cada 10 niñas se casan o unen antes de los 18 años. Esta evidencia orientó el trabajo de prevención de Abriendo Oportunidades en las comunidades más vulnerables.",
    source: {
      label: "UNFPA / Population Council — Guatemala",
      url: "https://www.unfpa.org/news/protecting-rights-unleashing-potential-indigenous-girls-rural-guatemala",
    },
  },
  {
    phase: "Luna gibosa creciente",
    category: "Acción",
    color: "sage",
    label: "Espacios seguros",
    title: "Espacios seguros con mentoras propias",
    body:
      "El trabajo de Ángel del Valle sobre “la vida social” del programa documenta cómo jóvenes mentoras indígenas crean espacios seguros semanales donde las niñas construyen habilidades para la vida, salud y prevención de violencia, en su propio idioma y desde su propia cultura.",
    source: {
      label: "Del Valle, Á. — Population Council, Abriendo Oportunidades",
      url: "https://popcouncil.org/project/abriendo-oportunidades-opening-opportunities/",
    },
  },
  {
    phase: "Luna llena",
    category: "Impacto",
    color: "gold",
    label: "Evidencia de impacto",
    title: "Menos violencia, medida con rigor",
    body:
      "Un ensayo aleatorizado por conglomerados (cluster-RCT) del Population Council encontró que las participantes de Abriendo Oportunidades tuvieron una probabilidad significativamente menor de sufrir violencia física en el hogar y de casarse durante el programa.",
    source: {
      label: "Population Council — Cluster-RCT, Abriendo Oportunidades",
      url: "https://knowledgecommons.popcouncil.org/",
    },
  },
  {
    phase: "Luna gibosa menguante",
    category: "Evidencia",
    color: "blue",
    label: "350 comunidades",
    title: "De un espacio a 350 comunidades",
    body:
      "La evaluación “Guatemala rising, one girl at a time” documentó cómo el modelo de mentoras entre pares permitió multiplicar el alcance: la metodología ha llegado a miles de niñas en comunidades mayas del altiplano occidental.",
    source: {
      label: "Population Council — Evaluación 2009–2010",
      url: "https://knowledgecommons.popcouncil.org/focus_adolescents/202/",
    },
  },
  {
    phase: "Cuarto menguante",
    category: "Acción",
    color: "sage",
    label: "Guías para replicar",
    title: "Guías que traducen evidencia en acción",
    body:
      "Las guías curriculares del programa —incluida la “Guía de Esperanza”— convierten la evidencia en sesiones prácticas que cualquier mentora puede facilitar: educación, salud sexual y reproductiva, soberanía alimentaria y prevención de todas las formas de violencia.",
    source: {
      label: "Population Council — Guía de Esperanza del Programa Abriendo Oportunidades",
      url: "https://knowledgecommons.popcouncil.org/departments_sbsr-pgy/1472/",
    },
  },
  {
    phase: "Luna menguante",
    category: "Impacto",
    color: "gold",
    label: "20 años de ciclo",
    title: "20 años abriendo el ciclo",
    body:
      "Dos décadas después de su primera sesión, Abriendo Oportunidades ha acompañado a miles de niñas indígenas. La Fundación nace para dar continuidad a esa evidencia y abrir el siguiente ciclo de oportunidades.",
    source: {
      label: "Mayorga, M.I. — “Celebrating 20 Years of Abriendo Oportunidades”",
      url:
        "https://popcouncil.org/insight/celebrating-20-years-of-abriendo-oportunidades-transforming-the-lives-of-indigenous-girls-in-guatemala/",
    },
  },
];

(function () {
  const wrap = document.querySelector("[data-ciclo]");
  if (!wrap) return;

  const NS = "http://www.w3.org/2000/svg";
  const SIZE = 600;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const R = 225;

  const colorVar = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim() || "#31322F";

  function svgEl(tag, attrs) {
    const el = document.createElementNS(NS, tag);
    Object.entries(attrs || {}).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
  }

  function moonIcon(cx, cy, r, lit, side, uid) {
    const g = svgEl("g", {});
    const dark = colorVar("ink");
    const litWidth = Math.max(0, lit * 2 * r);
    const litX = side === "right" ? cx + r - litWidth : cx - r;
    const clipId = `moonclip-${uid}`;

    const base = svgEl("circle", { cx, cy, r, fill: dark });
    const clip = svgEl("clipPath", { id: clipId });
    clip.appendChild(svgEl("rect", { x: litX, y: cy - r, width: litWidth, height: r * 2 }));
    const litCircle = svgEl("circle", {
      cx,
      cy,
      r,
      fill: "var(--moon-lit-color)",
      "clip-path": `url(#${clipId})`,
    });
    const outline = svgEl("circle", { cx, cy, r, fill: "none", stroke: dark, "stroke-width": 1.4 });

    g.appendChild(clip);
    g.appendChild(base);
    g.appendChild(litCircle);
    g.appendChild(outline);
    return g;
  }

  function litFor(index) {
    // 0 nueva ... 4 llena ... 7 menguante, imitando el motivo del isotipo
    const table = [0, 0.28, 0.55, 0.85, 1, 0.85, 0.55, 0.28];
    const side = index <= 4 ? "right" : "left";
    return { lit: table[index], side };
  }

  const svg = svgEl("svg", { viewBox: `0 0 ${SIZE} ${SIZE}`, role: "img", "aria-hidden": "true" });

  // --- orbitas decorativas ---
  [R + 30, R - 20].forEach((rad, i) => {
    svg.appendChild(
      svgEl("circle", {
        class: "ciclo-orbit",
        cx: CX,
        cy: CY,
        r: rad,
        "stroke-dasharray": i === 0 ? "1 10" : "none",
      })
    );
  });

  // --- centro ---
  const center = svgEl("g", { class: "ciclo-center" });
  center.appendChild(
    Object.assign(svgEl("text", { class: "ciclo-center-eyebrow", x: CX, y: CY - 34 }), {
      textContent: "Ciclo de evidencia",
    })
  );
  const titleEl = svgEl("text", { class: "ciclo-center-title", x: CX, y: CY + 4, "font-size": 26 });
  titleEl.textContent = "Abriendo";
  const titleEl2 = svgEl("text", { class: "ciclo-center-title", x: CX, y: CY + 34, "font-size": 26 });
  titleEl2.textContent = "Oportunidades";
  center.appendChild(titleEl);
  center.appendChild(titleEl2);
  const subEl = svgEl("text", { class: "ciclo-center-sub", x: CX, y: CY + 62 });
  subEl.textContent = "Toca una fase para ver la evidencia";
  center.appendChild(subEl);
  svg.appendChild(center);

  // --- nodos ---
  const nodesGroup = svgEl("g", { class: "ciclo-nodes" });
  const nodeButtons = [];

  CICLO_DATA.forEach((item, i) => {
    const angle = -90 + i * (360 / CICLO_DATA.length);
    const rad = (angle * Math.PI) / 180;
    const nx = CX + R * Math.cos(rad);
    const ny = CY + R * Math.sin(rad);
    const labelR = R + 66;
    const lx = CX + labelR * Math.cos(rad);
    const ly = CY + labelR * Math.sin(rad);
    const cosA = Math.cos(rad);
    const sinA = Math.sin(rad);

    let anchor = "middle";
    if (cosA > 0.35) anchor = "start";
    else if (cosA < -0.35) anchor = "end";

    const g = svgEl("g", {
      class: "ciclo-node",
      style: `--moon-lit-color: var(--${item.color})`,
      tabindex: "0",
      role: "button",
      "aria-label": `${item.phase}: ${item.title}`,
      "data-index": i,
    });

    g.appendChild(svgEl("circle", { class: "node-halo", cx: nx, cy: ny, r: 30 }));
    g.appendChild(moonIcon(nx, ny, 15, litFor(i).lit, litFor(i).side, i));

    const idx = svgEl("text", { class: "node-index", x: nx, y: ny + 45 });
    idx.textContent = String(i + 1).padStart(2, "0");
    idx.setAttribute("fill", "var(--ink-70)");
    idx.removeAttribute("class");
    idx.setAttribute("font-family", "var(--font)");
    idx.setAttribute("font-size", "10");
    idx.setAttribute("text-anchor", "middle");
    idx.setAttribute("font-weight", "700");
    g.appendChild(idx);

    const labelGroup = svgEl("text", {
      class: "ciclo-node-label",
      x: lx,
      y: ly - 2,
      "text-anchor": anchor,
    });
    const tagT = svgEl("tspan", { x: lx, dy: 0, class: "ciclo-node-tag" });
    tagT.setAttribute("fill", `var(--${item.color === "gold" ? "gold-dark" : item.color === "sage" ? "sage-dark" : item.color === "blue" ? "blue-dark" : "coral-dark"})`);
    tagT.setAttribute("font-size", "10.5");
    tagT.setAttribute("font-weight", "700");
    tagT.setAttribute("letter-spacing", "0.06em");
    tagT.textContent = item.category.toUpperCase();
    const labelT = svgEl("tspan", { x: lx, dy: 16 });
    labelT.setAttribute("font-size", "13");
    labelT.textContent = item.label;
    labelGroup.appendChild(tagT);
    labelGroup.appendChild(labelT);
    g.appendChild(labelGroup);

    g.addEventListener("click", () => openPanel(i, g));
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openPanel(i, g);
      }
    });

    nodesGroup.appendChild(g);
    nodeButtons.push(g);
  });
  svg.appendChild(nodesGroup);
  wrap.appendChild(svg);

  // --- leyenda ---
  const legendWrap = document.querySelector("[data-ciclo-legend]");
  if (legendWrap) {
    const seen = new Map();
    CICLO_DATA.forEach((item) => {
      if (!seen.has(item.category)) seen.set(item.category, item.color);
    });
    seen.forEach((color, category) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.innerHTML = `<span class="dot" style="background:var(--${color})"></span>${category}`;
      btn.addEventListener("click", () => {
        const firstIndex = CICLO_DATA.findIndex((d) => d.category === category);
        if (firstIndex > -1) openPanel(firstIndex, btn);
      });
      legendWrap.appendChild(btn);
    });
  }

  // --- tooltip de detalle ---
  const overlay = document.querySelector("[data-ciclo-overlay]");
  const panel = document.querySelector("[data-ciclo-panel]");
  let currentIndex = 0;
  let currentAnchor = null;

  function positionPanel(anchorEl) {
    if (!anchorEl || !panel.getBoundingClientRect) return;
    if (window.innerWidth <= 640) {
      // en móvil el tooltip es una hoja inferior de ancho completo,
      // posicionada enteramente por CSS: no calcular left/top anclados.
      panel.style.left = "";
      panel.style.top = "";
      return;
    }
    const margin = 14;
    const anchorRect = anchorEl.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const anchorCX = anchorRect.left + anchorRect.width / 2;
    const anchorCY = anchorRect.top + anchorRect.height / 2;

    let left;
    if (anchorCX < vw / 2) {
      left = anchorRect.right + margin;
      if (left + panelRect.width > vw - margin) left = vw - margin - panelRect.width;
    } else {
      left = anchorRect.left - margin - panelRect.width;
      if (left < margin) left = margin;
    }
    left = Math.max(margin, Math.min(left, vw - margin - panelRect.width));

    let top = anchorCY - panelRect.height / 2;
    top = Math.max(margin, Math.min(top, vh - margin - panelRect.height));

    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
  }

  function renderPanel(i) {
    const item = CICLO_DATA[i];
    currentIndex = i;
    nodeButtons.forEach((n, ni) => n.classList.toggle("is-active", ni === i));

    panel.querySelector("[data-panel-kicker]").textContent = `${item.phase} · ${item.category}`;
    panel.querySelector("[data-panel-kicker]").style.color = `var(--${item.color === "gold" ? "gold-dark" : item.color === "sage" ? "sage-dark" : item.color === "blue" ? "blue-dark" : "coral-dark"})`;
    panel.querySelector("[data-panel-title]").textContent = item.title;
    panel.querySelector("[data-panel-body]").textContent = item.body;
    const link = panel.querySelector("[data-panel-link]");
    link.href = item.source.url;
    panel.querySelector("[data-panel-source-label]").textContent = item.source.label;

    const phaseIconWrap = panel.querySelector("[data-panel-phase-icon]");
    phaseIconWrap.innerHTML = "";
    phaseIconWrap.style.background = "var(--paper)";
    const iconSvg = svgEl("svg", { viewBox: "0 0 56 56", width: "56", height: "56" });
    iconSvg.style.setProperty("--moon-lit-color", `var(--${item.color})`);
    const { lit, side } = litFor(i);
    iconSvg.appendChild(moonIcon(28, 28, 26, lit, side, `panel-${i}`));
    phaseIconWrap.appendChild(iconSvg);
  }

  function openPanel(i, anchorEl) {
    renderPanel(i);
    currentAnchor = anchorEl || nodeButtons[i];
    overlay.classList.add("is-open");
    requestAnimationFrame(() => positionPanel(currentAnchor));
    panel.querySelector(".ciclo-panel__close").focus();
    window.addEventListener("scroll", closePanel, { once: true, passive: true });
    window.addEventListener("resize", closePanel, { once: true });
  }

  function closePanel() {
    if (!overlay.classList.contains("is-open")) return;
    overlay.classList.remove("is-open");
    nodeButtons.forEach((n) => n.classList.remove("is-active"));
    currentAnchor?.focus?.();
    currentAnchor = null;
  }

  document.addEventListener("click", (e) => {
    if (!overlay?.classList.contains("is-open")) return;
    const t = e.target;
    if (panel.contains(t)) return;
    if (t.closest && (t.closest(".ciclo-node") || t.closest(".ciclo-legend button"))) return;
    closePanel();
  });
  panel?.querySelector(".ciclo-panel__close")?.addEventListener("click", closePanel);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay?.classList.contains("is-open")) closePanel();
  });
  panel?.querySelector("[data-panel-prev]")?.addEventListener("click", () => {
    const newIndex = (currentIndex - 1 + CICLO_DATA.length) % CICLO_DATA.length;
    renderPanel(newIndex);
    currentAnchor = nodeButtons[newIndex];
    positionPanel(currentAnchor);
  });
  panel?.querySelector("[data-panel-next]")?.addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % CICLO_DATA.length;
    renderPanel(newIndex);
    currentAnchor = nodeButtons[newIndex];
    positionPanel(currentAnchor);
  });
})();
