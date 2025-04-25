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
        nombreProducto,
        nombreCientifico,
        unidadesInventario: cantidad,
        precio,
        peso,
        categoria,
        luz,
        temperatura,
        riego,
        detallesRiego,
        imagen,
        toxicidad,
        info
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

                document.getElementById('editId').value = producto.idProducto;
                document.getElementById('editNombreComun').value = producto.nombreProducto;
                document.getElementById('editNombreCientifico').value = producto.nombreCientifico;
                document.getElementById('editPeso').value = producto.peso;
                document.getElementById('editUnidadesInventario').value = producto.unidadesInventario;
                document.getElementById('editPrecio').value = producto.precio;
                document.getElementById('editLuz').value = producto.luz;
                document.getElementById('editTemperatura').value = producto.temperatura;
                document.getElementById('editRiego').value = producto.riego;
                document.getElementById('editDetallesRiego').value = producto.detallesRiego;
                document.getElementById('editImagen').value = producto.imagen;
                document.getElementById('editInfo').value = producto.info;
                document.getElementById('editCategory').value = producto.categoria;
                document.getElementById('editToxicidad').value = producto.toxicidad;

                new bootstrap.Modal(document.getElementById('editModal')).show();
            } catch (error) {
                console.error('Error al cargar producto:', error);
            }
        });
    });
}

document.getElementById('editForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const id = document.getElementById('editId').value;

    const productoActualizado = {
        nombreProducto: document.getElementById('editNombreComun').value,
        nombreCientifico: document.getElementById('editNombreCientifico').value,
        peso: parseInt(document.getElementById('editPeso').value),
        unidadesInventario: parseInt(document.getElementById('editUnidadesInventario').value),
        precio: parseFloat(document.getElementById('editPrecio').value),
        luz: document.getElementById('editLuz').value,
        temperatura: document.getElementById('editTemperatura').value,
        riego: document.getElementById('editRiego').value,
        detallesRiego: document.getElementById('editDetallesRiego').value,
        imagen: document.getElementById('editImagen').value,
        info: document.getElementById('editInfo').value,
        categoria: document.getElementById('editCategory').value,
        toxicidad: document.getElementById('editToxicidad').value
    };

    try {
        const res = await fetch(`http://localhost:8080/api/perseflora/producto/update-producto/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoActualizado)
        });

        if (!res.ok) throw new Error("No se pudo actualizar");
        alert("Producto actualizado correctamente ✅");
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