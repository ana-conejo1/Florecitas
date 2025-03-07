document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper("#teamSection .team-carousel", {
    slidesPerView: 1, // Numero de tarjetas visibles en el carrusel
    spaceBetween: 20, // Espacio entre las tarjetas
    loop: true, // Permite que el carrusel sea infinito
    navigation: {
      nextEl: "#teamSection .swiper-button-next", // Botón de siguiente
      prevEl: "#teamSection .swiper-button-prev", // Botón de anterior
    },
    pagination: {
      el: "#teamSection .swiper-pagination", // Paginación
      clickable: true, // Permite hacer clic en los puntos de paginación
    },
  });
});

// Aseguramos que el script esté encapsulado dentro de una función o módulo

(function() {
  // Esto evita que las variables o funciones dentro del script interfieran con el resto del código global
  const gameIframe = document.getElementById("gameFrame");

  // Ejemplo: Agregar una acción al hacer clic en el iframe
  gameIframe.addEventListener('click', function() {
      alert("¡Estás jugando! ¡Buena suerte!");
  });

  // También puedes incluir más lógica relacionada con el juego aquí
})();