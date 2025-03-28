document.addEventListener('DOMContentLoaded', function() {
    // Array para almacenar productos
    let productos = [];

    // Función para crear un producto
    function crearProducto(nombre, imagen, descripcion) {
        return {
            name: nombre,
            img: imagen,
            description: descripcion
        };
    }

    // Función para mostrar productos en la lista
function mostrarProductos() {
    const lista = document.getElementById('productList');
    lista.innerHTML = productos.map((producto, index) => `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.name}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${producto.name}</h5>
                        <p class="card-text">${producto.description}</p>
                        <button class="btn btn-danger btn-sm eliminar-producto" data-index="${index}">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Agregar evento de eliminar
    const botonesEliminar = document.querySelectorAll('.eliminar-producto');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', function() {
            const indice = parseInt(this.dataset.index);
            eliminarProducto(indice);
        });
    });
}

// Función para eliminar un producto
function eliminarProducto(indice) {
    if (indice >= 0 && indice < productos.length) {
        productos.splice(indice, 1);
        mostrarProductos();
        guardarProductosLocalStorage();
    }
}

    /*// Generar 10 productos de muestra
    function generarProductosMuestra() {
        for (let i = 1; i <= 10; i++) {
            productos.push(crearProducto(
                `Producto ${i}`,
                'https://via.placeholder.com/150',
                `Descripción de ejemplo para el producto ${i}`
            ));
        }
        mostrarProductos();
        guardarProductosLocalStorage();
    }*/

    // Manejar el envío del formulario
    document.getElementById('productForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const nuevoProducto = crearProducto(
            document.getElementById('nombreProducto').value,
            document.getElementById('imagenProducto').value,
            document.getElementById('descripcionProducto').value
        );

        productos.push(nuevoProducto);
        mostrarProductos();
        guardarProductosLocalStorage();
        this.reset();
    });

    // Función para guardar productos en localStorage
    function guardarProductosLocalStorage() {
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    // Cargar productos desde localStorage al iniciar
    function cargarProductosLocalStorage() {
        const datos = localStorage.getItem('productos');
        if (datos) {
            productos = JSON.parse(datos);
            mostrarProductos();
        }
    }

    // Inicializar con productos de muestra o cargados
    cargarProductosLocalStorage();
    if (productos.length === 0) {
        generarProductosMuestra();
    }
});
