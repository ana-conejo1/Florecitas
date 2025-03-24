const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const fileJSON = 'items.json';

app.use(express.json());
app.use(cors());

let itemObjects = [];

// Cargar productos desde el archivo JSON si existe
if (fs.existsSync(fileJSON)) {
    try {
        itemObjects = JSON.parse(fs.readFileSync(fileJSON, 'utf8'));
    } catch (err) {
        console.error("Error al parsear JSON:", err);
    }
}

// Obtener todos los productos
app.get('/productos', (req, res) => {
    res.json(itemObjects);
});

// Agregar un nuevo producto con validación
app.post('/productos', (req, res) => {
    const {
        id,
        nombreComun,
        nombreCientifico,
        tamano,
        peso,
        unidadesInventario,
        precio,
        luz,
        temperatura,
        riego,
        detallesRiego,
        imagen,
        toxicidad,
        info,
        category
    } = req.body;

    // Validar que los datos no estén vacíos
    if (!id || !nombreComun || !nombreCientifico || !tamano || !peso || !unidadesInventario || !precio || !luz || !temperatura || !riego || !detallesRiego || !imagen || !toxicidad || !info || !category) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Verificar si el producto ya existe
    if (itemObjects.some(obj => obj.id === id)) {
        return res.status(400).json({ error: 'El producto con este ID ya existe.' });
    }

    const nuevoProducto = {
        id,
        nombreComun,
        nombreCientifico,
        tamano,
        peso: parseFloat(peso),
        unidadesInventario: parseInt(unidadesInventario),
        precio: parseFloat(precio),
        luz,
        temperatura,
        riego,
        detallesRiego,
        imagen,
        toxicidad,
        info,
        category
    };

    itemObjects.push(nuevoProducto);

    // Guardar en archivo JSON
    fs.writeFile(fileJSON, JSON.stringify(itemObjects, null, 2), 'utf8', err => {
        if (err) return res.status(500).json({ error: 'Error al guardar en archivo' });
        res.status(201).json({ message: 'Producto agregado', product: nuevoProducto });
    });
});

// Eliminar un producto por ID
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    const index = itemObjects.findIndex(producto => producto.id === id);

    if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });

    itemObjects.splice(index, 1);

    // Actualizar archivo JSON
    fs.writeFile(fileJSON, JSON.stringify(itemObjects, null, 2), 'utf8', err => {
        if (err) return res.status(500).json({ error: 'Error al actualizar archivo' });
        res.status(200).json({ message: `Producto con ID '${id}' eliminado` });
    });
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
