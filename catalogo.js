///////// DICCIONARIO DE PRODUCTOS //////////

let products = [
    {
    id: "001",
    nombreComun: 'Haworthia /"ventana catedral /"',
    nombreCientifico: 'Haworthia cymbiformis',
    tamano: "25x30x25",
    peso: 300,
    unidadesInventario: 5,
    precio: 125,
    luz: 'indirecta',
    temperatura: 'calido',
    riego: "moderado",
    detallesRiego:"dejar secar el suelo antes de volver a regar",
    imagen: '../assets/Pictures/Suculentas/haworthia-cymbiformis.png',
    toxicidad: 'no',
    info: 'Suculenta con ojas color verde oscuro, de interior, no necesita muhco riego y es fácil de cuidar',
    category: "kawaii"
    },
    {
        id: "002",
        nombreComun: 'Haworthia /"ventana catedral /w"',
        nombreCientifico: 'Haworthia cymbiformis',
        tamano: "25x30x25",
        peso: 300,
        unidadesInventario: 5,
        precio: 125,
        luz: 'indirecta',
        temperatura: 'calido',
        riego: "moderado",
        detallesRiego:"dejar secar el suelo antes de volver a regar",
        imagen: '../assets/Pictures/Suculentas/haworthia-cymbiformis.png',
        toxicidad: 'no',
        info: 'Suculenta con ojas color verde oscuro, de interior, no necesita muhco riego y es fácil de cuidar',
        category: "kawaii"
        },
    
]

///MOSTRAR PRODUCTOS////

function showProducts(category) {
    console.log('Mostrando productos para la categoría:', category);
    // Resto del código...
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; //Limpiar la lista de productos

    const filteredProducts=products.filter(product => product.category === category);

    //Mostrar productos filtrado
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
                productCard.className = 'card';
                productCard.innerHTML = `
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
        productList.appendChild(productCard);
    });
    console.log('Productos mostrados:', filteredProducts);
    //productList.style.display = "flex";

}

showProducts('kawaii');

/* ////Card container con función for/////
const cardContainer = document.getElementById('card-container');

function displayProduct(){
    //Create card
    let card = document.createElement("div");
    //Card should have a category
    //card.classList.add("card","i.categoria");
    card.classList.add("card");
    //image div
    let imgContainer = document.createElement("img");
    image.setAttribute("src", i.image);
    imgContainer.appendChild(image);
    card.appendChild(imgContainer);
}


for (let i = 0; i < products.length; i++) {
    displayProduct();
}*/