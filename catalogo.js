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
imagen: 'assets/Pictures/Suculentas/haworthia-ventana catedral.png',
toxicidad: 'no',
info: 'Suculenta con ojas color verde oscuro, de interior, no necesita muhco riego y es fácil de cuidar',
category: "Minimal Suc"
},
{
id: "002",
nombreComun: 'Echeveria Barbillion',
nombreCientifico: 'Echeveria Barbillion',
tamano: "10x15x20",
peso: 300,
unidadesInventario: 5,
precio: 150,
luz: 'indirecta',
temperatura: 'calido',
riego: "moderado",
detallesRiego:"Regar cada 7-10 días en verano y cada 2-3 semanas en invierno.",
imagen: 'assets/Pictures/Suculentas/echeverria barbillion.png',
toxicidad: 'no',
info: 'Suculenta con hojas en forma de roseta, de color verde azulado con bordes rosados. Ideal para interiores o exteriores con buena luz.',
category: "Minimal Suc"
},
{
id: "003",
nombreComun: 'Planta de Jade',
nombreCientifico: 'Crassula Ovata',
tamano: "20x30x40",
peso: 2000,
unidadesInventario: 5,
precio: 400,
luz: 'indirecta',
temperatura: 'fresca',
riego: "moderado",
detallesRiego:"Regar cada 10-14 días en verano y cada 3-4 semanas en invierno.",
imagen: 'assets/Pictures/Suculentas/crassula ovata.png',
toxicidad: 'no',//tóxica para mascotas
info: 'Planta suculenta de hojas carnosas y tallos gruesos, símbolo de prosperidad.',
category: "Minimal Suc"
},
{
id: "004",
nombreComun: 'Cola de burro',
nombreCientifico: ' Sedum Morganianum',
tamano: "10x15x60",
peso: 500,
unidadesInventario: 5,
precio: 250,
luz: 'indirecta',
temperatura: 'fresca',
riego: "moderado",
detallesRiego:"Regar cada 7-10 días en verano y cada 2-3 semanas en invierno.",
imagen: 'assets/Pictures/Suculentas/sedum morganianum.png',
toxicidad: 'no',
info: 'Suculenta colgante con hojas en forma de lágrima, perfecta para macetas colgantes.',
category: "Verde Kawaii"
},
{
id: "005",
nombreComun: 'Planta de collar de corazones',
nombreCientifico: 'Crassula Marnieriana',
tamano: "10x20x30",
peso: 250,
unidadesInventario: 5,
precio: 250,
luz: 'indirecta',
temperatura: 'fresca',
riego: "moderado",
detallesRiego:"Regar cada 7-10 días en verano y cada 2-3 semanas en invierno.",
imagen: 'assets/Pictures/Suculentas/crassula marnierana.png',
toxicidad: 'no',
info: 'Suculenta compacta con hojas apiladas en forma de collar, ideal para terrarios.',
category: "Verde Kawaii"
},
{
id: "006",
nombreComun: 'Planta de rosario',
nombreCientifico: 'Curio Rowleyanus',
tamano: "10x15x60",
peso: 400,
unidadesInventario: 5,
precio: 250,
luz: 'indirecta',
temperatura: 'fresca',
riego: "moderado",
detallesRiego:"Regar cada 7-10 días en verano y cada 2-3 semanas en invierno.",
imagen: 'assets/Pictures/Suculentas/curio rowleyanus.png',
toxicidad: 'no', //Si se ingiere
info: 'Suculenta colgante con hojas redondas que parecen guisantes, ideal para macetas colgantes.',
category: "Verde Kawaii"
},
{
id: "007",
nombreComun: 'Crassula variegada',
nombreCientifico: 'Crassula Rogersii Variegata',
tamano: "10x15x60",
peso: 400,
unidadesInventario: 5,
precio: 250,
luz: 'indirecta',
temperatura: 'fresca',
riego: "moderado",
detallesRiego:"Regar cada 7-10 días en verano y cada 2-3 semanas en invierno.",
imagen: 'assets/Pictures/Suculentas/curio rowleyanus.png',
toxicidad: 'no', //Si se ingiere
info: 'Suculenta colgante con hojas redondas que parecen guisantes, ideal para macetas colgantes.',
category: "Detalles vivos"
},
{
id: "008",
nombreComun: 'Cotiledón Ondulado',
nombreCientifico: 'Cotyledon Undulata',
tamano: "20x30x40",
peso: 700,
unidadesInventario: 5,
precio: 350,
luz: 'directa',
temperatura: 'fresca',
riego: "minimo",
detallesRiego:"Regar cada 10-14 días en verano y cada 3-4 semanas en invierno.",
imagen: 'assets/Pictures/Suculentas/cotyledon undulata.png',
toxicidad: 'no', //Si se ingiere
info: 'Suculenta con hojas onduladas y cubiertas de una capa blanca (pruina), ideal para exteriores.',
category: "Detalles vivos"
},
{
id: "009",
nombreComun: 'Chocolate Soldier',
nombreCientifico: 'Kalanchoe tomentosa',
tamano: "15x20x30",
peso: 200,
unidadesInventario: 5,
precio: 250,
luz: 'indirecta',
temperatura: 'fresca',
riego: "minimo",
detallesRiego:"Regar cada 7-10 días en verano y cada 2-3 semanas en invierno.",
imagen: 'assets/Pictures/Suculentas/chocolate soldier.png',
toxicidad: 'no', //Para mascotas
info: 'Ideal para interiores con buena luz o exteriores con sombra parcial. No requiere mucho mantenimiento y es perfecta para principiantes.',
category: "Detalles vivos"
},
{
id: "010",
nombreComun: 'Aloe vera',
nombreCientifico: 'Aloe barbadensis miller',
tamano: "30x30x60",
peso: 2500,
unidadesInventario: 5,
precio: 150,
luz: 'indirecta',
temperatura: 'fresca',
riego: "minimo",
detallesRiego:"Regar cada 10-14 días en verano y cada 3-4 semanas en invierno.",
imagen: 'assets/Pictures/Suculentas/aloe vera.png',
toxicidad: 'no', //Para mascotas
info: 'Es una planta resistente y de bajo mantenimiento, perfecta para interiores o exteriores.',
category: "Detalles vivos"
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