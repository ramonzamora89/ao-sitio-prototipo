# Sitio web — Fundación Abriendo Oportunidades

Sitio estático (HTML/CSS/JS puro, sin frameworks ni pasos de compilación),
inspirado en la estructura de [thelifestory.org](https://thelifestory.org)
y construido con la identidad visual de la Fundación (isotipo de fases
lunares, tipografía Poppins, paleta coral / celeste / salvia / mostaza /
crema extraída de `POPCOUNCIL_PIEZAS/1. LOGOTIPO`).

## Ver el sitio en tu computadora

No hace falta instalar nada para *ver* las páginas: puedes abrir
`index.html` haciendo doble clic. Pero para que `noticias.js` y
`biblioteca.js` funcionen sin errores de CORS del navegador, es mejor
levantar un servidor local sencillo:

```bash
cd sitio-web
python3 -m http.server 8000
# luego abre http://localhost:8000 en tu navegador
```

(Cualquier otro servidor estático simple funciona igual, por ejemplo
`npx serve` si tienes Node instalado.)

## Estructura

```
sitio-web/
  index.html        portada — incluye el "Ciclo de evidencia"
  nosotros.html
  programa.html
  biblioteca.html
  noticias.html
  contacto.html
  assets/
    css/style.css        sistema de diseño (colores, tipografía, componentes)
    js/ciclo.js           visualización interactiva de la portada
    js/noticias.js        noticias (local ahora, Google Sheets después)
    js/biblioteca.js      tarjetas filtrables de la biblioteca
    js/main.js             menú móvil, animaciones al hacer scroll
    img/                   logo e isotipo (recortados de POPCOUNCIL_PIEZAS)
    fonts/                  Poppins (copiada de POPCOUNCIL_PIEZAS)
    biblioteca/             (vacío) aquí van los PDFs propios cuando existan
```

## El "Ciclo de evidencia" de la portada

Es la pieza central pedida: un círculo interactivo de 8 fases lunares
(siguiendo el motivo del isotipo) donde cada fase resume un hallazgo o
herramienta generada por el Population Council sobre Abriendo
Oportunidades — barrera, evidencia, acción e impacto, dos veces cada
una, como un ciclo. Al hacer clic se abre un panel con la cita y el
enlace a la fuente.

**Importante:** los textos y enlaces de `assets/js/ciclo.js` y
`assets/js/biblioteca.js` son un primer borrador armado con lo que se
encontró públicamente en knowledgecommons.popcouncil.org y
popcouncil.org (títulos, autores y fechas). Tú mencionaste varias de
estas piezas de memoria (el estudio cualitativo de Alejandra Colom, el
RCT de violencia, el trabajo de Ángel del Valle sobre espacios seguros,
un artículo de "Brian" que no logré identificar). Antes de publicar el
sitio, **revisa cada tarjeta y corrige título/autoría/enlace** con tus
fuentes exactas — están todas en un solo lugar en esos dos archivos
para que sea rápido editarlas.

## Conectar Noticias a Google Sheets (cuando quieras)

`assets/js/noticias.js` ya está listo para esto:

1. En Google Sheets: **Archivo → Compartir → Publicar en la web** →
   elige la hoja de noticias → formato **CSV** → copia el enlace.
2. Pega ese enlace en la constante `GOOGLE_SHEET_CSV_URL` al inicio de
   `assets/js/noticias.js`.
3. La hoja debe tener columnas, con encabezado, en este orden:
   `titulo, fecha, resumen, url, etiqueta`
4. Listo — la página usará el Sheet automáticamente y sólo mostrará la
   lista local de respaldo si el Sheet no carga.

## Subir la biblioteca de materiales propios

Cuando tengas los PDFs organizados: súbelos a `assets/biblioteca/` y
en `assets/js/biblioteca.js` cambia el campo `url` de cada entrada para
que apunte al archivo local, por ejemplo:

```js
url: "assets/biblioteca/guia-de-esperanza.pdf",
```

## Subir esto a GitHub (más adelante)

Por ahora todo vive solo en tu computadora. Cuando quieras subirlo:

```bash
cd sitio-web
git init
git add .
git commit -m "Primer borrador del sitio de la Fundación"
# luego crea el repo en GitHub y sigue las instrucciones de git remote/push
```

Si en algún momento quieres publicarlo gratis con GitHub Pages, este
sitio ya es compatible (es HTML estático) — no necesita build ni
configuración adicional.

## Pendientes conocidos

- Correo y redes sociales en `contacto.html` son marcadores de
  posición — reemplázalos por los reales.
- La sección "Equipo y gobernanza" de `nosotros.html` está vacía a
  propósito, a la espera de fotos y semblanzas.
- Revisar/confirmar todas las citas de investigación (ver arriba).
- Favicon e isotipo se generaron automáticamente recortando el PNG
  del logo horizontal a color; si prefieres exportar el isotipo
  directamente desde Illustrator (`5. IDEAS PROMOCIONALES/LOGO EN
  ILLUSTRATOR FULL COLOR/POPCOUNCIL_isotipo_fullcolor.ai`), el
  resultado será más nítido en tamaños grandes.
