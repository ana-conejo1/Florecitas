/*Permite llamar a la barra de navegación en todas las páginas que se requiera*/
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

// verificar si se inicio sesion
window.onload = function () {
  const loggedInUser = JSON.parse(localStorage.getItem("login_success"));
  const userMenu = document.getElementById('userMenu');

  if (loggedInUser) {
      userMenu.innerHTML = `
          <li><a class="dropdown-item" href="#">Mi Perfil</a></li>
          <li><a class="dropdown-item" href="#">Configuración</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><button class="dropdown-item" id="signOutButton">Cerrar sesión</button></li>
      `;

      // Cerrar sesión
      document.getElementById("signOutButton").addEventListener("click", function () {
          localStorage.removeItem("login_success"); 
          alert("Has cerrado sesión.");
          window.location.reload();
      });
  } else {
      userMenu.innerHTML = `
          <li><a class="dropdown-item" href="login.html">Iniciar sesión</a></li>
          <li><a class="dropdown-item" href="register.html">Registrarse</a></li>
      `;
  }
};


function redirectTo(page) {
    window.location.href = page;
}


//Dinamismo a la parte de equipo
var swiper = new Swiper(".mySwiper",{
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

//###### Efecto maquina de escribir ########
var app = document.getElementById('app');

var typewriter = new Typewriter(app,{
  loop: true
});

typewriter.typeString('¡Únete a nosotras en este viaje hacia un futuro más verde!')
.pauseFor(1000)
.deleteAll()
.pauseFor(2500)
.deleteAll()
.start();

var text = document.getElementById('text');

  var typewriter = new Typewriter( text,{
    loop: true
  });
  
  typewriter.typeString('Desarrolladoras')
    .pauseFor(1000)
    .deleteAll()
    .pauseFor(1000)
    .deleteAll()
    .start();
  
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

// Aseguramos que el script esté encapsulado dentro de una función o módulo

(function() {
  // Esto evita que las variables o funciones dentro del script interfieran con el resto del código global
  const gameIframe = document.getElementById("gameFrame");

  // Ejemplo: Agregar una acción al hacer clic en el iframe
  gameIframe.addEventListener('click', function() {
      alert("¡Estás jugando! ¡Buena suerte!");
  });

  // También puedes incluir más lógica relacionada con el juego aquí
});
