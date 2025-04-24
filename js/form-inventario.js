const agregar = document.getElementById('submit');

const fileInput = document.getElementById('fileInput');
const imagenURLInput = document.getElementById('imagen');

let imagenUrl = null;

// Inicializar el widget de carga de Cloudinary
const cloudinaryWidget = cloudinary.createUploadWidget({
    cloudName: 'dlojolnk4',
    upload_preset: 'ml_Default',
    multiple: false,
    sources: ['local', 'url'],
    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
    showAdvancedOptions: false,
    cropping: false,
    maxFileSize: 2000000, // Tamaño máximo del archivo en bytes
    maxImageWidth: 1000, // Ancho máximo de la imagen
}, (error, result) => {
    if (result.event === 'success') {
        imagenUrl = result.info.secure_url;
        document.getElementById('imagePreviewWrapper').innerHTML = `<img src="${imagenUrl}" class="img-fluid" />`;
        document.getElementById('removeImageBtn').classList.remove('d-none');
        imagenURLInput.value = imagenUrl;  // Guardamos la URL en el input
    }
});

// Llama al widget cuando el usuario hace clic en el botón "Seleccionar archivo"
document.getElementById('selectFileBtn').addEventListener('click', function () {
    cloudinaryWidget.open();
});

// Botón para eliminar la imagen cargada
document.getElementById('removeImageBtn').addEventListener('click', function () {
    imagenUrl = null;
    document.getElementById('imagePreviewWrapper').innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center">
        <i class="bi bi-image fs-3 text-muted"></i>
        <small class="text-muted">Vista previa</small>
    </div>`;
    document.getElementById('removeImageBtn').classList.add('d-none');
    imagenURLInput.value = '';
});

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
    const detallesRiego = document.getElementById('detallesRiego').value;
    const info = document.getElementById('info').value;

    // Validación de campos obligatorios
    if (!nombreProducto || !nombreCientifico || isNaN(cantidad) || isNaN(precio) || !categoria ||
        isNaN(peso) || !luz || !temperatura || !riego || !detallesRiego || !info) {
        alert("Por favor, completa todos los campos obligatorios correctamente.");
        return;
    }

    const producto = {
        nombreProducto: nombreProducto,
        nombreCientifico: nombreCientifico,
        cantidad: cantidad,
        precio: precio,
        categoria: categoria,
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
            console.error("Error al agregar producto:", error.message);
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
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${productos.map(producto => {
            // Validar que la URL de la imagen sea válida antes de usarla
            const imagen = producto.imagen ? producto.imagen : '/assets/pictures/logo.png';
            return `
                    <tr>
                        <td><img src="${imagen}" alt="${producto.nombreComun}" style="width: 80px; height: auto;"></td>
                        <td>${producto.nombreComun}</td>
                        <td><em>${producto.nombreCientifico}</em></td>
                        <td>$${producto.precio.toFixed(2)}</td>
                        <td>${producto.unidadesInventario}</td>
                        <td>${producto.categoria}</td>
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