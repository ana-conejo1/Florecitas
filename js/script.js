/*Permite llamar a la barra de navegación en todas las páginas que se requiera*/
fetch(`/html/navbar.html`)
  .then(response => response.text()) // Se añadió return aquí
  .then(data => {
    document.querySelector(`#navbar`).innerHTML = data;
  })
  .catch(error => {
    console.log(`Error al cargar navbar:`, error);
  });

// Footer
fetch(`/html/footer.html`)
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
          <li><a class="dropdown-item" href="#">Mi cuenta</a></li>
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
          <li><a class="dropdown-item" href="/html/login.html">Iniciar sesión</a></li>
          <li><a class="dropdown-item" href="/html/form-registro-usuarios.html">Registrarse</a></li>
      `;
  }
};

function redirectTo(page) {
  window.location.href = page;
}

//###### Efecto maquina de escribir ########
// Seleccionar elementos del DOM
var app = document.getElementById('app');
var text = document.getElementById('text');

if (app) {
    var typewriter1 = new Typewriter(app, {
        loop: true
    });
    typewriter1.typeString('¡Únete a nosotras en este viaje hacia un futuro más verde!')
        .pauseFor(2500)
        .deleteAll()
        .start();
}

if (text) {
    var typewriter2 = new Typewriter(text, {
        loop: true
    });
    typewriter2.typeString('Desarrolladoras')
        .pauseFor(2500)
        .deleteAll()
        .start();
}
// Aseguramos que el script esté encapsulado dentro de una función o módulo

(function () {
  // Esto evita que las variables o funciones dentro del script interfieran con el resto del código global
  const gameIframe = document.getElementById("gameFrame");

  // Ejemplo: Agregar una acción al hacer clic en el iframe
  /*gameIframe.addEventListener('click', function() {
      alert("¡Estás jugando! ¡Buena suerte!");
  });*/

  document.addEventListener("DOMContentLoaded", function () {
    const gameIframe = document.getElementById("gameFrame");
    if (gameIframe) {
      gameIframe.addEventListener("click", function () {
        alert("¡Estás jugando! ¡Buena suerte!");
      });
    }
  });

  // También puedes incluir más lógica relacionada con el juego aquí
});
