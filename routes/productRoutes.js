const express = require('express');
const products = require('../controllers/productController');
const router = express.Router();

// Ruta para obtener todos los productos
router.get('', products.getAllProducts);

// Ruta para obtener un producto por ID
router.get('/:id', products.getProductById);

// Ruta para crear un nuevo producto
router.post('', products.createProduct);

// // Ruta para eliminar un producto por ID  (No estoy seguro de )
// router.delete('/:id', products.deleteProduct);

module.exports = router;