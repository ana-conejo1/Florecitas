document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const productForm = document.getElementById('productForm');
    const productContainer = document.getElementById('productContainer');
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    const editForm = document.getElementById('editForm');
    const fileInput = document.getElementById('fileInput');
    const dropArea = document.getElementById('dropArea');
    const imagePreviewWrapper = document.getElementById('imagePreviewWrapper');
    const removeImageBtn = document.getElementById('removeImageBtn');
    const imagenUrlInput = document.getElementById('imagen');
    const clearUrlBtn = document.getElementById('clearUrlBtn');
    const selectFileBtn = document.getElementById('selectFileBtn');
    
    // Variables de estado
    let currentImageFile = null;
    let productos = [];
    const API_URL = 'http://localhost:3000/productos'; // Corregido: añadido /productos al endpoint

    // Event Listeners
    productForm.addEventListener('submit', handleSubmit);
    editForm.addEventListener('submit', handleEditSubmit);
    fileInput.addEventListener('change', handleFileSelect);
    selectFileBtn.addEventListener('click', () => fileInput.click());
    removeImageBtn.addEventListener('click', resetImageInput);
    clearUrlBtn.addEventListener('click', () => {
        imagenUrlInput.value = '';
        validateImageInput();
    });
    imagenUrlInput.addEventListener('input', validateImageInput);

    // Drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    dropArea.addEventListener('drop', handleDrop, false);

    // Inicializar la aplicación
    fetchProducts();

    // Funciones
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropArea.classList.add('border-primary', 'bg-light');
    }

    function unhighlight() {
        dropArea.classList.remove('border-primary', 'bg-light');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length) {
            fileInput.files = files;
            handleFileSelect({ target: fileInput });
        }
    }

    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Validar tipo de archivo
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Por favor, selecciona una imagen válida (JPEG, PNG o WEBP)');
            return;
        }

        currentImageFile = file;
        displayImagePreview(URL.createObjectURL(file));
        validateImageInput();
    }

    function displayImagePreview(imageSrc) {
        imagePreviewWrapper.innerHTML = `<img src="${imageSrc}" class="w-100 h-100 object-fit-cover" alt="Preview">`;
        removeImageBtn.classList.remove('d-none');
    }

    function resetImageInput() {
        fileInput.value = '';
        currentImageFile = null;
        imagePreviewWrapper.innerHTML = `
            <div class="d-flex flex-column justify-content-center align-items-center">
                <i class="bi bi-image fs-3 text-muted"></i>
                <small class="text-muted">Vista previa</small>
            </div>
        `;
        removeImageBtn.classList.add('d-none');
        validateImageInput();
    }

    function validateImageInput() {
        const hasUrl = imagenUrlInput.value.trim() !== '';
        const hasFile = currentImageFile !== null;
        const isValid = hasUrl || hasFile;
        
        if (isValid) {
            imagenUrlInput.classList.remove('is-invalid');
        } else {
            imagenUrlInput.classList.add('is-invalid');
        }
        
        return isValid;
    }

    async function fetchProducts() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Error al obtener productos');
            productos = await response.json();
            renderProducts();
        } catch (error) {
            console.error('Fetch Error:', error);
            productContainer.innerHTML = `
                <div class="alert alert-danger">
                Error al cargar los productos. Verifica:
                <ul>
                    <li>Que el servidor esté corriendo</li>
                    <li>Que la URL ${API_URL} sea correcta</li>
                    <li>La consola para más detalles</li>
                </ul>
                <button class="btn btn-sm btn-primary" onclick="location.reload()">Reintentar</button>
            </div>
        `;
    }
}
    function renderProducts() {
        if (!productos || productos.length === 0) {
            productContainer.innerHTML = '<div class="alert alert-info">No hay productos registrados</div>';
            return;
        }

        productContainer.innerHTML = productos.map(producto => `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${producto.imagen}" class="img-fluid rounded-start" alt="${producto.nombreComun}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombreComun}</h5>
                            <p class="card-text"><em>${producto.nombreCientifico}</em></p>
                            <p class="card-text">${producto.info}</p>
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${producto.id}">
                                    <i class="bi bi-pencil"></i> Editar
                                </button>
                                <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${producto.id}">
                                    <i class="bi bi-trash"></i> Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Agregar event listeners a los botones
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => openEditModal(btn.dataset.id));
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteProduct(btn.dataset.id));
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (!validateImageInput()) {
            alert('Por favor, proporciona una imagen válida');
            return;
        }

        const imagenUrl = currentImageFile ? URL.createObjectURL(currentImageFile) : imagenUrlInput.value.trim();

        const producto = {
            nombreComun: document.getElementById('nombreComun').value,
            nombreCientifico: document.getElementById('nombreCientifico').value,
            tamano: document.getElementById('tamano').value,
            peso: parseInt(document.getElementById('peso').value),
            unidadesInventario: parseInt(document.getElementById('unidadesInventario').value),
            precio: parseFloat(document.getElementById('precio').value),
            luz: document.getElementById('luz').value,
            temperatura: document.getElementById('temperatura').value,
            riego: document.getElementById('riego').value,
            detallesRiego: document.getElementById('detallesRiego').value,
            imagen: imagenUrl,
            info: document.getElementById('info').value,
            categoria: document.getElementById('category').value
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });

            if (!response.ok) throw new Error('Error al agregar producto');

            const nuevoProducto = await response.json();
            productos.push(nuevoProducto);
            renderProducts();
            productForm.reset();
            resetImageInput();
            
        } catch (error) {
            console.error('Error:', error);
            alert('Error al agregar producto: ' + error.message);
        }
    }

    function openEditModal(id) {
        const producto = productos.find(p => p.id === id);
        if (!producto) return;

        // Llenar el formulario de edición
        document.getElementById('editId').value = producto.id;
        document.getElementById('editNombreComun').value = producto.nombreComun;
        document.getElementById('editNombreCientifico').value = producto.nombreCientifico;
        document.getElementById('editTamano').value = producto.tamano;
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

        editModal.show();
    }

    async function handleEditSubmit(e) {
        e.preventDefault();
        
        const id = document.getElementById('editId').value;
        if (!id) {
            alert('ID de producto no válido');
            return;
        }
    
        // Validación básica
        const imagenUrl = document.getElementById('editImagen').value.trim();
        if (!imagenUrl) {
            alert('La URL de la imagen es requerida');
            return;
        }
    
        const producto = {
            nombreComun: document.getElementById('editNombreComun').value.trim(),
            // ... resto de campos
        };
    
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });
    
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Error HTTP: ${response.status}`);
            }
    
            const updatedProduct = await response.json();
            const index = productos.findIndex(p => p.id === id);
            
            if (index !== -1) {
                productos[index] = updatedProduct;
                renderProducts();
                editModal.hide();
            } else {
                throw new Error('Producto no encontrado en la lista local');
            }
            
        } catch (error) {
            console.error('Update error:', error);
            alert(`Error al actualizar producto: ${error.message}`);
            // Considera mostrar el error en el modal en lugar de usar alert
        }
    }

    async function deleteProduct(id) {
        if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Error al eliminar producto');

            productos = productos.filter(p => p.id !== id);
            renderProducts();
            
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar producto: ' + error.message);
        }
    }
});