const userModel = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
};
// Función para manejar la creación de un usuario
const createUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // Llamar al modelo para crear un usuario
        const newUser = await userModel.createUser(username, password, role);

        // Responder con el usuario creado
        res.status(201).json({
            message: 'Usuario creado con éxito',
            user: newUser.rows[0],
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

// Función para manejar la búsqueda de un usuario por nombre de usuario
const findUserByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await userModel.findUserByUsername(username);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(user.rows[0]);
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        res.status(500).json({ message: 'Error al buscar el usuario' });
    }
};
module.exports = {
    getAllUsers,
    createUser,
    findUserByUsername
}