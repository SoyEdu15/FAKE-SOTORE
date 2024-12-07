const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');
const { createUser, findUserByUsername } = require('../models/authModel');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        await createUser(username, password, role);
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    // Validar que username y password estén presentes
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Buscar al usuario en la base de datos
        const user = await findUserByUsername(username);

        // Si el usuario no existe o las contraseñas no coinciden, devolver error
        if (user.rows.length === 0 || !(await bcrypt.compare(password, user.rows[0].password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Crear el token de autenticación
        const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, secret, { expiresIn: '1h' });

        // Enviar el token en la respuesta
        res.json({ token });
    } catch (error) {
        // Log del error y respuesta de error
        console.error(error);
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
};

module.exports = { register, login };
