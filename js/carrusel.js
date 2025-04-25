//Dinamismo a la parte de equipo
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      // cuando la pantalla sea >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      // cuando la pantalla sea >= 640px
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // cuando la pantalla sea >= 1024px
      1024: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  });


  /*############### CARRUSEL DE IMÁGENES ###############*/
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
  