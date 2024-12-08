    const express = require('express');
    const { authenticate } = require('../middlewares/authMiddleware');
    const {
        getCart,
        addToCart,
        updateCart,
        removeFromCart,
    } = require('../controllers/cartController');

    const router = express.Router();

    router.get('/', authenticate, getCart); // Obtener el carrito del usuario
    router.post('/', authenticate, addToCart); // Agregar producto al carrito
    router.put('/', authenticate, updateCart); // Actualizar cantidad de producto
    router.delete('/:cartId', authenticate, removeFromCart); // Eliminar producto

    module.exports = router;
