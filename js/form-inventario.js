const agregar = document.getElementById('submit');
const productForm = document.getElementById('productForm');
const productContainer = document.getElementById('productContainer');

agregar.addEventListener('click', (e) => {
    e.preventDefault();

    const nombreProducto = document.getElementById('nombreComun').value;
    const nombreCientifico = document.getElementById('nombreCientifico').value;
    const cantidad = parseInt(document.getElementById('unidadesInventario').value);
    const precio = parseFloat(document.getElementById('precio').value);
    const categoria = document.getElementById('category').value;
    const peso = parseInt(document.getElementById('peso').value);
    const luz = document.getElementById('luz').value;
    const temperatura = document.getElementById('temperatura').value;
    const riego = document.getElementById('riego').value;
    const toxicidad = document.getElementById('toxicidad').value;
    const detallesRiego = document.getElementById('detallesRiego').value;
    const info = document.getElementById('info').value;
    const imagen = document.getElementById('imagen').value;

    if (!nombreProducto || !nombreCientifico || isNaN(cantidad) || isNaN(precio) || !categoria ||
        isNaN(peso) || !luz || !temperatura || !riego || !toxicidad || !detallesRiego || !info) {
        alert("Por favor, completa todos los campos obligatorios correctamente.");
        return;
    }

    const producto = {
        nombreProducto: nombreProducto,
        nombreCientifico: nombreCientifico,
        cantidad: cantidad,
        precio: precio,
        peso: peso,
        categoria: categoria,
        luz: luz,
        temperatura: temperatura,
        riego: riego,
        detallesRiego: detallesRiego,
        imagen: imagen,
        toxicidad: toxicidad,
        info: info
    };


    fetch('http://localhost:8080/api/perseflora/producto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    })
        .then(response => {
            if (!response.ok) return response.text().then(text => { throw new Error(text); });
            return response.json();
        })
        .then(data => {
            alert("Producto agregado exitosamente ✅");
            productForm.reset();
            cargarProductos(); // Recargar productos después de agregar
        })
        .catch(error => {
            alert("Ocurrió un error al agregar el producto ❌");
            console.error(error);
        });
});

function cargarProductos() {
    fetch('http://localhost:8080/api/perseflora/producto')
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener los productos');
            return response.json();
        })
        .then(productos => {
            if (productos.length === 0) {
                productContainer.innerHTML = '<div class="alert alert-info">No hay productos registrados</div>';
                return;
            }

            const tableHTML = `
            <table class="table table-bordered table-striped">
                <thead class="table-dark">
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre Común</th>
                        <th>Nombre Científico</th>
                        <th>Precio</th>
                        <th>Inventario</th>
                        <th>Categoría</th>
                        <th>Detalles de riego</th>
                        <th>Información</th>
                        <th>Tipo de luz</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${productos.map(producto => {
                        const imagen = producto.imagen ? producto.imagen : '/assets/pictures/logo.png';
                        return `
                            <tr>
                                <td><img src="${imagen}" alt="${producto.nombreProducto}" style="width: 80px;"></td>
                                <td>${producto.nombreProducto}</td>
                                <td><em>${producto.nombreCientifico}</em></td>
                                <td>$${producto.precio.toFixed(2)}</td>
                                <td>${producto.unidadesInventario}</td>
                                <td>${producto.categoria}</td>
                                <td>${producto.detallesRiego}</td>
                                <td>${producto.info}</td>
                                <td>${producto.luz}</td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${producto.idProducto}">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${producto.idProducto}">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>`;

            productContainer.innerHTML = tableHTML;
            activarBotonesEditar();
            activarBotonesBorrar();
        })
        .catch(error => {
            console.error("❌ Error al obtener productos:", error);
            productContainer.innerHTML = '<div class="alert alert-danger">No se pudieron cargar los productos.</div>';
        });
}

//Editar boton
function activarBotonesEditar() {
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-id');
            try {
                const res = await fetch(`http://localhost:8080/api/perseflora/producto/${id}`);
                if (!res.ok) throw new Error("Producto no encontrado");
                const producto = await res.json();

                // Llenar los campos del modal con los datos del producto
                document.getElementById('editId').value = producto.idProducto;
                document.getElementById('nombreComunEdit').value = producto.nombreProducto;
                document.getElementById('nombreCientificoEdit').value = producto.nombreCientifico;
                document.getElementById('pesoEdit').value = producto.peso;
                document.getElementById('unidadesInventarioEdit').value = producto.unidadesInventario;
                document.getElementById('precioEdit').value = producto.precio;
                document.getElementById('luzEdit').value = producto.luz;
                document.getElementById('temperaturaEdit').value = producto.temperatura;
                document.getElementById('riegoEdit').value = producto.riego;
                document.getElementById('detallesRiegoEdit').value = producto.detallesRiego;
                document.getElementById('imagenEdit').value = producto.imagen;
                document.getElementById('editInfo').value = producto.info;
                document.getElementById('editCategory').value = producto.categoria;
                document.getElementById('toxicidadEdit').value = producto.toxicidad;

                // Mostrar el modal
                new bootstrap.Modal(document.getElementById('editModal')).show();

            } catch (error) {
                console.error('Error al cargar producto:', error);
            }
        });
    });
}

document.getElementById('editForm').addEventListener('#guardar', async function (e) {
    e.preventDefault();

    const id = document.getElementById('editId').value;
    const productoActualizado = {
        nombreProducto: document.getElementById('nombreComun').value,
        nombreCientifico: document.getElementById('nombreCientifico').value,
        peso: parseInt(document.getElementById('peso').value),
        unidadesInventario: parseInt(document.getElementById('unidadesInventario').value),
        precio: parseFloat(document.getElementById('precio').value),
        luz: document.getElementById('luz').value,
        temperatura: document.getElementById('temperatura').value,
        riego: document.getElementById('riego').value,
        detallesRiego: document.getElementById('detallesRiego').value,
        imagen: document.getElementById('imagen').value,
        info: document.getElementById('edit').value,
        categoria: document.getElementById('editcategory').value,
        toxicidad: document.getElementById('toxicidad').value
    };

    try {
        const res = await fetch(`http://localhost:8080/api/perseflora/producto/update-producto/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoActualizado)
        });

        if (!res.ok) throw new Error("No se pudo actualizar");
        alert("Producto actualizado correctamente");
        cargarProductos();
        bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();

    } catch (error) {
        console.error("Error al actualizar producto:", error);
    }
});


//Borra boton
function activarBotonesBorrar() {
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-id');
            if (!confirm('¿Estás seguro de eliminar este producto?')) return;

            try {
                const res = await fetch(`http://localhost:8080/api/perseflora/producto/delete-producto/${id}`, {
                    method: 'DELETE'
                });
                if (!res.ok) throw new Error("No se pudo eliminar");
                alert('Producto eliminado correctamente');
                cargarProductos(); // Recarga productos sin refrescar toda la página
            } catch (error) {
                console.error('Error al eliminar producto:', error);
            }
        });
    });
}

// Al cargar la página, obtener los productos
document.addEventListener('DOMContentLoaded', cargarProductos);