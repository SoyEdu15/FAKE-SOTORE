const express = require('express');
const router = express.Router();

// Define las rutas para productos
router.get('/', (req, res) => {
    // Lógica para obtener productos
    res.send('Lista de productos');
});

module.exports = router;