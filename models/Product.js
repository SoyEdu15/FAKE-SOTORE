// models/Product.js
const pool = require('../config/db');

// Función para obtener todos los productos
const getAllProducts = async () => {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
};

// Función para obtener un producto por ID
const getProductById = async (id) => {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
};

// Función para crear un nuevo producto
const createProduct = async (name, description, category, price, stock, imageUrl) => {
    const result = await pool.query(
        'INSERT INTO products (name, description, category, price, stock, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, description, category, price, stock, imageUrl]
    );
    return result.rows[0];
};
// const deleteProduct = async (id) => {
//     const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
//     return result.rows[0]; // Retorna el producto eliminado
// };
module.exports = { getAllProducts, getProductById, createProduct };
