const urlProductos = `http://localhost:8080/api/perseflora/producto`;
const productList = document.getElementById('product-list');

fetch(urlProductos)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        return response.json();
    })
    .then(productos => {
        if (productos.length === 0) {
            productList.innerHTML = '<div class="alert alert-info">No hay productos registrados</div>';
            return;
        }

        productos.forEach(producto => {
            // Mapeo de iconos para luz, riego, temperatura y toxicidad
            let luzIcon, riegoIcon, temperaturaIcon, toxicidadIcon;

            switch (producto.luz) {
                case 'directa':
                    luzIcon = 'bi bi-brightness-high-fill';
                    break;
                case 'indirecta':
                    luzIcon = 'bi bi-umbrella';
                    break;
                default:
                    luzIcon = 'bi bi-umbrella';
            }

            switch (producto.riego) {
                case 'abundante':
                    riegoIcon = 'bi bi-droplet-fill';
                    break;
                case 'moderado':
                    riegoIcon = 'bi bi-droplet-half';
                    break;
                case 'minimo':
                    riegoIcon = 'bi bi-droplet';
                    break;
                default:
                    riegoIcon = 'bi bi-droplet';
            }

            switch (producto.temperatura) {
                case 'calido':
                    temperaturaIcon = 'bi bi-thermometer-sun';
                    break;
                case 'fresca':
                    temperaturaIcon = 'bi bi-thermometer-low';
                    break;
                case 'frio':
                    temperaturaIcon = 'bi bi-thermometer-snow';
                    break;
                default:
                    temperaturaIcon = 'bi bi-thermometer';
            }

            switch (producto.toxicidad) {
                case 'toxico':
                    toxicidadIcon = 'bi bi-heartbreak';
                    break;
                case 'no':
                    toxicidadIcon = 'bi bi-heart-fill';
                    break;
                default:
                    toxicidadIcon = 'bi bi-heart';
            }

            // Crear la card para cada producto
            const card = document.createElement('div');
            card.classList.add('me-3', 'mb-4');
            card.innerHTML = `
                <div class="card front rounded-4" style="width: 18rem;">
                    <div class="card-body d-flex justify-content-center pt-4">
                        <i class="${luzIcon} pe-3"></i>
                        <i class="${riegoIcon} pe-3"></i>
                        <i class="${temperaturaIcon} pe-3"></i>
                        <i class="${toxicidadIcon}"></i>
                    </div>
                    <img src="${producto.imagen}" class="card-img-top" alt="Imagen del producto">
                    <!-- Parte Trasera -->
                    <div class="back rounded-4 pb-3" style="width: 18rem;">
                        <div class="card-body text-center">
                            <p class="card-text text-white">${producto.info}</p>
                            <p class="card-text text-white">${producto.detallesRiego}</p>
                        </div>
                        <button class="btn btn-primary mx-auto" onclick="agregarAlCarrito(this)" data-nombre="${producto.nombreProducto}" data-precio="${producto.precio}">
                            Añadir al carrito
                        </button>
                    </div>
                </div>
                <h6 class="ps-3">${producto.nombreProducto}</h6>
                <p class="ps-3">${producto.nombreCientifico}<br>$${producto.precio}</p>
            `;

            productList.appendChild(card); // Añadir la card a la lista de productos
        });
    })
    .catch(error => {
        console.error("❌ Error al obtener productos:", error);
        productList.innerHTML = '<div class="alert alert-danger">No se pudieron cargar los productos.</div>';
    });
