// controllers/productController.js
const Product = require('../models/Product');

// Obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
    const { name, description, category, price, stock, imageUrl } = req.body;
    try {
        const newProduct = await Product.createProduct(name, description, category, price, stock, imageUrl);
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al crear el producto' });
    }
};
// const deleteProduct = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deletedProduct = await Product.deleteProduct(id);
        
//         if (!deletedProduct) {
//             return res.status(404).json({ message: 'Producto no encontrado' });
//         }
        
//         res.status(200).json({
//             message: 'Producto eliminado con éxito',
//             product: deletedProduct,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error al eliminar el producto' });
//     }
// };

module.exports = { getAllProducts, getProductById, createProduct };