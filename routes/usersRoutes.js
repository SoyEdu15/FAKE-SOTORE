const express = require('express');
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

// Ruta para obtener todos los usuarios (solo admin)
router.get('', authenticate, authorize('admin'), userController.getAllUsers);

// Ruta para crear un nuevo usuario
router.post('', userController.createUser);

// Ruta para buscar un usuario por nombre de usuario (solo admin)
router.get('/:username', authenticate, authorize('admin'), userController.findUserByUsername);

module.exports = router;
