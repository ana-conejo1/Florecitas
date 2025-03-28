const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

//Configuracion de multer
const upload = multer({ dest: 'public/uploads/' }); // Carpeta donde se guardarán las imágenes

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'items.json');

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuración inicial
app.use(express.json());
app.use(cors());

// Inicializar el archivo de datos si no existe
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ productos: [] }, null, 2));
}

// Funciones para cargar  datos
function loadData() {
    try {
        const rawData = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(rawData);
    } catch (err) {
        console.error("Error al leer el archivo de datos:", err);
        return { productos: [] };
    }
}

// Funciones para guardar datos
function saveData(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        console.error("Error al guardar datos:", err);
        return false;
    }
}

// Ruta para subir imágenes (definida a nivel global)
app.post('/upload', upload.single('imagen'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No se ha subido ninguna imagen' });
    }
    const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.status(201).json({ url: imageUrl });
});

// Rutas CRUD para productos
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
    // Buscar el máximo id numérico actual
    let maxId = 0;
    data.productos.forEach(p => {
        // Convertir el id a número, si es posible.
        const num = parseInt(p.id, 10);
        if (!isNaN(num) && num > maxId) {
            maxId = num;
        }
    });
    // Nuevo id será el siguiente número, formateado con ceros a la izquierda (3 dígitos, por ejemplo)
    const nuevoId = (maxId + 1).toString().padStart(3, '0');

    // Crear nuevo producto con el id consecutivo
    const nuevoProducto = {
        id: nuevoId,
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

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
    console.log('Endpoints disponibles:');
    console.log('GET    /productos');
    console.log('POST   /productos');
    console.log('PUT    /productos/:id');
    console.log('DELETE /productos/:id');
});