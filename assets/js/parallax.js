/* ==========================================================================
   Parallax ligero para las escenas del estudio de caso (caso-cecbi.html).
   Mientras el fondo de cada escena permanece fijo (position: sticky, ver
   .scene__pin en style.css), el sujeto recortado se desplaza levemente
   según el progreso de scroll dentro de esa escena, dando sensación de
   profundidad. Se degrada sin problema si JS falla: el sujeto simplemente
   queda estático en su posición base.
   ========================================================================== */
(function () {
  const items = Array.from(document.querySelectorAll(".scene"))
    .map((scene) => ({ scene, subject: scene.querySelector(".scene__subject") }))
    .filter((item) => item.subject);

  if (!items.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  let ticking = false;

  function update() {
    const vh = window.innerHeight;
    items.forEach(({ scene, subject }) => {
      const rect = scene.getBoundingClientRect();
      const total = rect.height - vh;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const shift = (progress - 0.5) * 70;
      subject.style.transform = `translateX(-50%) translateY(${shift.toFixed(1)}px)`;
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
