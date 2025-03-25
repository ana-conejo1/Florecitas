document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("productForm");
    const productContainer = document.getElementById("productContainer");

    // Evento para agregar productos
    productForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Capturar valores de los campos del formulario
        const idProducto = document.getElementById("idProducto").value.trim();
        const nombreComun = document.getElementById("nombreComun").value.trim();
        const nombreCientifico = document.getElementById("nombreCientifico").value.trim();
        const tamano = document.getElementById("tamano").value.trim();
        const peso = document.getElementById("peso").value.trim();
        const unidadesInventario = document.getElementById("unidadesInventario").value.trim();
        const precio = document.getElementById("precio").value.trim();
        const luz = document.getElementById("luz").value.trim();
        const temperatura = document.getElementById("temperatura").value.trim();
        const riego = document.getElementById("riego").value.trim();
        const detallesRiego = document.getElementById("detallesRiego").value.trim();
        const imagen = document.getElementById("imagen").value.trim();
        const toxicidad = document.getElementById("toxicidad").value.trim();
        const info = document.getElementById("info").value.trim();
        const category = document.getElementById("category").value.trim();

        // Validación de campos vacíos
        if (!idProducto || !nombreComun || !nombreCientifico || !tamano || !peso || !unidadesInventario || !precio || !luz || !temperatura || !riego || !detallesRiego || !imagen || !toxicidad || !info || !category) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const nuevoProducto = {
            id: idProducto,
            nombreComun: nombreComun,
            nombreCientifico: nombreCientifico,
            tamano: tamano,
            peso: parseFloat(peso),
            unidadesInventario: parseInt(unidadesInventario),
            precio: parseFloat(precio),
            luz: luz,
            temperatura: temperatura,
            riego: riego,
            detallesRiego: detallesRiego,
            imagen: imagen,
            toxicidad: toxicidad,
            info: info,
            category: category
        };

        fetch("http://localhost:3000/productos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoProducto)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                console.log("Producto agregado:", data);

                // Verificar que la respuesta contiene el producto correcto antes de agregarlo al DOM
                if (data.product) {
                    agregarProductoAlDOM(data.product); // Usamos 'data.product' para obtener el producto agregado
                    productForm.reset();
                } else {
                    alert("Error al agregar producto. Verifique los datos.");
                }
            }
        })
        .catch(error => console.error("Error al agregar producto:", error));
    });

    // Función para mostrar productos en la página
    function mostrarProductosEnPagina(productos) {
        productContainer.innerHTML = ""; // Limpiar contenedor

        productos.forEach(producto => {
            agregarProductoAlDOM(producto);
        });
    }

    function agregarProductoAlDOM(producto) {
        console.log("Agregando al DOM:", producto); // Debug

        // Verificar que el producto no sea undefined o nulo
        if (!producto || !producto.nombreComun || !producto.nombreCientifico) {
            console.log("Producto no válido:", producto);
            return; // No agregar el producto si no es válido
        }

        const card = document.createElement("div");
        card.classList.add("card", "mb-3");
        card.style.width = "12rem";  // Reducir el tamaño de la tarjeta
        card.style.padding = "10px"; // Espaciado dentro de la tarjeta
        
        // Actualizar el contenido sin imagen
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title" style="font-size: 1rem;">${producto.nombreComun}</h5>
                <p class="card-text" style="font-size: 0.875rem;">${producto.nombreCientifico}</p>
                <button class="btn btn-danger delete-btn" data-id="${producto.id}">Eliminar</button>
            </div>
        `;
        
        productContainer.appendChild(card);
    
        // ✅ Agregar evento al botón eliminar
        card.querySelector(".delete-btn").addEventListener("click", function () {
            eliminarProducto(producto.id);
        });
    }

    // Función para eliminar producto
    function eliminarProducto(id) {
        fetch(`http://localhost:3000/productos/${id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                console.log(`Producto con ID ${id} eliminado`);
                // Recargar la lista de productos
                fetch("http://localhost:3000/productos")
                    .then(response => response.json())
                    .then(data => mostrarProductosEnPagina(data));
            }
        })
        .catch(error => console.error("Error al eliminar producto:", error));
    }

    // Cargar productos existentes cuando la página se carga
    fetch("http://localhost:3000/productos")
        .then(response => response.json())
        .then(data => mostrarProductosEnPagina(data))
        .catch(error => console.error("Error al cargar productos:", error));
});


