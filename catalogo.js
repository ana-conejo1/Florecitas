document.addEventListener('DOMContentLoaded', function() {
    fetch('listaobjetos.json')
        .then(response => response.json())
        .then(data => {
            // Verifica si los productos se cargan correctamente
            console.log(data.products);

            const catalogo = document.getElementById('product-list');

            // Recorre los productos y genera las tarjetas
            data.products.forEach(product => {
                // Verifica que cada producto tenga las propiedades necesarias
                if (product.imagen && product.info && product.nombreComun && product.nombreCientifico && product.precio) {
                    const card = document.createElement('div');
                    card.classList.add('me-3');
                    card.innerHTML = `
                        <div class="card front rounded-4" style="width: 18rem;">
                            <div class="card-body d-flex justify-content-center pt-4">
                                <span class="material-symbols-outlined pe-3">wb_sunny</span>
                                <i class="bi bi-droplet-half pe-3"></i>
                                <span class="material-symbols-outlined pe-3">beach_access</span>
                                <span class="material-symbols-outlined">pets</span>
                            </div>
                            <img src="${product.imagen}" class="card-img-top" alt="Imagen del producto">
                            <!-- Parte Trasera -->
                            <div class="back rounded-4 pb-3" style="width: 18rem;">
                                <div class="card-body text-center">
                                    <p class="card-text text-white">${product.info}</p>
                                </div>
                                <button class="btn btn-primary mx-auto">Comprar</button>
                            </div>
                        </div>
                        <h6 class="ps-3">${product.nombreComun}</h6>
                        <p class="ps-3">${product.nombreCientifico}<br>$${product.precio}</p>
                    `;
                    
                    // Añadir la tarjeta al contenedor
                    catalogo.appendChild(card);
                } else {
                    console.error('Producto incompleto', product);
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
});
