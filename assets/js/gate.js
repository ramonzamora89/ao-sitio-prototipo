/* ==========================================================================
   Candado superficial para el prototipo compartido.
   NO es seguridad real: la contraseña vive en este archivo público y
   cualquiera que lea el código fuente puede verla. Solo busca evitar que
   alguien que llega al link por casualidad (o un buscador) vea el sitio.
   ========================================================================== */
(function () {
  var STORAGE_KEY = "ao_proto_access";
  var PASSWORD = "abriendo2026";

  if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

  document.write('<style id="gate-style">body{visibility:hidden !important;}</style>');

  window.addEventListener("DOMContentLoaded", function () {
    var overlay = document.createElement("div");
    overlay.className = "site-gate";
    overlay.innerHTML =
      '<div class="site-gate__box">' +
      '<img src="assets/img/isotipo-fullcolor.png" alt="" class="site-gate__logo" />' +
      '<p class="site-gate__title">Vista previa privada</p>' +
      '<p class="site-gate__hint">Este es un prototipo del sitio de la Fundación Abriendo Oportunidades, en construcción. Ingresa la contraseña que te compartieron.</p>' +
      '<form class="site-gate__form">' +
      '<input type="password" class="site-gate__input" placeholder="Contraseña" autocomplete="off" aria-label="Contraseña" />' +
      '<button type="submit" class="site-gate__btn">Entrar</button>' +
      "</form>" +
      '<p class="site-gate__error" hidden>Contraseña incorrecta. Intenta de nuevo.</p>' +
      "</div>";
    document.body.appendChild(overlay);

    var form = overlay.querySelector(".site-gate__form");
    var input = overlay.querySelector(".site-gate__input");
    var error = overlay.querySelector(".site-gate__error");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (input.value === PASSWORD) {
        sessionStorage.setItem(STORAGE_KEY, "1");
        overlay.remove();
        var style = document.getElementById("gate-style");
        if (style) style.remove();
      } else {
        error.hidden = false;
        input.value = "";
        input.focus();
      }
    });

    input.focus();
  });
})();
