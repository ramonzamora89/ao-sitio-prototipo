/* ==========================================================================
   Noticias — por ahora usa una lista local. Estructurado para poder
   conectarse a un Google Sheet publicado como CSV sin rehacer la página.

   CÓMO CONECTAR GOOGLE SHEETS MÁS ADELANTE:
   1. En Google Sheets: Archivo → Compartir → Publicar en la web.
      Elige la hoja de "Noticias" y el formato CSV. Copia el link.
   2. Pega ese link en GOOGLE_SHEET_CSV_URL más abajo (reemplaza "").
   3. La hoja debe tener estas columnas, en este orden, con encabezado:
      titulo, fecha, resumen, url, etiqueta
   4. Listo — al recargar la página, loadNoticias() usará el Sheet y sólo
      caerá de vuelta a NOTICIAS_FALLBACK si la hoja no carga.
   ========================================================================== */

const GOOGLE_SHEET_CSV_URL = ""; // <- pega aquí el link "publicado como CSV" cuando exista

// Contenido de ejemplo mientras se conecta la fuente propia: publicaciones
// reales y recientes del Population Council sobre Abriendo Oportunidades.
const NOTICIAS_FALLBACK = [
  {
    titulo: "Celebrando 20 años de Abriendo Oportunidades",
    fecha: "2025-08-08",
    resumen:
      "Population Council repasa dos décadas transformando la vida de niñas indígenas en Guatemala a través del programa que hoy da origen a la Fundación.",
    url:
      "https://popcouncil.org/insight/celebrating-20-years-of-abriendo-oportunidades-transforming-the-lives-of-indigenous-girls-in-guatemala/",
    etiqueta: "Population Council",
  },
  {
    titulo: "Programas comunitarios para niñas: equilibrio entre escala y calidad",
    fecha: "2024-10-11",
    resumen:
      "Un análisis regional sobre cómo crecer programas de mentoría comunitaria como Abriendo Oportunidades sin perder calidad ni cercanía.",
    url:
      "https://popcouncil.org/insight/community-based-adolescent-girl-programming-in-low-and-middle-income-countries-a-balancing-act-between-scale-and-quality/",
    etiqueta: "Population Council",
  },
  {
    titulo: "Altiplano occidental: vulnerabilidad de género frente al cambio climático",
    fecha: "2023-01-17",
    resumen:
      "Ángel del Valle analiza cómo el cambio climático agrava las barreras que enfrentan las niñas y mujeres indígenas en el occidente de Guatemala.",
    url:
      "https://popcouncil.org/insight/guatemalas-western-highlands-addressing-gendered-vulnerability-to-climate-change/",
    etiqueta: "Population Council",
  },
];

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (field !== "" || row.length) {
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      }
      if (c === "\r" && text[i + 1] === "\n") i++;
    } else {
      field += c;
    }
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

async function loadNoticias() {
  if (!GOOGLE_SHEET_CSV_URL) return NOTICIAS_FALLBACK;
  try {
    const res = await fetch(GOOGLE_SHEET_CSV_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("respuesta no válida");
    const text = await res.text();
    const rows = parseCSV(text).filter((r) => r.length && r.some((c) => c.trim()));
    const [header, ...body] = rows;
    const idx = (name) => header.findIndex((h) => h.trim().toLowerCase() === name);
    const iTitulo = idx("titulo");
    const iFecha = idx("fecha");
    const iResumen = idx("resumen");
    const iUrl = idx("url");
    const iEtiqueta = idx("etiqueta");
    const parsed = body.map((r) => ({
      titulo: r[iTitulo] || "",
      fecha: r[iFecha] || "",
      resumen: r[iResumen] || "",
      url: r[iUrl] || "#",
      etiqueta: r[iEtiqueta] || "Noticia",
    }));
    return parsed.length ? parsed : NOTICIAS_FALLBACK;
  } catch (err) {
    console.warn("No se pudo cargar el Google Sheet de noticias, usando lista local.", err);
    return NOTICIAS_FALLBACK;
  }
}

function formatFecha(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("es-GT", { year: "numeric", month: "long", day: "numeric" });
}

function renderNoticias(items, container, limit) {
  const list = limit ? items.slice(0, limit) : items;
  container.innerHTML = list
    .map(
      (n) => `
      <article class="card reveal">
        <span class="card__tag">${n.etiqueta || "Noticia"}</span>
        <h3 class="card__title">${n.titulo}</h3>
        <p class="card__meta">${formatFecha(n.fecha)}</p>
        <p>${n.resumen}</p>
        <a class="card__link" href="${n.url}" target="_blank" rel="noopener">Leer más</a>
      </article>`
    )
    .join("");
  container.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
}

document.querySelectorAll("[data-noticias-grid]").forEach(async (container) => {
  const limit = container.dataset.limit ? Number(container.dataset.limit) : undefined;
  const items = await loadNoticias();
  renderNoticias(items, container, limit);
});
