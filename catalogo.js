/////////////// Lineas 1 a 70: FORMULARIO DE INGRESO DE PRODUCTOS //////////
/* Al presionar "Submit" en el formulario se recibe toda la información añadida 
    Se guardan en variables, y se colocan como parámetros del método ProductsController.addItem*/
//////////Codigo obtenido de la tarea 4 para agregar un nuevo Item
// Initialize a new TaskManager with currentId set to 0
const itemsController = new ProductsController(0);//se inicializa el controlador de productos con ID 0

// Select the New Task Form
const newItemForm = document.querySelector('#newItemForm'); ///Este ID debe estar en el formularioProductos.html

// Add an 'onsubmit' event listener
newItemForm.addEventListener('submit', (event) => { ///esto debería estar en el html de formulario de productos (id=submit)
    // Prevent default action
    event.preventDefault();

    // Select the inputs
    const newItemNombreComunInput = document.querySelector('#newItemNombreComunInput');
    const newItemNombreCientificoInput = document.querySelector('#newItemNombreCientificoInput');
    const newItemTamanoInput = document.querySelector('#newItemTamanoInput');
    const newItemPesoInput = document.querySelector('#newItemPesoInput');
    const newUnidadesInventarioInput = document.querySelector('#newUnidadesInventarioInput');
    const newPrecioInput = document.querySelector('#newItemPrecioInput');
    const newItemLuzInput = document.querySelector('#newItemLuzInput');
    const newItemRiegoInput = document.querySelector('#newItemRiegoInput');
    const newItemDetallesRiegoInput = document.querySelector('#newItemDetallesRiegoInput');
    // la imagen no viene en el ejemplo const newItemImagenInput = document.querySelector('#newItemImagenInput');
    const newItemToxicidadInput = document.querySelector('#newItemToxicidadInput');
    const newItemCategoriaInput = document.querySelector('#newItemCategoriaInput'); //Sellecciona el nombre ingresado en el formulario
    const newItemInfo = document.querySelector('#newItemInfo'); //Selecciona la descripción ingresada en el formulario

    /*
        Validation code here
    */

    // Get the values of the inputs
    const nombreComun = newItemNombreComunInput.value;
    const nombreCientifico = newItemNombreCientificoInput.value;
    const tamano = newItemTamanoInput.value;
    const peso = newItemPesoInput.value;
    const unidadesInventario = newUnidadesInventarioInput.value;
    const precio = newPrecioInput.value;
    const luz = newItemLuzInput.value;
    const riego = newItemRiegoInput.value;
    const detallesRiego = newItemDetallesRiegoInput.value;
    // la imagen no viene en el ejemplo const imagen = newItemImagenInput.value;
    const toxicidad = newItemToxicidadInput.value;
    const categoria = newItemCategoriaInput.value;
    const info = newItemInfo.value;
    
    const createdAt = new Date();

    // Add the task to the task manager
    itemsController.addItem(nombreComun, nombreCientifico, tamano, peso, unidadesInventario, 
        precio, luz, riego, detallesRiego, toxicidad, info, categoria, createdAt);

    // Clear the form
    newItemNombreComunInput.value = '';
    newItemNombreCientificoInput.value = '';
    newItemTamanoInput.value = '';
    newItemPesoInput.value = '';
    newUnidadesInventarioInput.value = '';
    newPrecioInput.value = '';
    newItemLuzInput.value = '';
    newItemRiegoInput.value = '';
    newItemDetallesRiegoInput.value = '';
    // la imagen no viene en el ejemplo newItemImagenInput.value = '';
    newItemToxicidadInput.value = '';
    newItemCategoriaInput.value = '';
    newItemInfo.value = '';
});

/////////////// Lineas 72 a 100: CREAR TARJETAS DE PRODUCTOS /////////

function addItemCard(product){ ////////así está basado en el ejemplo
    const itemHTML =`
    
        <div class="card" style="width: 18rem;"> 
            <div class="front">
                        <i class="bi bi-droplet-fill"></i>
                        <img src="${product.imagen}" alt="${product.nombreCientifico}">
                        <h4>${product.nombreComun}</h4>
                        <h5>${product.nombreCientifico}</h5>
                        <p>$${product.precio} | ${product.tamano} cm</p>
                        <!-- Botón Agregar al Carrito -->
                        <button class="add-to-cart-btn" onclick="addToCart('${category}', '${product.name}')">Comprar</button>
                    </div>
                    <div class="back">
                        <i class="bi bi-droplet-fill"></i>
                        <p>${product.info}</p>
                    </div>
                </div>
            </div>
        `;
    const itemsContainer = document.getElementById("list-items");
    itemsContainer.innerHTML += itemHTML;
}

function loadCardsListFromItemsController(){
    for(var i = 0, size = itemsController.items.length; i < size ; i++){
        const item = itemsController.items[i];
        addItemCard(item);
    }
}

loadStorageSampleData();
itemsController.loadItemsFromLocalStorage();
loadCardsListFromItemsController();


////Falta averiguar cómo filtrar los productos por categoria o por sus propiedades, 
////anteriormente se usaba una función llamada:
/*
    function filterProducts(category) {
        console.log('Filtrando productos por categoría:', category);
            filteredProducts.forEach(product => {
                --imprime la tarjeta--
            })
*/
