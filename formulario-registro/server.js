const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const fileJSON = 'users.json';

app.use(express.json());
app.use(cors());

let usersObjects = [];

// Cargar productos desde el archivo JSON si existe
if (fs.existsSync(fileJSON)) {
    try {
        const data = fs.readFileSync(fileJSON, 'utf8');
        usersObjects = JSON.parse(data);
    } catch (err) {
        console.error("Error al parsear JSON:", err);
    }
}

// Agregar un nuevo producto con validación
app.post('/users', (req, res) => {
    try {
        const usuario = req.body;

        // Validar que los datos necesarios estén presentes
        if (!usuario.firstName || !usuario.lastName || !usuario.email1 || !usuario.password1) {
            return res.status(400).json({ error: 'Datos incompletos' });
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

        // Generar un ID dinámico
        const nuevoUsuario = {
            id: nuevoId, // Genera un ID único basado en la fecha actual
            firstName: usuario.firstName,
            lastName: usuario.lastName,
            datepicker: usuario.datepicker,
            phone: usuario.phone,
            email1: usuario.email1,
            password1: usuario.password1,
            password2: usuario.password2
        };

        usersObjects.push(nuevoUsuario);

        // Guardar en archivo JSON
        fs.writeFile(fileJSON, JSON.stringify(usersObjects, null, 2), 'utf8', err => {
            if (err) return res.status(500).json({ error: 'Error al guardar en archivo' });
            res.status(201).json({ message: 'Usuario agregado', product: nuevoUsuario });
        });
    } catch (error) {
        console.error('Error interno del servidor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));