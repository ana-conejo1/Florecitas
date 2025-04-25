// server.js (o index.js)
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors()); // permite peticiones desde tu frontend

// Almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // crea una carpeta 'uploads' en el mismo directorio
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Endpoint para subir imágenes
app.post('/upload', upload.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se recibió archivo' });
  }

  const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

// Servir archivos estáticos (para que puedas acceder a la imagen desde el navegador)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Servidor de subida de imágenes corriendo en http://localhost:${PORT}`);
});
