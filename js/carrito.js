// Función para agregar productos al carrito 
function agregarAlCarrito(boton) {
  const nombre = boton.getAttribute('data-nombre');
  const precio = parseFloat(boton.getAttribute('data-precio'));

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push({ nombre, precio });
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert(`Añadido al carrito: ${nombre} - $${precio}`);
  mostrarCarrito();
}

// Función para mostrar el carrito
function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const lista = document.getElementById('carrito-body');
  const total = document.getElementById('total-carrito');

  lista.innerHTML = '';
  let suma = 0;

  carrito.forEach(producto => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
          <td>${producto.nombre}</td>
          <td>$${producto.precio.toFixed(2)}</td>
      `;
      lista.appendChild(fila);
      suma += producto.precio;
  });

  total.textContent = suma.toFixed(2);
}

// Función comprar (actualizada con EmailJS)
function comprar() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
  if (carrito.length === 0) {
      alert('🛒 El carrito está vacío');
      return;
  }
  
  // Mostrar formulario de email
  document.getElementById('formulario-email').style.display = 'block';
  event.target.style.display = 'none'; // Oculta el botón "Comprar"
}

// Nueva función para enviar el email
function finalizarCompra() {
  const nombre = document.getElementById('cliente-nombre').value;
  const email = document.getElementById('cliente-email').value;
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Validaciones
  if (!nombre || nombre.length < 3) {
      alert('✏️ Por favor ingresa tu nombre completo');
      return;
  }
  if (!email || !email.includes('@')) {
      alert('✉️ Por favor ingresa un email válido');
      return;
  }

  // Formatear productos para el email
  const productosHTML = carrito.map(p => 
      `• ${p.nombre} - $${p.precio.toFixed(2)}`
  ).join('<br>');

  const total = carrito.reduce((sum, p) => sum + p.precio, 0).toFixed(2);

  // Parámetros para el template de EmailJS
  const templateParams = {
      cliente_nombre: nombre,
      cliente_email: email,
      productos: productosHTML,
      total: total,
      fecha: new Date().toLocaleDateString('es-MX')
  };

  // Enviar email 
  emailjs.send('service_carrito', 'template_gp3zt6l', templateParams)
      .then(() => {
          alert(`✅ ¡Gracias por tu compra, ${nombre}! Recibirás un resumen en ${email}`);
          localStorage.removeItem('carrito');
          mostrarCarrito();
          
          // Resetear formulario
          document.getElementById('formulario-email').style.display = 'none';
          document.getElementById('cliente-nombre').value = '';
          document.getElementById('cliente-email').value = '';
          document.querySelector('.btn-primary').style.display = 'block';
      })
      .catch(error => {
          console.error('Error al enviar el email:', error);
          alert('❌ Ocurrió un error al enviar la confirmación. Por favor intenta nuevamente.');
      });
}

// Mostrar carrito al cargar la página
window.onload = function() {
  console.log("Página cargada desde carrito.js");
  mostrarCarrito();
  
  // Inicializar EmailJS con Public Key
  emailjs.init('nSCAv32uGxOpw4Sms');
};