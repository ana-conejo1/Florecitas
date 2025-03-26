const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'items.json');

// Configuración inicial
app.use(express.json());
app.use(cors());

// Inicializar el archivo de datos si no existe
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ productos: [] }, null, 2));
}

// Middleware para cargar datos
function loadData() {
    try {
        const rawData = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(rawData);
    } catch (err) {
        console.error("Error al leer el archivo de datos:", err);
        return { productos: [] };
    }
}

// Middleware para guardar datos
function saveData(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        console.error("Error al guardar datos:", err);
        return false;
    }
}

// Rutas CRUD
app.get('/productos', (req, res) => {
    const data = loadData();
    res.json(data.productos);
});

app.post('/productos', (req, res) => {
    const data = loadData();
    const producto = req.body;

    // Validación básica
    if (!producto.nombreComun || !producto.nombreCientifico || !producto.imagen) {
        return res.status(400).json({ error: 'Campos requeridos faltantes' });
    }

    // Crear nuevo producto con ID único
    const nuevoProducto = {
        id: uuidv4(),
        ...producto,
        peso: parseFloat(producto.peso) || 0,
        unidadesInventario: parseInt(producto.unidadesInventario) || 0,
        precio: parseFloat(producto.precio) || 0
    };

    data.productos.push(nuevoProducto);

    if (saveData(data)) {
        res.status(201).json(nuevoProducto);
    } else {
        res.status(500).json({ error: 'Error al guardar el producto' });
    }
});

app.put('/productos/:id', (req, res) => {
    const data = loadData();
    const { id } = req.params;
    const index = data.productos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualizar producto
    data.productos[index] = {
        ...data.productos[index],
        ...req.body,
        id, // Mantener el mismo ID
        peso: parseFloat(req.body.peso) || data.productos[index].peso,
        unidadesInventario: parseInt(req.body.unidadesInventario) || data.productos[index].unidadesInventario,
        precio: parseFloat(req.body.precio) || data.productos[index].precio
    };

    if (saveData(data)) {
        res.json(data.productos[index]);
    } else {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

app.delete('/productos/:id', (req, res) => {
    const data = loadData();
    const { id } = req.params;
    const index = data.productos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const [deletedProduct] = data.productos.splice(index, 1);

    if (saveData(data)) {
        res.json({ message: 'Producto eliminado', producto: deletedProduct });
    } else {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

// Servir archivos estáticos (opcional, para el frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
    console.log('Endpoints disponibles:');
    console.log('GET    /productos');
    console.log('POST   /productos');
    console.log('PUT    /productos/:id');
    console.log('DELETE /productos/:id');
});