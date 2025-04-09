function agregarAlCarrito(boton) {
    // Obtener los datos del producto desde los atributos del botón
    //const id_producto = boton.getAttribute('data-id');   ->>ERROR: id no definido
    const nombre = boton.getAttribute('data-nombre');
    const precio = parseFloat(boton.getAttribute('data-precio'));

    // Obtener el carrito actual del localStorage o inicializarlo

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    //carrito.push({ id, nombre, precio });   ->>ERROR: id no definido
    carrito.push({ nombre, precio });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`Añadido al carrito: ${nombre} - $${precio}`);
    mostrarCarrito();
  }

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    console.log("Contenido del carrito:", carrito); // Verifica el contenido del carrito

    const lista = document.getElementById('carrito-body');
    const total = document.getElementById('total-carrito');
    console.log("Elementos del DOM encontrados:", lista, total); // Verifica si los elementos existen

    lista.innerHTML = ''; // Limpiar la lista antes de mostrar los productos
    let suma = 0; // Inicializar la suma a 0
    console.log("tabla inicializada")
    carrito.forEach(producto => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toFixed(2)}</td>
        `;
        lista.appendChild(fila);
        suma += producto.precio;
    });console.log("productos añadidos")

    total.textContent = suma.toFixed(2);
    console.log("carrito mostrado")
  }

  function comprar() {
    alert('Se han mandado por correo los datos de tu compra. ¡Hasta pronto!');
    localStorage.removeItem('carrito');
    mostrarCarrito();
  }

   // Mostrar el carrito al cargar la página
   window.onload = function () {
    console.log("Página cargada desde carrito.js");
    mostrarCarrito();
  };