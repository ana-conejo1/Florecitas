document.addEventListener('DOMContentLoaded', function() {
    let data = []; // Variable para almacenar los productos
    
    fetch('/formulario-inventario/items.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
    })
    .then(jsonData => {
        data = jsonData.productos; // Ahora data es el array de productos
        showAllProducts();
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
    });

    // Función para mostrar todos los productos
    function showAllProducts() {
        renderProducts(data);
    }

    // Función para filtrar productos por categoría
    function showProducts(category) {
        let filteredProducts = [];
        
        // Mapeo de categorías (para hacer coincidir los botones con las categorías del JSON)
        const categoryMap = {
            'minimal': 'Minimal Suc',
            'kawaii': 'Verde Kawaii',
            'detalles': 'Detalles vivos'
        };
        
        const categoryToFilter = categoryMap[category];
        
        if (categoryToFilter) {
            filteredProducts = data.filter(product => 
                product.category === categoryToFilter
            );
        }
        
        renderProducts(filteredProducts);
    }

    // Función para renderizar los productos
    function renderProducts(products) {
        const catalogo = document.getElementById('product-list');
        catalogo.innerHTML = '';

        products.forEach(product => {
            if (product.imagen && product.info && product.nombreComun && product.nombreCientifico && product.precio) {
                // Función para cambiar los iconos
                let riegoIcon, luzIcon, temperaturaIcon, toxicidadIcon;
                
                switch (product.riego) {
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
                
                switch (product.luz) {
                    case 'directa':
                        luzIcon = 'bi bi-brightness-high-fill';
                        break;
                    case 'indirecta':
                        luzIcon = 'bi bi-umbrella';
                        break;
                    default:
                        luzIcon = 'bi bi-umbrella';
                }
                
                switch (product.temperatura) {
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
                
                switch (product.toxicidad) {
                    case 'toxico':
                        toxicidadIcon = 'bi bi-heartbreak';
                        break;
                    case 'no':
                        toxicidadIcon = 'bi bi-heart-fill';
                        break;
                    default:
                        toxicidadIcon = 'bi bi-heart';
                }
                
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
                        <img src="${product.imagen}" class="card-img-top" alt="Imagen del producto">
                        <!-- Parte Trasera -->
                        <div class="back rounded-4 pb-3" style="width: 18rem;">
                            <div class="card-body text-center">
                                <p class="card-text text-white">${product.info}</p>
                                <p class="card-text text-white">${product.detallesRiego}</p>
                            </div>
                            <button class="btn btn-primary mx-auto">Comprar</button>
                        </div>
                    </div>
                    <h6 class="ps-3">${product.nombreComun}</h6>
                    <p class="ps-3">${product.nombreCientifico}<br>$${product.precio}</p>
                `;
                
                catalogo.appendChild(card);
            } else {
                console.error('Producto incompleto', product);
            }
        });
    }

    // Hacemos las funciones accesibles globalmente
    window.showProducts = showProducts;
    window.showAllProducts = showAllProducts;
});