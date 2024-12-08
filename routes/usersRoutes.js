const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('', userController.getAllUsers);

// Ruta para crear un nuevo usuario
router.post('', userController.createUser);

// Ruta para buscar un usuario por nombre de usuario
router.get('/:username', userController.findUserByUsername);

module.exports = router;
