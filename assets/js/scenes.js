/* ==========================================================================
   Control de las escenas del estudio de caso (caso-cecbi.html).

   Cada .scene tiene un .scene__pin (fondo + sujeto recortado) que debe
   verse fijo mientras esa escena cruza la pantalla, y despegarse una vez
   que el capítulo termina. Se maneja a mano en JS (en vez de
   position:sticky) porque el truco de sticky + margen negativo se rompe
   apenas un ancestro tiene overflow:hidden, y sin overflow:hidden el pin
   se desbordaba sobre el contenido siguiente al terminar la página.

   Además, mientras el pin está "fijo" (cruzando el viewport), el sujeto
   recortado se desplaza levemente según el progreso de scroll, dando un
   efecto de profundidad (parallax).
   ========================================================================== */
(function () {
  const scenes = Array.from(document.querySelectorAll(".scene"))
    .map((scene) => ({
      scene,
      pin: scene.querySelector(".scene__pin"),
      subject: scene.querySelector(".scene__subject"),
    }))
    .filter((item) => item.pin);

  if (!scenes.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ticking = false;

  function update() {
    // En Safari/Chrome móvil, la barra de direcciones cambia
    // window.innerHeight en vivo mientras se hace scroll, pero el CSS usa
    // un 100vh fijo para .scene__pin. Si ambos valores se desincronizan,
    // el pin se "suelta" en el punto equivocado y deja ver el fondo
    // oscuro de .scene detrás (franjas grises). Por eso la altura del pin
    // también se fija aquí, en JS, con el mismo valor de vh que se usa
    // para decidir cuándo despegarlo.
    const vh = window.innerHeight;

    scenes.forEach(({ scene, pin, subject }) => {
      pin.style.height = vh + "px";
      const rect = scene.getBoundingClientRect();
      let progress = 0;

      if (rect.top > 0) {
        // La escena todavía no llega arriba: el pin espera en su propio inicio.
        pin.style.position = "absolute";
        pin.style.top = "0";
        pin.style.bottom = "auto";
        pin.style.left = "0";
        pin.style.width = "100%";
        progress = 0;
      } else if (rect.bottom < vh) {
        // La escena ya terminó de cruzar: el pin queda pegado a su propio final.
        // Nota: .scene__pin fija "top: 0" en la hoja de estilos, así que hay
        // que sobreescribirlo con "auto" explícito aquí (no basta con ""),
        // o el navegador vuelve a ese top:0 y el pin queda "pegado arriba"
        // en vez de quedar pegado abajo, desapareciendo del viewport.
        pin.style.position = "absolute";
        pin.style.top = "auto";
        pin.style.bottom = "0";
        pin.style.left = "0";
        pin.style.width = "100%";
        progress = 1;
      } else {
        // La escena está cruzando el viewport: el pin se fija a la pantalla.
        pin.style.position = "fixed";
        pin.style.top = "0";
        pin.style.bottom = "";
        pin.style.left = rect.left + "px";
        pin.style.width = rect.width + "px";
        const total = rect.height - vh;
        progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      }

      if (subject && !prefersReducedMotion) {
        const shift = (progress - 0.5) * 70;
        subject.style.transform = "translateX(-50%) translateY(" + shift.toFixed(1) + "px)";
      }
    });

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", update);
  update();
})();
