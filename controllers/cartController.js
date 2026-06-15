const cartModel = require('../models/cartModel');

// Obtener productos en el carrito
const getCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await cartModel.getCartByUserId(userId);
        res.json(result.rows);
    } catch (error) {
        console.error('[GET CART ERROR]', error);
        res.status(500).json({ message: 'Error fetching cart' });
    }
};

// Agregar producto al carrito
const addToCart = async (req, res) => {
    const userId = req.user.id;
    const { product_id, quantity } = req.body;

    try {
        // Intentar agregar el producto al carrito
        const result = await cartModel.addProductToCart(userId, product_id, quantity);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        // Si ocurre un error, manejamos el mensaje según el tipo de error
        if (error.message.includes('No hay suficiente stock')) {
            // Si el error es por stock insuficiente, retornamos un mensaje más específico
            res.status(400).json({ message: error.message });
        } else {
            // Para otros errores, devolvemos un error genérico
            console.error('[ADD TO CART ERROR]', error);
            res.status(500).json({ message: 'Error adding to cart' });
        }
    }
};



// Editar la cantidad de un producto
const updateCart = async (req, res) => {
    const userId = req.user.id;
    const { product_id, quantity } = req.body;

    try {
        const result = await cartModel.updateProductQuantity(userId, product_id, quantity);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        if (error.message.includes('No hay suficiente stock')) {
            res.status(400).json({ message: error.message });
        } else {
            console.error('[UPDATE CART ERROR]', error);
            res.status(500).json({ message: 'Error updating cart' });
        }
    }
};

// Eliminar producto del carrito
const removeFromCart = async (req, res) => {
    const { cartId } = req.params;
    const userId = req.user.id;

    try {
        const result = await cartModel.removeProductFromCart(cartId, userId);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Item no encontrado en el carrito' });
        }
        res.json({ message: 'Product removed from cart' });
    } catch (error) {
        console.error('[REMOVE FROM CART ERROR]', error);
        res.status(500).json({ message: 'Error removing product from cart' });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCart,
    removeFromCart,
};
