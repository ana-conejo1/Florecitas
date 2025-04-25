const agregar = document.getElementById('submit');

agregar.addEventListener('click', (e) => {
    e.preventDefault();

    // Capturar valores de los campos del formulario
    const nombreProducto = document.getElementById('nombreComun').value;
    const nombreCientifico = document.getElementById('nombreCientifico').value;
    const cantidad = parseInt(document.getElementById('unidadesInventario').value);
    const precio = parseFloat(document.getElementById('precio').value);
    const categoria = document.getElementById('category').value;
    const peso = document.getElementById('peso').value;
    const luz = document.getElementById('luz').value;
    const temperatura = document.getElementById('temperatura').value;
    const riego = document.getElementById('riego').value;
    const toxicidad = document.getElementById('toxicidad').value;
    const detallesRiego = document.getElementById('detallesRiego').value;
    const info = document.getElementById('info').value;
    const imagen = document.getElementById('imagen').value;

    // Validación de campos obligatorios
    if (!nombreProducto || !nombreCientifico || isNaN(cantidad) || isNaN(precio) || !categoria ||
        isNaN(peso) || !luz || !temperatura || !riego || !toxicidad || !detallesRiego || !info) {
        alert("Por favor, completa todos los campos obligatorios correctamente.");
        return;
    }

    const producto = {
        nombreProducto: nombreProducto,
        nombreCientifico: nombreCientifico,
        unidadesInventario: cantidad,  
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
    
    const url = `http://localhost:8080/api/perseflora/producto`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        .then(data => {
            alert("Producto agregado exitosamente ✅");
            productForm.reset();
        })
        .catch(error => {
            alert("Ocurrió un error al agregar el producto ❌");
        });
});

const urlProductos = `http://localhost:8080/api/perseflora/producto`;
const productContainer = document.getElementById('productContainer');

fetch(urlProductos)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        return response.json();
    })
    .then(productos => {
        if (productos.length === 0) {
            productContainer.innerHTML = '<div class="alert alert-info">No hay productos registrados</div>';
            return;
        }

        // Generar tabla con productos
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
                    <th>informacion</th>
                    <th>Tipo de luz</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${productos.map(producto => {
            // Validar que la URL de la imagen sea válida antes de usarla
            const imagen = producto.imagen ? producto.imagen : '/assets/pictures/logo.png';
            return `
                    <tr>
                        <td><img src="${imagen}" alt="${producto.nombreProducto}" style="width: 80px; height: auto;"></td>
                        <td>${producto.nombreProducto}</td>
                        <td><em>${producto.nombreCientifico}</em></td>
                        <td>$${producto.precio.toFixed(2)}</td>
                        <td>${producto.unidadesInventario}</td>
                        <td>${producto.categoria}</td>
                        <td>${producto.luz}</td>
                        <td>${producto.detallesRiego}</td>
                        <td>${producto.info}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${producto.id}">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${producto.id}">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                `}).join('')}
            </tbody>
        </table>
    `;

        productContainer.innerHTML = tableHTML;
    })
    .catch(error => {
        console.error("❌ Error al obtener productos:", error);
        productContainer.innerHTML = '<div class="alert alert-danger">No se pudieron cargar los productos.</div>';
    });

