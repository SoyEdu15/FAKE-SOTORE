const pool = require('../config/db');

// Obtener productos en el carrito de un usuario
const getCartByUserId = async (userId) => {
    return pool.query(
        `SELECT c.id, p.name, p.price, c.quantity, (p.price * c.quantity) AS total_price
         FROM cart c
         JOIN products p ON c.product_id = p.id
         WHERE c.user_id = $1`,
        [userId]
    );
};

// Agregar producto al carrito
const addProductToCart = async (user_id, product_id, quantity) => {
    // Verificar si el producto existe en el inventario
    const productInStock = await pool.query(
        `SELECT stock FROM products WHERE id = $1`,
        [product_id]
    );

    if (productInStock.rows.length === 0) {
        throw new Error('Producto no encontrado');
    }

    const availableStock = productInStock.rows[0].stock;

    // Verificar si la cantidad solicitada no excede el stock disponible
    if (quantity > availableStock) {
        throw new Error(`No hay suficiente stock. Solo hay ${availableStock} unidades disponibles.`);
    }

    // Verificar si el producto ya existe en el carrito
    const existingProduct = await pool.query(
        `SELECT quantity FROM cart WHERE user_id = $1 AND product_id = $2`,
        [user_id, product_id]
    );

    if (existingProduct.rows.length > 0) {
        // Si el producto existe, obtener la cantidad actual en el carrito
        const currentQuantity = existingProduct.rows[0].quantity;
        const newQuantity = currentQuantity + quantity;

        // Verificar si la nueva cantidad no excede el stock
        if (newQuantity > availableStock) {
            throw new Error(`No hay suficiente stock para actualizar. Tienes ${currentQuantity} en el carrito y solo hay ${availableStock} unidades disponibles.`);
        }

        // Actualizar la cantidad en el carrito
        return pool.query(
            `UPDATE cart
             SET quantity = $1
             WHERE user_id = $2 AND product_id = $3
             RETURNING *`,
            [newQuantity, user_id, product_id]
        );
    } else {
        // Si el producto no existe en el carrito, insertar un nuevo registro
        return pool.query(
            `INSERT INTO cart (user_id, product_id, quantity)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [user_id, product_id, quantity]
        );
    }
};




// Editar la cantidad de un producto en el carrito
const updateProductQuantity = async (cartId, quantity) => {
    return pool.query(
        `UPDATE cart SET quantity = $1 WHERE id = $2 RETURNING *`,
        [quantity, cartId]
    );
};

// Eliminar producto del carrito
const removeProductFromCart = async (cartId) => {
    return pool.query(`DELETE FROM cart WHERE id = $1`, [cartId]);
};

module.exports = {
    getCartByUserId,
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
};
