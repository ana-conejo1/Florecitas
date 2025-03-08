/*Permite llamar a la barra de navegación en todas las páginas que se requiera*/
// Permite llamar a la barra de navegación en todas las páginas que se requiera
fetch(`navbar.html`)
  .then(response => response.text()) // Se añadió return aquí
  .then(data => {
    document.querySelector(`#navbar`).innerHTML = data;
  })
  .catch(error => {
    console.log(`Error al cargar navbar:`, error);
  });

// Footer
fetch(`footer.html`)
  .then(response => response.text()) // Se añadió return aquí
  .then(data => {
    document.querySelector(`#footer`).innerHTML = data;
  })
  .catch(error => {
    console.log(`Error al cargar footer:`, error);
  });

//Dinamismo a la parte de equipo
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

