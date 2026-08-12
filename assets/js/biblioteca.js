/* ==========================================================================
   Biblioteca — investigaciones, manuales y materiales.

   Primer borrador armado a partir de publicaciones públicas de
   knowledgecommons.popcouncil.org y popcouncil.org. Cuando la Fundación
   tenga sus propios PDFs, súbelos a assets/biblioteca/ y actualiza el
   campo "url" de cada entrada para apuntar al archivo local, por ejemplo:
   url: "assets/biblioteca/guia-de-esperanza.pdf"
   ========================================================================== */

const BIBLIOTECA_DATA = [
  {
    tipo: "Estudio de caso",
    titulo: "CECBI: educar en la memoria y la identidad achi",
    autor: "Population Council Guatemala — Iniciativa RECARGA / Fundación Nueva Esperanza Río Negro",
    anio: "2024",
    resumen:
      "Cómo un sobreviviente de las masacres de Río Negro convirtió su búsqueda de justicia en un centro educativo bilingüe e intercultural en Rabinal. Estudio de caso en formato scrollytelling.",
    url: "caso-cecbi.html",
  },
  {
    tipo: "Investigación",
    titulo: "Voces de las adolescentes indígenas de Guatemala",
    autor: "Alejandra Colom et al. — Population Council",
    anio: "2003",
    resumen:
      "Estudio cualitativo y etnográfico con adolescentes mayas de 12 a 19 años que documenta las barreras de pobreza, idioma y género detrás de la deserción escolar, el matrimonio infantil y la falta de oportunidades.",
    url: "https://knowledgecommons.popcouncil.org/departments_sbsr-pgy/1332/",
  },
  {
    tipo: "Evaluación de impacto",
    titulo: "Guatemala rising, one girl at a time",
    autor: "Population Council",
    anio: "2010",
    resumen:
      "Hallazgos de la evaluación 2009–2010 de Abriendo Oportunidades: cómo el modelo de mentoras entre pares multiplicó el alcance del programa en comunidades mayas.",
    url: "https://knowledgecommons.popcouncil.org/focus_adolescents/202/",
  },
  {
    tipo: "Investigación",
    titulo: "Abriendo Oportunidades — mentoría comunitaria y bienestar de las adolescentes indígenas",
    autor: "Population Council (cluster-RCT)",
    anio: "2017–2019",
    resumen:
      "Ensayo aleatorizado por conglomerados: las participantes mostraron menor probabilidad de sufrir violencia física en el hogar y de casarse durante el programa.",
    url: "https://knowledgecommons.popcouncil.org/",
  },
  {
    tipo: "Artículo",
    titulo: "La vida social del Programa Abriendo Oportunidades en Guatemala",
    autor: "Ángel del Valle et al. — Population Council",
    anio: "2023",
    resumen:
      "Tres décadas habilitando espacios comunitarios y cívicos para niñas y mujeres indígenas: cómo los espacios seguros protegen y transforman.",
    url: "https://popcouncil.org/project/abriendo-oportunidades-opening-opportunities/",
  },
  {
    tipo: "Artículo",
    titulo: "Celebrando 20 años de Abriendo Oportunidades",
    autor: "María Isabel Mayorga — Population Council",
    anio: "2025",
    resumen:
      "Dos décadas transformando la vida de niñas indígenas en Guatemala: un repaso a la trayectoria del programa que da origen a la Fundación.",
    url:
      "https://popcouncil.org/insight/celebrating-20-years-of-abriendo-oportunidades-transforming-the-lives-of-indigenous-girls-in-guatemala/",
  },
  {
    tipo: "Artículo",
    titulo: "Programación comunitaria para niñas: equilibrio entre escala y calidad",
    autor: "Population Council",
    anio: "2024",
    resumen:
      "Reflexión regional sobre los retos de escalar programas de mentoría comunitaria como Abriendo Oportunidades sin sacrificar calidad.",
    url:
      "https://popcouncil.org/insight/community-based-adolescent-girl-programming-in-low-and-middle-income-countries-a-balancing-act-between-scale-and-quality/",
  },
  {
    tipo: "Artículo",
    titulo: "Altiplano occidental: vulnerabilidad de género frente al cambio climático",
    autor: "Ángel del Valle — Population Council",
    anio: "2023",
    resumen: "Cómo el cambio climático agrava las barreras que enfrentan niñas y mujeres indígenas en Guatemala.",
    url: "https://popcouncil.org/insight/guatemalas-western-highlands-addressing-gendered-vulnerability-to-climate-change/",
  },
  {
    tipo: "Manual y herramienta",
    titulo: "Guía de Esperanza del Programa Abriendo Oportunidades",
    autor: "Population Council",
    anio: "2021",
    resumen:
      "Guía curricular con herramientas y ejercicios para sesiones con niñas y mentoras, basada en derechos humanos, perspectiva de género e interculturalidad.",
    url: "https://knowledgecommons.popcouncil.org/departments_sbsr-pgy/1472/",
  },
  {
    tipo: "Manual y herramienta",
    titulo: "Abriendo Oportunidades: Sesión — Mi plan de vida",
    autor: "Population Council",
    anio: "2016",
    resumen: "Guía de sesión lista para facilitar con niñas sobre construcción de metas y plan de vida.",
    url: "https://knowledgecommons.popcouncil.org/departments_sbsr-pgy/619/",
  },
  {
    tipo: "Estudio de caso",
    titulo: "Abriendo Oportunidades ('Opening Opportunities')",
    autor: "Girls Not Brides",
    anio: "2019",
    resumen: "Estudio de caso sobre el modelo de mentoras y espacios seguros como estrategia de prevención del matrimonio infantil.",
    url: "https://www.girlsnotbrides.org/documents/416/Case-Study-Empower-girls-Population-Council-Guatemala.pdf",
  },
];

(function () {
  const grid = document.querySelector("[data-biblioteca-grid]");
  const filtersWrap = document.querySelector("[data-biblioteca-filters]");
  if (!grid) return;

  function render(tipo) {
    const items = tipo && tipo !== "Todos" ? BIBLIOTECA_DATA.filter((i) => i.tipo === tipo) : BIBLIOTECA_DATA;
    grid.innerHTML = items
      .map((i) => {
        const isExternal = /^https?:\/\//.test(i.url);
        const linkAttrs = isExternal ? ' target="_blank" rel="noopener"' : "";
        const linkLabel = isExternal ? "Ver fuente" : "Leer estudio de caso";
        return `
        <article class="card reveal is-visible">
          <span class="card__tag">${i.tipo}</span>
          <h3 class="card__title">${i.titulo}</h3>
          <p class="card__meta">${i.autor} · ${i.anio}</p>
          <p>${i.resumen}</p>
          <a class="card__link" href="${i.url}"${linkAttrs}>${linkLabel}</a>
        </article>`;
      })
      .join("");
  }

  if (filtersWrap) {
    const tipos = ["Todos", ...new Set(BIBLIOTECA_DATA.map((i) => i.tipo))];
    filtersWrap.innerHTML = tipos
      .map((t, i) => `<button type="button" class="${i === 0 ? "is-active" : ""}" data-tipo="${t}">${t}</button>`)
      .join("");
    filtersWrap.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      filtersWrap.querySelectorAll("button").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      render(btn.dataset.tipo);
    });
  }

  render("Todos");
})();
