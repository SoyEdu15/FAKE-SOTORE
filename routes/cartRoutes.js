const express = require('express');
const router = express.Router();

// Define las rutas para el carrito
router.get('/', (req, res) => {
    // Lógica para obtener el carrito
    res.send('Carrito de compras');
});

module.exports = router;