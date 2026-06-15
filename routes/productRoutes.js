const express = require('express');
const products = require('../controllers/productController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

// Ruta para obtener todos los productos (público)
router.get('', products.getAllProducts);

// Ruta para obtener un producto por ID (público)
router.get('/:id', products.getProductById);

// Ruta para crear un nuevo producto (solo admin)
router.post('', authenticate, authorize('admin'), products.createProduct);

// Ruta para eliminar un producto por ID (solo admin)
router.delete('/:id', authenticate, authorize('admin'), products.deleteProduct);

module.exports = router;