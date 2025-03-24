////// PRODUCT CONTROLLER //////
// Create a ProductsController class
class ProductsController {
    // Set up the items and currentId property in the contructor
    constructor(currentId = 0) { //la ID se setea en 0, pero después se cambia a su numero unico por producto
        this.products = [];
        this.currentId = currentId;
    }

    // Create the addItem method
    addItem(nombreComun, nombreCientifico, tamano, peso, unidadesInventario, 
        precio, luz, temperatura, riego, detallesRiego, imagen, toxicidad, info, categoria, createdAt) {
        const item = {
            // Increment the currentId property
            id: this.currentId++, //La ID se incrementa en 1 por cada producto
            nombreComun: nombreComun, 
            nombreCientifico: nombreCientifico,
            tamano: tamano,
            peso: peso,
            unidadesInventario: unidadesInventario,
            precio: precio,
            luz: luz,
            temperatura: temperatura,
            riego: riego,
            detallesRiego: detallesRiego, //max 100 caracteres
            imagen: imagen, //URL de la imagen
            toxicidad: toxicidad, //toxica para mascotas / toxica en general / no toxica
            info: info, //String con información adicional de max 140 caracteres
            categoria: categoria, //solo hay 3 opciones: kawaii, minimal, detalles
            createdAt: createdAt,
        };

        // Push the item to the items property
        this.products.push(item);
    }
}
