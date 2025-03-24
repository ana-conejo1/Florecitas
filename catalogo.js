///////Crear una función que cambie los iconos dependiendo de las propiedades del item

document.addEventListener('DOMContentLoaded', function() {
    fetch('./formulario-inventario/items.json')
        .then(response => response.json())
        .then(data => {
            // Verifica si los productos se cargan correctamente
            console.log(data.products);

            const catalogo = document.getElementById('product-list');

            // Recorre los productos y genera las tarjetas
            data.products.forEach(product => {
                // Verifica que cada producto tenga las propiedades necesarias
                if (product.imagen && product.info && product.nombreComun && product.nombreCientifico && product.precio) {
                    //////FUCION PARA CAMBIAR LOS ICONOS
                        let riegoIcon=product.riego;
                        let luzIcon=product.luz;
                        let temperaturaIcon=product.temperatura;
                        let toxicidadIcon=product.toxicidad;
                        console.log("Se guardaron las variables", riegoIcon, luzIcon, temperaturaIcon, toxicidadIcon);
                        try{
                            switch (riegoIcon) {
                            
                                case 'abundante':
                                    riegoIcon= 'bi bi-droplet-fill';
                                    break;
                                case 'moderado':
                                    riegoIcon= 'bi bi-droplet-half';
                                    break;
                                case 'minimo':
                                    riegoIcon= 'bi bi-droplet';
                                    break;
                            } 
                    
                            switch (luzIcon) {
                                
                                case 'directa':
                                    luzIcon= 'bi bi-brightness-high-fill';
                                    break;
                                case 'indirecta':
                                    luzIcon= 'bi bi-umbrella';
                                    break;
                            } 
                    
                            switch (temperaturaIcon) {
                                case 'calido':
                                    temperaturaIcon= 'bi bi-thermometer-sun';
                                    break;
                                case 'fresca':
                                    temperaturaIcon= 'bi bi-thermometer-low';
                                    break;
                                case 'frio':
                                    temperaturaIcon= 'bi bi-thermometer-snow';
                                    break;
                            }
                            
                            switch (toxicidadIcon) {
                                case 'toxico':
                                    toxicidadIcon= 'bi bi-heartbreak';
                                    break;
                                case 'no':
                                    toxicidadIcon= 'bi bi-heart-fill';
                                    break;
                            }
                        }
                        catch(error){
                            console.error('Error al cambiar los iconos:', error);
                        }
                    
                    const card = document.createElement('div');
                    card.classList.add('me-3');
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
